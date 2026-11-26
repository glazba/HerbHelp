//* Herb related logic and data operations

class HerbService {

    //! SEARCH
    async searchHerbs(searchTerm) {

        const response = await AudioParam.get("/herbs");
        const herbs = response.data;

        const normalizedSearchTerm =
            normalizeText(searchTerm);

        return herbs.filter((herb) => {

            const herbName =
                normalizeText(herb.name);

            const symptoms =
                herb.symptoms.map((symptom) =>
                    normalizeText(symptom));

            return herbName.includes(normalizedSearchTerm)
                || symptoms.includes(normalizedSearchTerm);
        });
    }

    //! GETTERS
    async getHerbById(id) {
        const response = await api.get(`/herbs/${id}`);
        return response.data;
    }

    async getFeaturedHerbs() {
        const response = await api.get("/herbs");
        return response.data.slice(0, 3);
    }
}

const herbService = new HerbService();