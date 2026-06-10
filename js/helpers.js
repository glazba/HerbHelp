//* Reusable data processing and search helper functions

//! SEARCH

function normalizeText(text) {
    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

//! HERBS

function searchHerbs(searchTerm) {
    const normalizedSearchTerm =
        normalizeText(searchTerm);

    return herbs.filter((herb) => {
        const herbName =
            normalizeText(herb.name);

        const symptoms =
            herb.symptoms.map((symptom) =>
                normalizeText(symptom)
            );

        return herbName.includes(
            normalizedSearchTerm
        ) ||
            symptoms.includes(
                normalizedSearchTerm
            );
    });
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

