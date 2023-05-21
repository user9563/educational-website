window.onload = function() {
    var menu = document.getElementById("menu");
    menu.style.display = "none";
}

function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "none") {
        menu.style.display = "block"; // Show the menu
    } else {
        menu.style.display = "none"; // Hide the menu
    }
}