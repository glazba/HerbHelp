
//* Herbs page logic and herb list rendering


//! DOM

const herbsContainer =
    document.querySelector("#herbs-container");

const errorMessage =
    document.querySelector("#error-message");


//! ERROR

if (
    !herbsContainer ||
    !errorMessage
) {
    throw new Error(
        "Required herbs page elements not found."
    );
}


//! RENDER

async function renderHerbs() {

    const herbs =
        await herbService.getAllHerbs();

    let html = "";

    herbs.forEach((herb) => {
        html += createHerbCard(herb);
    });

    herbsContainer.innerHTML = html;
}


//! INIT

async function init() {

    try {

        await renderHerbs();

    } catch (error) {

        console.error(
            "Failed to initialize herbs page:",
            error
        );

        showError(
            errorMessage,
            "Nem sikerült betölteni a gyógynövényeket. Kérjük próbáld újra később.",
            herbsContainer
        );
    }
}

init();
