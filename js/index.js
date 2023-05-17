const canvas = document.querySelector('.game')
const ctx = canvas.getContext('2d')

canvas.width = 1600
canvas.height = 448

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const placementTilesData2D = []

for (let i=0; i < placementTitlesData.length; i+=25) {
    placementTilesData2D.push(placementTitlesData.slice(i, i + 25))
}

const placementTiles = []

placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 3) {
            // add building tile here
            placementTiles.push(
                new PlacementTile({
                    position: {
                        x: x * 64,
                        y: y * 64
                    }
                })
            )
        }
    })
})

console.log(placementTiles)


const image = new Image()

image.onload = () => {
    animate()
}
image.src = './map.png'

const enemies = []

function spawnEnemies() {
    for (let i = 1; i < 10; i++) {
        const xOffset = i * 150
        enemies.push(new Enemy({
            position : {x: waypoints[0].x - xOffset, y: waypoints[0].y}
        }))
}
}

spawnEnemies()


const buildings = []
let activeTile = undefined

function animate() {
    requestAnimationFrame(animate)

    ctx.drawImage(image, 0, 0)

    for(let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update()
    }
    //Закрасить все placement тайлы
    placementTiles.forEach(tile => {
        ctx.fillStyle = tile.color
        tile.update(mouse)
    })

    buildings.forEach((building) => {
        building.update()
        building.target = null
        const validEnemies = enemies.filter(enemy => {
            const xDifference = enemy.center.x - building.position.x
            const yDifference = enemy.center.y - building.position.y
            const distance = Math.hypot(xDifference, yDifference)
            return distance < enemy.radius + building.radius
        })
        building.target = validEnemies[0]

        for(let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i]
            projectile.update()

            const xDifference = projectile.enemy.center.x - projectile.position.x
            const yDifference = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDifference, yDifference)

            // when projectile hits an enemy
            if (distance < projectile.enemy.radius + projectile.radius) {
                projectile.enemy.health -= 1
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })
                    if (enemyIndex > -1) enemies.splice(enemyIndex, 1)
                }
                building.projectiles.splice(i, 1)
            }
        }
    })
}

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (event) => {
    if (activeTile && !activeTile.isOccupied) {
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }))
        activeTile.isOccupied = true
    }
})

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX - canvas.getBoundingClientRect().left
    mouse.y = event.clientY - canvas.getBoundingClientRect().top

    activeTile = null
    for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if (mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size) {
            activeTile = tile
            break
        }
    }
})

