import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { summonerApi } from "../lib/request";

export interface GetSummonerNameParameter {
    summonerName: string;
}

export interface GetSummonerGameParameter {
    summonerName: string;
    gameId: number | string;
}

// TODO: axios success callback function
const errorException = (err: any) => {
    const errors = err as Error | AxiosError;

    if (axios.isAxiosError(errors)) {
        throw !!errors.response?.data.error?.message
            ? errors.response?.data.error?.message
            : '예기치 못한 오류가 발생하였습니다.';
    }

    return null;
};

export async function getSummoner(
    _req: AxiosRequestConfig & GetSummonerNameParameter,
): Promise<null> {
    try {
        const response: AxiosResponse<any> = await summonerApi.get(`/api/summoner/${_req.summonerName}`);

        return response.data;
    } catch (err) {
        return errorException(err);
    }
}

export async function getMatchDetail(
    _req: AxiosRequestConfig & GetSummonerGameParameter,
): Promise<null> {
    const {
        summonerName,
        gameId,
    } = _req;

    try {
        const response: AxiosResponse<any> = await summonerApi.get(`/api/summoner/${summonerName}/matchDetail/${gameId}`);

        return response.data;
    } catch (err) {
        return errorException(err);
    }
}

export async function getMatches(
    _req: AxiosRequestConfig & GetSummonerNameParameter,
): Promise<null> {
    try {
        const response: AxiosResponse<any> = await summonerApi.get(`/api/summoner/${_req.summonerName}/matches`);

        return response.data;
    } catch (err) {
        return errorException(err);
    }
}

export async function getMostInfo(
    _req: AxiosRequestConfig & GetSummonerNameParameter,
): Promise<null> {
    try {
        const response: AxiosResponse<any> = await summonerApi.get(`/api/summoner/${_req.summonerName}/mostInfo`);

        return response.data;
    } catch (err) {
        return errorException(err);
    }
}