const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

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

/* 
! Transfered to js/data.js
const herbs = [
    {
        id: 1,
        name: "kamilla",
        symptoms: ["torokfájás", "stressz"],
        description: "Gyulladáscsökkentő és nyugtató hatású."
    },
    {
        id: 2,
        name: "kakukkfű",
        symptoms: ["köhögés", "megfázás"],
        description: "Légúti problémák esetén használják."
    },
    {
        id: 3,
        name: "citromfű",
        symptoms: ["stressz", "álmatlanság", "alvászavar"],
        description: "Nyugtató hatású gyógynövény"
    }
];
 */
const resultsContainer = document.querySelector("#results-container");
resultsContainer.innerHTML = "";
