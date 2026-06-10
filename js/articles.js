//* Articles page logic and article list rendering

//! DOM
const articlesContainer =
    document.querySelector("#articles-container");

function renderArticles() {
    let html = "";

    articles.forEach((article) => {
        html +=
            createArticleCard(article);
    });

    articlesContainer.innerHTML =
        html;
}

function init() {
    renderArticles();
}

//! INIT
init();