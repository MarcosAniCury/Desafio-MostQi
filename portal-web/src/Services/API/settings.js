import axios from 'axios';

export const authorization = 'Bearer';
export const applicationJson = 'application/json';

export const URL = {
    base: 'https://localhost:7139'
}

export const api = async () => axios.create({
    baseURL: URL.base,
    headers: {
        Authorization: `${authorization} ${undefined}`,
        'Content-Type': applicationJson,
    }
});