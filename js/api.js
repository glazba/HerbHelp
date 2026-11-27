const API_BASE_URL = "http://localhost:3000/api";

//! API REQUEST
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || `HTTP error: ${response.status}`
            );
        }

        return data;

    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
}

//! API EXPORTS
const api = {
    get(endpoint) {
        return apiRequest(endpoint, {
            method: "GET",
        });
    },

    post(endpoint, body) {
        return apiRequest(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        });
    },

    put(endpoint, body) {
        return apiRequest(endpoint, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    },

    delete(endpoint) {
        return apiRequest(endpoint, {
            method: "DELETE"
        });
    }
};

window.api = api;