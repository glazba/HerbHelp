//* Reusable UI component and HTML rendering functions

//! FUNCTIONS

function createHerbCard(herb) {
    return `
        <article class="herb-card">
            
            <a href="herb.html?id=${herb.id}">
                
                <img
                    src="${herb.image}"
                    alt="${herb.name}"
                >

                <div class="herb-content">
                    <h3>${herb.name}</h3>
                    <p>${herb.description}</p>
                </div>

            </a>

        </article>
    `;
}

function createPopularSymptomBtn(symptom) {
    return `
        <button
            class="symptom-btn"
            type="button"
        >
            ${symptom}
        </button>
    `;
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

