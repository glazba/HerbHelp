
-- =============================================
-- HERBHELP DATABASE SCHEMA
-- =============================================

USE herbhelp_db;


-- =============================================
-- 1. ADMINS
-- =============================================

CREATE TABLE admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================================
-- 2. HERBS
-- =============================================

CREATE TABLE herbs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    usage_text TEXT NOT NULL,
    warnings TEXT NOT NULL,
    image_url VARCHAR(500) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- =============================================
-- 3. SYMPTOMS
-- =============================================

CREATE TABLE symptoms (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- =============================================
-- 4. HERB_SYMPTOMS
-- =============================================

CREATE TABLE herb_symptoms (
    herb_id INT UNSIGNED NOT NULL,
    symptom_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (herb_id, symptom_id),

    CONSTRAINT fk_herb_symptoms_herb
        FOREIGN KEY (herb_id)
        REFERENCES herbs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_herb_symptoms_symptom
        FOREIGN KEY (symptom_id)
        REFERENCES symptoms(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- =============================================
-- 5. ARTICLES
-- =============================================

CREATE TABLE articles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content LONGTEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
