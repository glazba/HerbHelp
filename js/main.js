//! DOM

const searchForm =
    document.querySelector("#search-form");

const searchInput =
    document.querySelector("#search-input");

const resultsContainer =
    document.querySelector("#results-container");

const featuredHerbsContainer =
    document.querySelector("#featured-herbs-container");

const popularSymptomsContainer =
    document.querySelector("#popular-symptoms-container");


//! FUNCTIONS

function renderResults(results) {
    let html = "";

    results.forEach((herb) => {
        html += createHerbCard(herb);
    });

    resultsContainer.innerHTML = html;
}

function handleSearch(searchTerm) {
    const results =
        searchHerbs(searchTerm);

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <p>Nem találtunk megfelelő gyógynövényt.</p>
        `;

        return;
    }

    renderResults(results);
}

function renderFeaturedHerbs() {
    let html = "";

    herbs.forEach((herb) => {
        html +=
            createHerbCard(herb);
    });

    featuredHerbsContainer.innerHTML =
        html;
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

function renderPopularSymptoms() {
    const symptoms =
        getAllSymptoms();

    let html = "";

    symptoms.forEach((symptom) => {
        html +=
            createPopularSymptomBtn(symptom);
    });

    popularSymptomsContainer.innerHTML =
        html;
}


function setupPopularSymptomsEvents() {
    const symptomButtons =
        document.querySelectorAll(".symptom-btn");

    symptomButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const symptom =
                button.textContent
                    .trim()
                    .toLowerCase();

            searchInput.value = symptom;

            handleSearch(symptom);
        });
    });
}

function init() {
    renderFeaturedHerbs();
    renderPopularSymptoms();
    setupPopularSymptomsEvents();
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    /*  resultsContainer.innerHTML = ""; */
    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    if (!searchTerm) {
        alert("Adj meg egy keresendő növényt, vagy tünetet!");
        return;
    }

    handleSearch(searchTerm);
});

//! INIT
init();
