# 🌿 HerbHelp

HerbHelp is a vanilla JavaScript web application that helps users discover medicinal herbs, explore common symptoms, and learn through educational articles.

The project was built as a portfolio application with a strong focus on clean architecture, reusable components, maintainability, and user-friendly design.

---

## 🚀 Features

### Home Page

- Search herbs by name
- Search herbs by symptoms
- Featured herbs section
- Popular symptoms section
- Dynamic search results

### Herbs

- Browse all medicinal herbs
- Detailed herb pages
- Usage information
- Warnings and precautions
- Related symptoms

### Symptoms

- Browse common symptoms
- View recommended herbs for each symptom
- Dynamic symptom cards

### Knowledge Base

- Browse educational articles
- Read detailed articles about herbs and healthy living

---

## 🛠 Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

---

## 📂 Project Structure

```text
HerbHelp/

├── css/
│   └── style.css
│
├── js/
│   ├── services/
│   │   ├── HerbService.js
│   │   ├── ArticleService.js
│   │   └── SymptomService.js
│   │
│   ├── data.js
│   ├── helpers.js
│   ├── ui.js
│   │
│   ├── main.js
│   ├── herbs.js
│   ├── herb.js
│   ├── articles.js
│   ├── article.js
│   └── symptoms.js
│
├── index.html
├── herbs.html
├── herb.html
├── symptoms.html
├── articles.html
└── article.html
```

---

## 🏗 Architecture

The project follows a layered architecture:

```text
Data Layer
    ↓
Service Layer
    ↓
UI Layer
    ↓
Page Scripts
```

### Services

- HerbService
- ArticleService
- SymptomService

Services are responsible for business logic and data processing.

### UI Layer

Reusable UI components are centralized in:

```text
ui.js
```

Examples:

- createHerbCard()
- createArticleCard()
- createSymptomCard()

### Page Scripts

Each page has its own controller script responsible for:

- DOM selection
- Rendering
- Event handling
- Initialization

---

## 🎯 Goals

This project was created to practice:

- JavaScript fundamentals
- DOM manipulation
- Reusable UI components
- Separation of concerns
- Object-Oriented Programming concepts
- Project architecture
- Clean code principles

---

## 📸 Screenshots

Add screenshots here after deployment.

### Home Page

![Home Page](screenshots/home.png)

### Herb Details

![Herb Details](screenshots/herb-detail.png)

### Knowledge Base

![Knowledge Base](screenshots/articles.png)

---

## 🔮 Future Improvements

- Responsive mobile optimization
- Dark mode
- Advanced filtering
- Favorites system
- Search suggestions
- Local storage support

---

## 👨‍💻 Author

Created by [Your Name].

Portfolio project built with HTML, CSS and Vanilla JavaScript.
