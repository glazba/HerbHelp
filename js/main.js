//! DOM

const searchForm =
    document.querySelector("#search-form");

const searchInput =
    document.querySelector("#search-input");

const resultsContainer =
    document.querySelector("#results-container");


//! FUNCTIONS

function searchHerbs(searchTerm) {
    return herbs.filter((herb) =>
        herb.symptoms.includes(searchTerm));
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
        html = createResultCard(herb);
    });

    resultsContainer.innerHTML = html;
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