import { apiUrl } from 'config';
import { userService } from './user.service';

export const plantingService = {
    getAll,
    create,
    clone,
    getById,
    getByPlantId,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/plantings`;

async function getAll() {
    const response = await fetch(`${baseUrl}?userid=${userService.getId()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}

async function create(params) {
    const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    return response.json();
}

async function clone(params) {
    const response = await fetch(`${baseUrl}?userid=${userService.getId()}&preset=true`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    return response.json();
}

async function getById(id) {
    const response = await fetch(`${baseUrl}?id=` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}

async function getByPlantId(id) {
    const response = await fetch(`${baseUrl}?plantid=` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}

async function update(id, params) {
    const response = await fetch(`${baseUrl}?id=` + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    return response.json();
}

async function _delete(id) {
    const response = await fetch(`${baseUrl}?id=` + id, {
        method: "Delete",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}