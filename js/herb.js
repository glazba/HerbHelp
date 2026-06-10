const params = new URLSearchParams(window.location.search);

const herbId = Number(params.get("id"));

// console.log(herbId);

const herb = herbs.find(
    (herb) => herb.id === herbId
);

//! Error
if (!herbId) {
    document.body.innerHTML = `
        <h1>Növény nem található.</h1>
    `;

    throw new Error("Herb not found");
}

const herbName =
    document.querySelector("#herb-name");

herbName.textContent = herb.name;

const herbDescription =
    document.querySelector("#herb-description");

herbDescription.textContent = herb.description;

const herbUsage =
    document.querySelector("#herb-usage");

herbUsage.textContent =
    herb.usage;

const herbSymptoms =
    document.querySelector("#herb-symptoms");

herb.symptoms.forEach((symptom) => {
    symptomList.innerHTML += `
        <li>${symptom}</li>
    `
})

const herbWarnings =
    document.querySelector("#herb-warnings");

herbWarnings.textContent =
    herb.warnings;

const herbImage =
    document.querySelector("#herb-image");

herbImage.src = herb.image;
herbImage.alt = herb.name;


