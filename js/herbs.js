//* Herbs page logic and herb list rendering

//! DOM
const herbsContainer =
    document.querySelector("#herbs-container");

//! ERROR
if (!herbsContainer) {
    throw new Error(
        "#herbs-container not found."
    );
}


//! RENDER

function renderHerbs() {
    let html = "";

    herbs.forEach((herb) => {
        html += createHerbCard(herb);
    });

    herbsContainer.innerHTML = html;
}


//! INIT

function init() {
    renderHerbs();
}

init();
