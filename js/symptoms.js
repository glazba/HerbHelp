//* Symptoms page logic and related herbs rendering


//! DOM

const symptomsContainer =
    document.querySelector("#symptoms-container");

//! ERROR

if (!symptomsContainer) {
    throw new Error("#symptoms-container not found");
}


//! RENDER

function renderSymptoms() {
    const symptoms =
        symptomService.getSymptomsData();

    let html = "";

    symptoms.forEach((symptom) => {
        html +=
            createSymptomCard(symptom);
    });

    symptomsContainer.innerHTML =
        html;
}


//! INIT

function init() {
    renderSymptoms();
}

init();
