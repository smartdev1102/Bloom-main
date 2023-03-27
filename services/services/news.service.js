import { apiUrl } from 'config';

export const newsService = {
    getAll
};

const baseUrl = `${apiUrl}/news`;

async function getAll() {
    const response = await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}