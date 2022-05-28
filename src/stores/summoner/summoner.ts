import {createSlice} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';


export interface SummonerState {
    summonerName: string | undefined;
}

const initialState: SummonerState = {
    summonerName: '',
};

const summonerSlice = createSlice({
    name: 'summoner',
    initialState,
    reducers: {
        setSummonerName: (state: SummonerState, action) => {
            state.summonerName = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state: SummonerState, action) => {
            return {
                ...state,
                ...action.payload.furniture,
            };
        },
    },
});

export const summonerActions = summonerSlice.actions;
export default summonerSlice;
