import axios, { AxiosRequestConfig } from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const SUMMONER_API_URL = serverRuntimeConfig.SUMMONER_API_URL || publicRuntimeConfig.SUMMONER_API_URL;

export const summonerApi = axios.create({
    baseURL: SUMMONER_API_URL,
    transformResponse: (data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            return Promise.reject(e);
        }
    },
});

summonerApi.interceptors.request.use((req: AxiosRequestConfig) => {
    try {
        if (req.headers !== undefined) {
            req.headers['Content-Type'] = 'application/json';
        }
    } catch (e) {
        return Promise.reject(e);
    }

    return req;
});
