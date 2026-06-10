//! DOM

const symptomsContainer =
    document.querySelector("#symptoms-container");

    
//! FUNCTIONS

function getAllSymptoms() {
    const allSymptoms =
        herbs.flatMap(
            (herb) => herb.symptoms
        );
    const uniqueSymptoms =
        [...new Set(allSymptoms)];

    uniqueSymptoms.sort();

    return uniqueSymptoms;
}
console.log(getAllSymptoms());


function createSymptomCard(symptom) {
    return `
        <article class="symptom-card>
            <h2>${symptom}</h2>
        </article>
    `;
}


function renderSymptoms() {
    const symptoms =
        getAllSymptoms();

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