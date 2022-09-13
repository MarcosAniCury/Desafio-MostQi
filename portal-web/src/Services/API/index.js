import { URL } from './settings';
import axios from 'axios';

export const API = {
    signin: async (username, password) => {
        const params = {
            'name': username,
            'password': password,
        };

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.user.signin}`, params).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response.data;
            if (responseAxios['success'] == undefined)
            {
                responseAxios.success = responseAxios.status != 400 || responseAxios.status != 500;
            }
        });

        return { ...responseAxios };
    },
    signup: async (username, email, password, type) => {
        const params = {
            'name': username,
            'email': email,
            'password': password,
            'type': type
        }

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.user.signup}`, params).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response.data;
            if (responseAxios['success'] == undefined) {
                responseAxios.success = responseAxios.status != 400 || responseAxios.status != 500;
            }
        });

        return { ...responseAxios };
    },
    getUserById: async (userId, access_token) => {
        let responseAxios = {};

        const config = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        };

        await axios.get(`${URL.base}${URL.user.getById}/${userId}`, config).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response.data;
            if (responseAxios['success'] == undefined)
            {
                responseAxios.success = responseAxios.status != 400 || responseAxios.status != 500;
            }
        });

        return { ...responseAxios };
    },
    forgetPassword: async (username, email) => {
        const params = {
            'name': username,
            'email': email,
        }
            
        let responseAxios = {};

        await axios.post(`${URL.base}${URL.user.sendEmailForgetPassword}`, params).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response.data;
            if (responseAxios['success'] == undefined) {
                responseAxios.success = responseAxios.status != 400 || responseAxios.status != 500;
            }
        });

        return { ...responseAxios };
    }
}