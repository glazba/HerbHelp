//* Articles page logic and article list rendering


//! DOM

const articlesContainer =
    document.querySelector("#articles-container");

//! ERROR

if (!articlesContainer) {
    throw new Error(
        "#articles-container not found."
    );
}


//! RENDER

function renderArticles() {
    let html = "";

    articles.forEach((article) => {
        html +=
            createArticleCard(article);
    });

    articlesContainer.innerHTML =
        html;
}


//! INIT

function init() {
    renderArticles();
}

init();
