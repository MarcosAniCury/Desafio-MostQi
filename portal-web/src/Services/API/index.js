import { URL } from './settings';
import axios from 'axios';

export const API = {
    login: async (username, password) => {
        const params = {
            "name": username,
            "password": password,
        };

        let responseAxios = {};

        await axios.post(URL.base + URL.user.login, params).then((response) => {
            responseAxios = {
                'data': response.data,
                'success': response.status == 201
            }; 
        });

        console.log(responseAxios);

        return { ...responseAxios };
    },
}