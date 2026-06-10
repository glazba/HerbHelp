//* 

function getAllSymptoms() {
    return [...new Set(
        herbs.flatMap(
            (herb => herb.symptoms)
        )
    )].sort();
}

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