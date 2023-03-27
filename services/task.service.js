import { apiUrl } from 'config';
import { userService } from './user.service';

export const taskService = {
    getAll,
    getAllByDate,
    create,
    getById,
    getByPlantingId,
    update,
    updateByStatus,
    delete: _delete,
    deleteByPlantingId
};

const baseUrl = `${apiUrl}/tasks`;

async function getAll() {
    const response = await fetch(`${baseUrl}?userid=${userService.getId()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}

async function getAllByDate() {
    const response = await fetch(`${baseUrl}?date=all&userid=${userService.getId()}`, {
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

async function getById(id) {
    const response = await fetch(`${baseUrl}?id=` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}

async function getByPlantingId(id) {
    const response = await fetch(`${baseUrl}?plantingid=` + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}

async function update(id, params) {
    const response = await fetch(`${baseUrl}?plantingid=` + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
    return response.json();
}

async function updateByStatus(id, params) {
    const response = await fetch(`${baseUrl}?iscomplete=true&id=` + id, {
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

async function deleteByPlantingId(id) {
    const response = await fetch(`${baseUrl}?plantingid=` + id, {
        method: "Delete",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json();
}