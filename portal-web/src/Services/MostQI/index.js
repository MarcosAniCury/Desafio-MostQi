import { URL, token } from './settings';
import axios from 'axios';

export const MostQI = {
    authentication: async () => {
        const params = {
            token: token
        }

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.user.auth}`, params).then((response) => {
            responseAxios = {
                success: true,
                data: response.data.token
            };
        }).catch((error) => {
            responseAxios = {
                success: false,
                data: error.message
            }
        });

        return { ...responseAxios };
    },
    contentExtraction: async (imageBase64, access_token) => {
        const params = {
            "fileBase64": imageBase64
        };

        const config = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        };

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.processImage.contentExtract}`, params, config).then((response) => {
            responseAxios = {
                success: true,
                data: response.data.result[0].fields
            };
        }).catch((error) => {
            responseAxios = {
                success: false,
                data: error.message
            }
        });

        return { ...responseAxios };
    },
    livenessDetection: async (imageBase64, access_token) => {
        const params = {
            "file": imageBase64,
            "movements": [
                "up",
                "down",
                "left",
                "right",
                "smile"
            ]
        };

        const config = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        };

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.processImage.livenessDetection}`, params, config).then((response) => {
            responseAxios = {
                success: true,
                data: response.data.result.frontalImage
            };
        }).catch((error) => {
            responseAxios = {
                success: false,
                data: error.status.message
            }
        });

        return { ...responseAxios };
    }
};