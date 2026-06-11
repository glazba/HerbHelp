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
            "A kakukkfű hagyományosan légúti panaszok, köhögés és megfázás esetén alkalmazott gyógynövény. Illóolajai hozzájárulhatnak a légutak tisztításához.",
        usage:
            "Leggyakrabban tea formájában fogyasztják, de inhalálásra és szirupok összetevőjeként is használható.",
        warnings:
            "Nagy mennyiségben emésztőrendszeri panaszokat okozhat. Terhesség alatt alkalmazása előtt ajánlott szakember véleményét kikérni.",
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
            "Általában jól tolerálható, azonban túlzott fogyasztása álmosságot és csökkent koncentrációt okozhat.",
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
        symptoms: ["allergia", "fáradtság", "ízületi panaszok"],
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
        symptoms: ["megfázás", "köhögés", "stressz"],
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
            "A bodzavirág népszerű gyógynövény, amelyet légúti panaszok és megfázás esetén alkalmaznak.",
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
    {
        id: 11,
        name: "Orbáncfű",
        symptoms: ["stressz", "szorongás", "hangulatingadozás"],
        description:
            "Az orbáncfű hagyományosan a hangulat javítására és az idegrendszer támogatására használt gyógynövény.",
        usage:
            "Leggyakrabban tea, kapszula vagy kivonat formájában alkalmazzák stressz, enyhe szorongás és hangulatingadozás esetén.",
        warnings:
            "Számos gyógyszerrel kölcsönhatásba léphet, ezért rendszeres gyógyszerszedés mellett használata előtt szakemberrel ajánlott konzultálni.",
        image:
            "assets/orbancfu.jpg"
    },
    {
        id: 12,
        name: "Cickafark",
        symptoms: ["görcsök", "emésztési problémák", "menstruációs panaszok"],
        description:
            "A cickafark sokoldalú gyógynövény, amelyet emésztési panaszok és női egészségügyi problémák esetén alkalmaznak.",
        usage:
            "Tea formájában fogyasztható emésztési görcsök, puffadás vagy menstruációs panaszok enyhítésére.",
        warnings:
            "Fészkesvirágzatú növényekre érzékenyeknél allergiás reakciót válthat ki.",
        image:
            "assets/cickafark.jpg"
    },
    {
        id: 13,
        name: "Édeskömény",
        symptoms: ["puffadás", "emésztési problémák"],
        description:
            "Az édeskömény aromás gyógynövény, amelyet elsősorban emésztési panaszok és puffadás enyhítésére használnak.",
        usage:
            "Tea vagy a magok rágása formájában alkalmazható emésztési problémák esetén.",
        warnings:
            "Ritka esetben allergiás reakciót válthat ki. Várandósság alatt használata előtt ajánlott szakemberrel konzultálni.",
        image:
            "assets/edeskomeny.jpg"
    },
    {
        id: 14,
        name: "Aloe Vera",
        symptoms: ["bőrirritáció", "égés", "száraz bőr"],
        description:
            "Az aloe vera levelei gélszerű anyagot tartalmaznak, amelyet elsősorban bőrápolásra használnak.",
        usage:
            "Külsőleg alkalmazható kisebb égési sérülések, bőrirritációk és száraz bőr esetén.",
        warnings:
            "Belső fogyasztása csak megfelelő készítmény formájában javasolt.",
        image:
            "assets/aloevera.jpg"
    },
    {
        id: 15,
        name: "Máriatövis",
        symptoms: ["májvédelem", "emésztési problémák", "méregtelenítés"],
        description:
            "A máriatövis legismertebb hatóanyaga a szilimarin, amely a máj védelmében játszhat szerepet.",
        usage:
            "Tea vagy étrend-kiegészítő formájában használják a májműködés támogatására.",
        warnings:
            "Krónikus betegségek vagy gyógyszerszedés esetén ajánlott szakember véleményét kikérni.",
        image:
            "assets/mariatovis.jpg"
    },
    {
        id: 16,
        name: "Rozmaring",
        symptoms: ["koncentráció", "fáradékonyság", "fejfájás"],
        description:
            "A rozmaring élénkítő hatású gyógynövény, amely támogatja a koncentrációt és a mentális frissességet.",
        usage:
            "Tea, fűszer vagy illóolaj formájában alkalmazható fáradtság és koncentrációs nehézségek esetén.",
        warnings:
            "Illóolajának nagy mennyiségű használata kerülendő.",
        image:
            "assets/rozmaring.jpg"
    }
];

