//* Main page logic (search, results, featured herbs and popular symptoms)

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


//! RENDER

function renderResults(results) {
    let html = "";

    results.forEach((herb) => {
        html += createHerbCard(herb);
    });

    resultsContainer.innerHTML = html;
}


function renderFeaturedHerbs() {
    const featuredHerbs =
        herbService.getFeaturedHerbs();

    let html = "";

    featuredHerbs.forEach((herb) => {
        html +=
            createHerbCard(herb);
    });

    featuredHerbsContainer.innerHTML =
        html;
}

function renderPopularSymptoms() {
    const symptoms =
        symptomService.getPopularSymptoms();

    let html = "";

    symptoms.forEach((symptom) => {
        html +=
            createPopularSymptomBtn(symptom);
    });

    popularSymptomsContainer.innerHTML =
        html;
}


//! SEARCH

function handleSearch(searchTerm) {
    const results =
        herbService.searchHerbs(
            searchTerm
        );

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <h3>Nincs találat</h3>
                <p>Nem találtunk a keresésnek megfelelő gyógynövényt.</p>
            </div>
        `;

        return;
    }

    renderResults(results);
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


//! EVENTS

function setupSearchEvents() {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        /*  resultsContainer.innerHTML = ""; */
        const searchTerm =
            searchInput.value;

        if (!searchTerm) {
            alert("Adj meg egy keresendő növényt, vagy tünetet!");
            return;
        }

        handleSearch(searchTerm);
    });
}


//! INIT

function init() {
    renderFeaturedHerbs();
    renderPopularSymptoms();
    setupPopularSymptomsEvents();
    setupSearchEvents();
}

init();
