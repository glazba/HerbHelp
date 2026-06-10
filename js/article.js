//* Single article page logic and article details rendering

const params =
    new URLSearchParams(
        window.location.search
    );

const articleId =
    Number(
        params.get("id")
    );

const article =
    getArticlesById(articleId);

    
//! GUARD

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


articleTitle.textContent =
    article.title;

articleDescription.textContent =
    article.description;

articleContent.textContent =
    article.content;

