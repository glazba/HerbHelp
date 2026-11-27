//* Single herb page logic and herb details rendering


//! DATA

const params =
    new URLSearchParams(window.location.search);

const herbId =
    Number(params.get("id"));

const herb =
    herbService.getHerbById(herbId);


//! DOM

const herbName =
    document.querySelector("#herb-name");

const herbDescription =
    document.querySelector("#herb-description");

const herbUsage =
    document.querySelector("#herb-usage");

const herbSymptoms =
    document.querySelector("#herb-symptoms");

const herbWarnings =
    document.querySelector("#herb-warnings");

const herbImage =
    document.querySelector("#herb-image");


//! ERROR

if (
    !herbName ||
    !herbDescription ||
    !herbUsage ||
    !herbSymptoms ||
    !herbWarnings ||
    !herbImage
) {
    throw new Error("Required herb elements not found.");
}


//! RENDER

function renderHerb(herb) {
    herbName.textContent =
        herb.name;

    herbDescription.textContent =
        herb.description;

    herbUsage.textContent =
        herb.usage;

    herbWarnings.textContent =
        herb.warnings;

    herbImage.src =
        herb.image;

    herbImage.alt =
        herb.name;
}

function renderSymptoms(herb) {
    let html = "";

    herb.symptoms.forEach((symptom) => {
        html += `
            <li>${symptom}</li>
        `;
    });

    herbSymptoms.innerHTML = html;
}


//! INIT

async function init() {

    const herb = await herbService.getHerbById(herbId);

    renderHerb(herb);
    renderSymptoms(herb);
}

init().catch((error) => {
    console.error("Failed to initialize herb page:", error);
});
