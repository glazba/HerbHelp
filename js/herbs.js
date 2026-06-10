//! DOM
const herbsContainer =
    document.querySelector("#herbs-container");

//! Error
if (!herbsContainer) {
    throw new Error(
        "#herbs-container not found."
    );
}

//! FUNCTIONS
function createHerbCard(herb) {
    return `
        <article class="herb-card">    
            <h2>${herb.name}</h2>
            
            <p>${herb.description}</p>
            
            <a href="herb.html?id=${herb.id}">
                Megnyitás
            </a>

        </article>
    `;
}

function renderHerbs() {
    let html = "";

    herbs.forEach((herb) => {
        html += createHerbCard(herb);
    });

    herbsContainer.innerHTML = html;
}

function init() {
    renderHerbs();
}

//! INIT
init();