const articles = [
    {
        id: 1,
        title:
            "Hogyan készítsünk gyógynövényteát?",
        description:
            "Ismerd meg a gyógynövényteák helyes elkészítésének alapjait, hogy a lehető legtöbbet hozhasd ki a természetes alapanyagokból.",

        content:
            `A gyógynövényteák elkészítése egyszerűnek tűnhet, azonban néhány alapvető szabály betartásával jelentősen javítható az ízük és a hatékonyságuk. 
            Az első lépés mindig a megfelelő minőségű gyógynövény kiválasztása. Használhatunk szárított vagy friss növényeket, 
            de fontos, hogy megbízható forrásból származzanak.
            
            Általánosságban egy teáskanál szárított gyógynövényt érdemes használni egy csésze forró vízhez.
            A legtöbb gyógynövény esetében 5–10 perc áztatási idő elegendő. A túl rövid áztatás gyengébb ízt eredményezhet, 
            míg a túl hosszú áztatás keserűvé teheti a teát.
            
            A különböző növények eltérő elkészítést igényelhetnek. 
            A levelek és virágok általában forrázással készülnek, míg a gyökerek és kérgek esetében gyakran főzet készítése ajánlott. 
            Fontos, hogy mindig tájékozódjunk az adott gyógynövény sajátosságairól.
            
            A gyógynövényteák rendszeres fogyasztása hozzájárulhat a mindennapi jólléthez, de nem helyettesítik az orvosi kezelést.
            Tartós vagy súlyos panaszok esetén minden esetben érdemes szakemberhez fordulni.`
    },
    {
        id: 2,
        title:
            "Mikor forduljunk orvoshoz?",
        description:
            "A gyógynövények hasznos kiegészítői lehetnek az egészséges életmódnak, de bizonyos esetekben elengedhetetlen a szakszerű orvosi ellátás.",
        content:
            `A gyógynövények évszázadok óta támogatják az emberek egészségét, azonban fontos tudni, 
            hogy nem minden panasz kezelhető kizárólag természetes módszerekkel.
            Egyes tünetek komolyabb betegségek jelei lehetnek, ezért időben fel kell ismerni, mikor szükséges orvoshoz fordulni.
            
            Ha a tünetek hirtelen jelentkeznek, rendkívül erősek, vagy több napon keresztül sem javulnak, érdemes szakember véleményét kérni.
            Magas láz, légzési nehézség, mellkasi fájdalom, erős vérzés vagy hirtelen kialakuló súlyos fájdalom esetén azonnali orvosi ellátás szükséges. 
            
            Krónikus betegségek esetén különösen fontos az óvatosság. 
            A gyógynövények bizonyos esetekben kölcsönhatásba léphetnek a rendszeresen szedett gyógyszerekkel, 
            ezért használatuk előtt ajánlott konzultálni kezelőorvossal vagy gyógyszerésszel. 
            
            A természetes megoldások kiváló kiegészítői lehetnek az egészséges életmódnak, 
            de nem helyettesítik a megfelelő diagnózist és kezelést. 
            A legjobb eredmény gyakran a hagyományos orvoslás és a tudatos életmód együttes alkalmazásával érhető el.`
    },
    {
        id: 3,
        title:
            "Gyógynövények biztonságos használata",
        description:
            "Tudd meg, hogyan használhatod felelősen és biztonságosan a gyógynövényeket a mindennapokban.",

        content:
            `A gyógynövények természetes eredetűek, azonban ez nem jelenti azt, hogy minden esetben teljesen kockázatmentesek.
            Ahogy a gyógyszerek, úgy a gyógynövények is tartalmaznak aktív hatóanyagokat, amelyek hatással lehetnek a szervezetre.
            
            Mindig tartsuk be az ajánlott adagolást, és kerüljük a túlzott fogyasztást. 
            Egyes gyógynövények hosszú távú vagy nagy mennyiségű alkalmazása nem kívánt mellékhatásokat okozhat.
            Terhesség, szoptatás vagy krónikus betegségek esetén különösen fontos az elővigyázatosság.
            
            A gyógynövényeket érdemes megbízható forrásból beszerezni, hogy biztosak lehessünk azok minőségében és tisztaságában. 
            A helytelenül azonosított vagy szennyezett növényi készítmények egészségügyi kockázatot jelenthetnek. 
            
            Fontos figyelembe venni a gyógyszerkölcsönhatásokat is. 
            Egyes gyógynövények befolyásolhatják bizonyos gyógyszerek hatását,
             ezért rendszeres gyógyszerszedés esetén mindig ajánlott szakember tanácsát kérni.

            A tudatos és felelős használat segít abban, hogy a gyógynövények előnyeit biztonságosan élvezhessük a mindennapokban.`
    }
];
