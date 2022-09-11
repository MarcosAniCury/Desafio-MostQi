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
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response.data;
            if (responseAxios['success'] == undefined)
            {
                responseAxios.success = responseAxios.status != 400;
            }
        });

        return { ...responseAxios };
    },
}