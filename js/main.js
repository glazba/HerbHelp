//! DOM

const searchForm =
    document.querySelector("#search-form");

const searchInput =
    document.querySelector("#search-input");

const resultsContainer =
    document.querySelector("#results-container");

const featuredHerbsContainer =
    document.querySelector("#featured-herbs-container");

//! FUNCTIONS

function searchHerbs(searchTerm) {
    return herbs.filter((herb) =>
        herb.name
            .toLowerCase()
            .includes(searchTerm) ||
        herb.symptoms
            .includes(searchTerm));
}

function createResultCard(herb) {
    return `
        <article class="result-card">
            <a href="herb.html?id=${herb.id}">
                <h3>${herb.name}</h3>
            </a>
        </article>    
    `;
}

function renderResults(results) {
    let html = "";

    results.forEach((herb) => {
        html += createResultCard(herb);
    });

    resultsContainer.innerHTML = html;
}

function createFeaturedHerbCard(herb) {
    return `
        <article class="herb-card">
            <img
                src="${herb.image}"
                alt="${herb.name}"
            >
            <div class="herb-content">
                <h3>${herb.name}</h3>
                <p>${herb.description}</p>
                <a href="herb.html?id=${herb.id}">
                    Tovább
                </a>
            </div>
        </article>
    `;
}

function renderFeaturedHerbs() {
    let html = "";

    herbs.forEach((herb) => {
        html +=
            createFeaturedHerbCard(herb);
    });

    featuredHerbsContainer.innerHTML =
        html;
}

function init() {
    renderFeaturedHerbs();
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    resultsContainer.innerHTML = "";

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    if (!searchTerm) {
        alert("Adj meg egy keresendő növényt, vagy tünetet!");
        return;
    }

    const results =
        searchHerbs(searchTerm);

    renderResults(results);
});

//! INIT
init();
