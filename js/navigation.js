//* Mobile navigation

//! DOM

const menuToggle =
    document.querySelector("#menu-toggle");

const navMenu =
    document.querySelector("#nav-menu");


//! FUNCTIONS

function toggleMenu() {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
}


//! INIT

function init() {
    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.textContent = "☰";

    menuToggle.addEventListener("click", toggleMenu);
}

init();