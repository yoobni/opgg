import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { summonerApi } from "../lib/request";
import { POSITIONS } from "../lib/values";
import { LeagueItemProps } from '../stores/summoner/summoner';

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
): Promise<SummonerProps | null> {
    try {
        const response: AxiosResponse<SummonerProps> = await summonerApi.get(`/api/summoner/${_req.summonerName}`);

        return response.data;
    } catch (err) {
        return errorException(err);
    }
}

export async function getMatchDetail(
    _req: AxiosRequestConfig & GetSummonerGameParameter,
): Promise<MatchDetailProps | null> {
    const {
        summonerName,
        gameId,
    } = _req;

    try {
        const response: AxiosResponse<MatchDetailProps> = await summonerApi.get(`/api/summoner/${summonerName}/matchDetail/${gameId}`);

        return response.data;
    } catch (err) {
        return errorException(err);
    }
}

export async function getMatches(
    _req: AxiosRequestConfig & GetSummonerNameParameter,
): Promise<MatchesProps | null> {
    try {
        const response: AxiosResponse<MatchesProps> = await summonerApi.get(`/api/summoner/${_req.summonerName}/matches`);

        return response.data;
    } catch (err) {
        return errorException(err);
    }
}

export async function getMostInfo(
    _req: AxiosRequestConfig & GetSummonerNameParameter,
): Promise<MostInfoProps | null> {
    try {
        const response: AxiosResponse<MostInfoProps> = await summonerApi.get(`/api/summoner/${_req.summonerName}/mostInfo`);

        return response.data;
    } catch (err) {
        return errorException(err);
    }
}

export function getItemInfo() {
    return axios.get(
        `http://ddragon.leagueoflegends.com/cdn/10.15.1/data/ko_KR/item.json`,
    );
}

export interface GetSummonerNameParameter {
    summonerName: string;
}

export interface GetSummonerGameParameter {
    summonerName: string;
    gameId: number | string;
}
// Summoner
export interface PreviousTiers {
    season: string,
    tier: string,
}

export interface SummonerProps {
    summoner: {
        leagues: LeagueItemProps[],
    },
    ladderRank: {
        rank: string,
        rankPercentOfTop: string,
    },
    level: number,
    name: string,
    profileBorderImageUrl: string,
    profileImageUrl: string,
    previousTiers: PreviousTiers[],
}
// Matches
export interface Summary {
    kills: number,
    deaths: number,
    assists: number,
    wins: number,
    losses: number,
}

export interface Champion extends Summary {
    name: string,
    imageUrl: string,
    games: number,
    cs?: string,
}

export interface Position {
    games: number,
    wins: number,
    position: POSITIONS,
}

export interface Stats {
    general: {
        kill: number,
        death: number,
        assist: number,
        kdaString: string,
        largestMultiKillString: string,
        opScoreBadge: string,
        cs: number,
        csPerMin: number,
        contributionForKillRate: string,
    },
    ward: {
        visionWardsBought: number,
    }
}

interface ImageProps {
    imageUrl: string,
}

export interface Game {
    champion: {
        imageUrl: string,
        level: number,
    },
    isWin: boolean,
    gameId: string,
    gameType: string,
    gameLength: number,
    summonerName: string,
    createDate: number,
    stats: Stats,
    spells: ImageProps[],
    items: ImageProps[],
    peak: string[],
}

export interface MatchesProps {
    summary: Summary,
    champions: Champion[],
    positions: Position[],
    games: Game[],
}

// Match Detail
export interface Player {
    summonerName: string,
    champion: ImageProps,
}

export interface Team {
    players: Player[],
}

export interface MatchDetailProps {
    teams: Team[],
}

// Most Info
export interface MostInfoProps {
    champions: Champion[],
    recentWinRate: [],
}