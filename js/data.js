//* Static application data (herbs, articles and other content)
const herbs = [
    {
        id: 1,
        name: "Kamilla",
        symptoms: [
            "torokfájás",
            "stressz"
        ],
        description:
            "Gyulladáscsökkentő és nyugtató hatású gyógynövény.",
        usage:
            "Tea, borogatás és inhalálás formájában fogyasztható.",
        warnings:
            "Fészkesvirágzatúakra érzékenyeknél allergiás reakciót okozhat.",
        image:
            "assets/kamilla.jpg"
    },
    {
        id: 2,
        name: "Kakukkfű",
        symptoms: [
            "köhögés",
            "megfázás"
        ],
        description:
            "Légúti problémák esetén használják.",
        usage:
            "Tea formájában fogyasztható.",
        warnings:
            "Lorem ipsum.",
        image:
            "assets/kakukkfu.jpg"
    },
    {
        id: 3,
        name: "Citromfű",
        symptoms: [
            "stressz",
            "alvászavar",
            "álmatlanság"
        ],
        description:
            "Nyugtató hatású gyógynövény.",
        usage:
            "Tea formájában fogyasztható.",
        warnings:
            "Lorem ipsum.",
        image:
            "assets/citromfu.jpg"
    },

    {
        id: 4,
        name: "Levendula",
        symptoms: ["stressz", "álmatlanság", "alvászavar"],
        description:
            "A levendula nyugtató hatású gyógynövény, amely segíthet a stressz csökkentésében és a pihentető alvás elősegítésében.",
        usage:
            "Tea, illóolaj vagy fürdő formájában használható.",
        warnings:
            "Nagy mennyiségben fáradékonyságot okozhat.",
        image:
            "assets/levendula.jpg"
    },
    {
        id: 5,
        name: "Borsmenta",
        symptoms: ["hasfájás", "emésztési panaszok", "hányinger"],
        description:
            "A borsmenta frissítő hatású gyógynövény, amelyet gyakran alkalmaznak emésztési problémák és hányinger enyhítésére.",
        usage:
            "Leggyakrabban tea formájában fogyasztják, de illóolajként is használható.",
        warnings:
            "Reflux esetén fokozhatja a tüneteket.",
        image:
            "assets/borsmenta.jpg"
    },
    {
        id: 6,
        name: "Csalán",
        symptoms: ["allergia", "fáradtság", "izületi panaszok"],
        description:
            "A csalán vitaminokban és ásványi anyagokban gazdag növény, amelyet gyakran alkalmaznak allergiás tünetek és fáradékonyság esetén.",
        usage:
            "Tea vagy étrend-kiegészítő formájában fogyasztható.",
        warnings:
            "Vízhajtó hatása miatt fokozott folyadékbevitel ajánlott.",
        image:
            "assets/csalan.jpg"
    },
    {
        id: 7,
        name: "Gyömbér",
        symptoms: ["megfázás", "torokfájás", "hányinger"],
        description:
            "A gyömbér gyulladáscsökkentő és immunerősítő hatásáról ismert gyógynövény.",
        usage:
            "Tea, friss gyökér vagy étrend-kiegészítő formájában fogyasztható.",
        warnings:
            "Véralvadásgátló gyógyszerek szedése esetén csak kis mértékben fogyasztható.",
        image:
            "assets/gyomber.jpg"
    },
    {
        id: 8,
        name: "Hársfa",
        symptoms: ["megvázás", "köhögés", "stressz"],
        description:
            "A hársfavirág hagyományosan megfázás és köhögés esetén alkalmazott növény.",
        usage:
            "Leggyakrabban teaként fogyasztják.",
        warnings:
            "Hosszútávú, nagy mennyiségű fogyasztása nem ajánlott.",
        image:
            "assets/harsfa.jpg"
    },
    {
        id: 9,
        name: "Bodza",
        symptoms: ["megfázás", "köhögés", "láz"],
        description:
            "A bodzavirág népszerú gyógynövény, amelyet légúti panaszok és megfázás esetén alkalmaznak.",
        usage:
            "Tea vagy szörp formájában fogyasztható.",
        warnings:
            "A nyers bogyók fogyasztása nem ajánlott.",
        image:
            "assets/bodza.jpg"
    },
    {
        id: 10,
        name: "Körömvirág",
        symptoms: ["bőrirritáció", "sebek", "gyulladás"],
        description:
            "A körömvirág elsősorban külsőleg alkalmazott gyógynövény, amely segítheti a bőr regenerációját.",
        usage:
            "Krém, kenőcs vagy borogatás formájában használható.",
        warnings:
            "Fészekvirágzatú növényekre allergia esetén allergiás reakciót válthat ki.",
        image:
            "assets/koromvirag.jpg"
    },
]