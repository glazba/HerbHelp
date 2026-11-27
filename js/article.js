
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

const errorMessage =
    document.querySelector("#error-message");

const articleContainer =
    document.querySelector(".article-container");


//! ERROR

if (
    !articleTitle ||
    !articleDescription ||
    !articleContent ||
    !errorMessage ||
    !articleContainer
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

    try {

        const article =
            await articleService.getArticleById(articleId);

        renderArticle(article);

    } catch (error) {

        console.error(
            "Failed to initialize article page:",
            error
        );

        if (error.status === 404) {

            showError(
                "A keresett cikk nem található."
            );

        } else {

            showError(
                errorMessage,
                "Nem sikerült betölteni a cikket. Kérjük, próbáld újra később.",
                document.querySelector(".detail-card")
            );
        }
    }
}

init();
