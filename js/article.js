
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


//! DOM

const articleTitle =
    document.querySelector("#article-title");

const articleDescription =
    document.querySelector("#article-description");

const articleContent =
    document.querySelector("#article-content");


//! ERROR

if (
    !articleTitle ||
    !articleDescription ||
    !articleContent
) {
    throw new Error(
        "Required article elements not found."
    );
}


//! RENDER

function renderArticle(article) {

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

async function init() {

    const article =
        await articleService.getArticleById(articleId);

    if (!article) {
        document.body.innerHTML = `
            <h1>Cikk nem található.</h1>
        `;

        throw new Error("Article not found");
    }

    renderArticle(article);
}

init().catch((error) => {
    console.error("Failed to initialize article page:", error);
});
