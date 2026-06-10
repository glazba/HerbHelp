//* Symptoms page logic and related herbs rendering
//! DOM

const symptomsContainer =
    document.querySelector("#symptoms-container");


//! FUNCTIONS

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


function init() {
    renderSymptoms();
}


//! INIT

init();