import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface TierRankProps {
    division: string;
    imageUrl: string;
    lp: number;
    name: string;
    shortString: string;
    string: string;
    tier: string;
    tierDivision: string;
    tierRankPoint: number;
}

export interface LeagueItemProps {
    hasResults: boolean;
    losses: number;
    wins: number;
    tierRank: TierRankProps;
}

export interface SummonerState {
    summonerName: string | undefined;
    leagues: LeagueItemProps[];
    searchKeywordList: string[];
}

const initialState: SummonerState = {
    summonerName: '',
    leagues: [],
    searchKeywordList: [],
};

const summonerSlice = createSlice({
    name: 'summoner',
    initialState,
    reducers: {
        setSummonerName: (state: SummonerState, action) => {
            state.summonerName = action.payload;
        },
        setSummonerLeagues: (state: SummonerState, action) => {
            state.leagues = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state: SummonerState, action) => {
            return {
                ...state,
                ...action.payload.summoner,
            };
        },
    },
});

export const summonerActions = summonerSlice.actions;
export default summonerSlice;
