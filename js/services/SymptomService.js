//* Symptom related logic and data operations

class SymptomService {

    //! GETTERS
    
    getAllSymptoms() {
        return [...new Set(
            herbs.flatMap(
                (herb) => herb.symptoms
            )
        )].sort();
    }

    getSymptomsData() {
        const symptomsMap = {};

        herbs.forEach((herb) => {

            herb.symptoms.forEach((symptom) => {

                if (!symptomsMap[symptom]) {
                    symptomsMap[symptom] = {
                        name: symptom,
                        herbsToUse: []
                    };
                }

                symptomsMap[symptom]
                    .herbsToUse
                    .push({
                        id: herb.id,
                        name: herb.name
                    });
            });
        });

        return Object.values(symptomsMap)
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
