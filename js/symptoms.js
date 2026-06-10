//! DOM

const symptomsContainer =
    document.querySelector("#symptoms-container");


//! FUNCTIONS

function createSymptomCard(symptomData) {
    const herbsList =
        symptomData.herbsToUse
            .map((herb) => `
                <li>
                    <a href="herb.html?id=${herb.id}">
                        ${herb.name}
                    </a>
                </li>
            `)
            .join("");

    return `
        <article class="symptom-card">
            <h2>${symptomData.name}</h2>
            <ol>${herbsList}</ol>
        </article>
    `;
}


function renderSymptoms() {
    const symptoms =
        getSymptomsData();

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