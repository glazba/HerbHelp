
//* Articles page logic and article list rendering


//! DOM

const articlesContainer =
    document.querySelector("#articles-container");

const errorMessage =
    document.querySelector("#error-message");


//! ERROR

if (
    !articlesContainer ||
    !errorMessage
) {
    throw new Error(
        "Required articles page elements not found."
    );
}


//! RENDER

async function renderArticles() {

    const articles =
        await articleService.getAllArticles();

    let html = "";

    articles.forEach((article) => {
        html += createArticleCard(article);
    });

    articlesContainer.innerHTML = html;
}


//! INIT

async function init() {

    try {

        await renderArticles();

    } catch (error) {

        console.error(
            "Failed to initialize articles page:",
            error
        );

        showError(
            errorMessage,
            "Nem sikerült betölteni a cikkeket. Kérjük, próbáld újra később.",
            articlesContainer
        );
    }
}

init();
