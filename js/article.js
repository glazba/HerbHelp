//* Single article page logic and article details rendering


//! DATA

const params =
    new URLSearchParams(
        window.location.search
    );

const articleId =
    Number(
        params.get("id")
    );

const article =
    articleService.getArticleById(articleId);

//! ERROR

if (!article) {
    document.body.innerHTML = `
            <h1>Cikk nem található.</h1>
        `;
    throw new Error(
        "Article not found"
    );
}


//! DOM

const articleTitle =
    document.querySelector("#article-title");

const articleDescription =
    document.querySelector("#article-description");

const articleContent =
    document.querySelector("#article-content");


//! RENDER

function renderArticle() {
    articleTitle.textContent =
        article.title;

    articleDescription.textContent =
        article.description;

    articleContent.innerHTML =
        article.content
            .trim()
            .split(/\n\s*\n/)
            .map(
                paragraph =>
                    `<p>${paragraph}</p>`
            )
            .join("");
}


//! INIT

function init() {
    renderArticle();
}

init();
