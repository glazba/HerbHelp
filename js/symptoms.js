
//* Symptoms page logic and related herbs rendering


//! DOM

const symptomsContainer =
    document.querySelector("#symptoms-container");

const errorMessage =
    document.querySelector("#error-message");


//! ERROR

if (
    !symptomsContainer ||
    !errorMessage
) {
    throw new Error(
        "Required symptoms page elements not found."
    );
}


//! RENDER

async function renderSymptoms() {

    const symptoms =
        await symptomService.getSymptomsData();

    let html = "";

    symptoms.forEach((symptom) => {
        html += createSymptomCard(symptom);
    });

    symptomsContainer.innerHTML = html;
}


//! INIT

async function init() {

    try {

        await renderSymptoms();

    } catch (error) {

        console.error(
            "Failed to initialize symptoms page:",
            error
        );

        showError(
            errorMessage,
            "Nem sikerült betölteni a tüneteket. Kérjük, próbáld újra később.",
            symptomsContainer
        );
    }
}

init();
