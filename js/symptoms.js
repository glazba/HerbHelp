//* Symptoms page logic and related herbs rendering


//! DOM

const symptomsContainer =
    document.querySelector("#symptoms-container");


//! ERROR

if (!symptomsContainer) {
    throw new Error("#symptoms-container not found");
}


//! RENDER

async function renderSymptoms() {
    const symptoms =
        await symptomService.getSymptomsData();

    let html = "";

    symptoms.forEach((symptom) => {
        html +=
            createSymptomCard(symptom);
    });

    symptomsContainer.innerHTML =
        html;
}


//! INIT

async function init() {
    await renderSymptoms();
}

init().catch((error) => {
    console.error("Failed to initialize symptoms page:", error);
});
