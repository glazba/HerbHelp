const params =
    new URLSearchParams(window.location.search);

const herbId =
    Number(params.get("id"));

// console.log(herbId);

const herb =
    herbs.find(
        (herb) => herb.id === herbId
    );

//! Error
if (!herb) {
    document.body.innerHTML = `
        <h1>Növény nem található.</h1>
    `;

    throw new Error("Herb not found");
}

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

    
//! FUNCTIONS

function renderHerb() {
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

function renderSymptoms() {
    let html = "";

    herb.symptoms.forEach((symptom) => {
        html += `
            <li>${symptom}</li>
        `;
    });

    herbSymptoms.innerHtml = html;
}

function init() {
    renderHerb();

    renderSymptoms();
}

//! INIT

init();

