//* Reusable data processing and search helper functions

//! HERBS

function searchHerbs(searchTerm) {
    return herbs.filter((herb) =>
        herb.name
            .toLowerCase()
            .includes(searchTerm) ||
        herb.symptoms
            .includes(searchTerm));
}

function getHerbById(id) {
    return herbs.find((herb) =>
        herb.id === id
    );
}

function getFeaturedHerbs() {
    return herbs.slice(0, 3);
}

//! SYMPTOMS

function getAllSymptoms() {
    return [...new Set(
        herbs.flatMap(
            (herb => herb.symptoms)
        )
    )].sort();
}

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

            symptomsMap[symptom]
                .herbsToUse
                .push({
                    id: herb.id,
                    name: herb.name
                });
        });
    });

    return Object.values(symptomsMap)
        .sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name,
                    "hu"
                )
        );
}

function getPopularSymptoms() {
    /*
        return getAllSymptoms()
            .slice(0, 6);
    */
    return [
        "stressz",
        "köhögés",
        "megfázás",
        "álmatlanság",
        "hányinger",
        "torokfájás"
    ];
}

//! ARTICLES

function getArticlesById(id) {
    return articles
        .find((article) =>
            article.id === id
        );
}

