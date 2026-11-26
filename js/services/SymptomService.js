//* Symptom related logic and data operations

class SymptomService {

    //! GETTERS

    async getAllSymptoms() {

        const response = await api.get("/symptoms");

        return response.data
            .map((symptom) => symptom.name)
            .sort((a, b) =>
                a.localeCompare(b, "hu")
            );
    }

    async getSymptomsData() {

        const response = await api.get("/symptoms");

        return response.data
            .map((symptom) => ({
                name: symptom.name,
                herbsToUse: symptom.herbs
            }))
            .sort((a, b) =>
                a.name.localeCompare(b.name, "hu")
            );
    }

    getPopularSymptoms() {

        return [
            "stressz",
            "köhögés",
            "megfázás",
            "álmatlanság",
            "hányinger",
            "torokfájás"
        ];
    }
}

const symptomService = new SymptomService();
