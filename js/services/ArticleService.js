//* Article related logic and data operations

class ArticleService {
    getArticleById(id) {
        return articles.find((article) =>
            article.id === id);
    }
}

const articleService =
    new ArticleService();