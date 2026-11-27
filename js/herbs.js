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

async function renderHerbs() {

    const herbs = await herbService.getAllHerbs();

    let html = "";

    herbs.forEach((herb) => {
        html += createHerbCard(herb);
    });

    herbsContainer.innerHTML = html;
}


//! INIT

async function init() {
    await renderHerbs();
}

init().catch((error) => {
    console.error("Failed to initialize herbs page:", error);
});
