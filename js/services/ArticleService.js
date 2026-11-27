//* Article related logic and data operations

class ArticleService {

    //! GETTER

    async getAllArticles() {
        const response = await api.get("/articles");

        return response.data;
    }

    async getArticleById(id) {
        const response = await api.get(`/articles/${id}`);

        return response.data;
    }
}

const articleService = new ArticleService();