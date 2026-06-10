//* Herb related logic and data operations

class HerbService {
    searchHerbs(searchTerm) {

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

    getHerbById(id) {
        return herbs.find((herb) =>
            herb.id === id);
    }

    getFeaturedHerbs() {
        return herbs.slice(0, 3);
    }
}

const herbService = new HerbService();