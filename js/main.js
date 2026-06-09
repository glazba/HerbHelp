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
        console.log("Nincs találat.");
        //return;
    } else {
        results.forEach((herb) => {
            console.log(herb.name);
        });
    }
});

const herbs = [
    {
        name: "kamilla",
        symptoms: ["torokfájás", "stressz"]
    },
    {
        name: "kakukkfű",
        symptoms: ["köhögés", "megfázás"]
    },
    {
        name: "citromfű",
        symptoms: ["stressz", "álmatlanság", "alvászavar"]
    }
];

