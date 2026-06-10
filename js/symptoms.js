//! DOM

const symptomsContainer =
    document.querySelector("#symptoms-container");


//! FUNCTIONS

function getSymptomsData() {
    const symptomsMap = {};

    herbs.forEach((herb) => {
        herb.symptoms.forEach((symptom) => {

            if (!symptomsMap[symptom]) {
                symptomsMap[symptom] = {
                    name: symptom,
                    herbsToUse: []
                };
            }

            symptomsMap[symptom].herbsToUse.push({
                id: herb.id,
                name: herb.name
            });
        });
    });

    return Object.values(symptomsMap)
        .sort((a, b) =>
            a.name.localeCompare(
                b.name,
                "hu"
            )
        );
}

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