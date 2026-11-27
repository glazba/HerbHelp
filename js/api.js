
const API_BASE_URL = "http://localhost:3000/api";


//! API REQUEST

async function apiRequest(endpoint, options = {}) {

    try {

        const headers = {
            Accept: "application/json",
            ...options.headers
        };

        if (options.body) {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            {
                ...options,
                credentials: "include",
                headers
            }
        );

        const contentType =
            response.headers.get("content-type");

        let data = null;

        if (contentType?.includes("application/json")) {
            data = await response.json();
        }

        if (!response.ok) {

            const error = new Error(
                data?.message || `HTTP error: ${response.status}`
            );

            error.status = response.status;
            error.data = data;

            throw error;
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
            method: "GET"
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
