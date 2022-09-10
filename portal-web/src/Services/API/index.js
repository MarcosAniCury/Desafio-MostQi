import { URL } from './settings';
import axios from 'axios';

export const API = {
    login: async (username, password) => {
        const params = {
            "name": username,
            "password": password,
        };

        let responseAxios = {};

        //error here test

        await axios.post(URL.base + URL.user.login, params).then((response) => {
            responseAxios = {
                'data': response.data,
                'success': response.status == 201
            }; 
        });

        return { ...responseAxios };
    },
}