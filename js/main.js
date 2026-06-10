const searchForm = document.querySelector("#search-form");

const searchInput = document.querySelector("#search-input");

const resultsContainer =
    document.querySelector("#results-container");

resultsContainer.innerHTML = "";

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert("Adj meg egy keresendő növényt, vagy tünetet!");
        return;
    }

    const results = herbs.filter((herb) =>
        herb.symptoms.includes(searchTerm)
    );

    if (results.length === 0) {
        resultsContainer.innerHTML =
            "<p>Nincs találat.</p>";
        return;
    } else {
        results.forEach((herb) => {
            resultsContainer.innerHTML = `
                               <article class="result-card">
                                   <a href="herb.html?id=${herb.id}">
                                       <h3>${herb.name}</h3>
                                   </a>
                               </article>
                           `;
        });
    }
});