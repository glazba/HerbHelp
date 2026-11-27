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

async function renderArticles() {
    const articles = await articleService.getAllArticles();

    let html = "";

    articles.forEach((article) => {
        html +=
            createArticleCard(article);
    });

    articlesContainer.innerHTML =
        html;
}


//! INIT

async function init() {
    await renderArticles();
}

init().catch((error) => {
    console.error("Failed to initialize articles page:", error);
});
