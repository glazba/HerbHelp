const herbsContainer =
    document.querySelector("#herbs-container");

function renderHerbs() {
    herbs.forEach((herb) => {
        herbsContainer.innerHTML += `
    
            <article class="herb-card">

                <h2>${herb.name}</h2>

                <p>${herb.description}</p>

                <a href="herb.html?id=${herb.id}">
                    Megnyitás
                </a>
            </article>
        `;
    });
}

renderHerbs();