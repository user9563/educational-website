class PlacementTile {
    constructor({position={x:0, y:0}}) {
        this.position = position
        this.size = 64
        this.color = 'rgba(255, 255, 255, 0)'
        this.occupied = false
    }

    draw() {
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update(mouse) {
        this.draw()

        if (mouse.x > this.position.x && mouse.x < this.position.x + this.size &&
            mouse.y > this.position.y && mouse.y < this.position.y + this.size) {
            this.color = 'rgba(255, 255, 255, 0.5)'
        }
        else {
            this.color = 'rgba(255, 255, 255, 0)'
        }
    }

}

class Enemy {
    constructor({position = { x: 0, y: 0 } }) {
        this.position = position
        this.width = 32
        this.height = 32
        this.waypointIndex = 0
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.radius = 32
        this.health = 5
    }

    draw() {
        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        ctx.fill()

        // health bar
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y - 35, this.width, 10)

        ctx.fillStyle = 'green'
        ctx.fillRect(this.position.x, this.position.y - 35, this.width * this.health / 5, 10)
    }

    update() {
        this.draw()

        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.center.y
        const xDistance = waypoint.x - this.center.x
        const angle = Math.atan2(yDistance, xDistance)

        this.position.x += Math.cos(angle)
        this.position.y += Math.sin(angle)
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        if (
            Math.round(this.center.x) === Math.round(waypoint.x) &&
            Math.round(this.center.y) === Math.round(waypoint.y) &&
            this.waypointIndex < waypoints.length - 1
            )   {
            this.waypointIndex++
         }
    }
}

class Projectile {
    constructor({position = { x: 0, y: 0 }, enemy }) {
        this.position = position
        this.velosity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius = 10
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'orange'
        ctx.fill()
    }

    update() {
        this.draw()

        const angle = Math.atan2(this.enemy.center.y - this.position.y,
                                this.enemy.center.x - this.position.x)
        const power = 5
        this.velosity.x = Math.cos(angle) * power
        this.velosity.y = Math.sin(angle) * power

        this.position.x += this.velosity.x
        this.position.y += this.velosity.y
    }
}

class Building {
    constructor({position = { x: 0, y: 0 } }) {
        this.position = position
        this.width = 64
        this.height = 64
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = []
        this.radius = 250
        this.target
        this.frames = 0
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        ctx.beginPath()
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 0, 255, 0.1)'
        ctx.fill()
    }

    update() {
        this.draw()
        if (this.frames % 100 === 0 && this.target) {
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.center.x,
                        y: this.center.y
                    },
                    enemy: this.target
                })
            )
        }
        this.frames++
    }
}
