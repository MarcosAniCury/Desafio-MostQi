import { URL } from './settings';
import axios from 'axios';

export const API = {
    login: async (username, email, password) => {
        const params = {
            "name": username,
            "password": password,
            "email": email
        };

        let responseAxios = {};

        await axios.post(URL.base + URL.user.create, params).then((response) => {
            responseAxios = {
                'data': response.data,
                'success': response.status == 201
            }; 
        });

        return { ...responseAxios };
    },
}