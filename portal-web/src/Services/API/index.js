import { api, URL } from './settings';

export const API = {
    login: async (username, password) => {
        const params = {
            username,
            password
        };

        const teste = {
            success: 'Sucesso',
            data: 'Dados'
        }

        //const response = await api().post(URL.base, params);

        const { success, data } = teste //response.data;
        return { success, data };
    },
}