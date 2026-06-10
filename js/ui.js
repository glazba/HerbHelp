//! DOM

//! FUNCTIONS

function createHerbCard(herb) {
    return `
        <article class="herb-card">
            
            <a href="herb.html?id=${herb.id}">
                
                <img
                    src="${herb.image}"
                    alt="${herb.name}"
                >

                <div class="herb-content">
                    <h3>${herb.name}</h3>
                    <p>${herb.description}</p>
                </div>

            </a>
            
        </article>
    `;
}

//! INIT