//* Reusable data processing and search helper functions


//! SEARCH HELPER

function normalizeText(text) {
    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function capitalize(text) {
    return text.charAt(0).toUpperCase()
        + text.slice(1);
}