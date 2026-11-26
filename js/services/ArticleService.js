//* Article related logic and data operations

class ArticleService {

    //! GETTER
    async getArticleById(id) {

        const response = await api.get(`/articles/${id}`);

        return response.data;
    }
}

const articleService = new ArticleService();