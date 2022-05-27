import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { summonerApi } from "../lib/request";

export interface GetSummonerParameter {
    summonerName: string;
}

// TODO: axios success callback function
const errorException = (err) => {
    const errors = err as Error | AxiosError;

    if (axios.isAxiosError(errors)) {
        throw !!errors.response?.data.error?.message
            ? errors.response?.data.error?.message
            : '예기치 못한 오류가 발생하였습니다.';
    }

    return null;
};

export async function getSummoner(
    _req: AxiosRequestConfig & GetSummonerParameter,
): Promise<null> {
    try {
        const response: AxiosResponse<any> = await summonerApi.get(`/api/summoner/${_req.summonerName}`);

        return response.data;
    } catch (err) {
        return errorException(err);
    }
}
