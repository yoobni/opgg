import { summonerActions, LeagueItemProps } from '../summoner';
import { AppDispatch, AppState } from '../../index';

export function updateSummonerName(summonerName: string) {
    return (dispatch: AppDispatch, _getState: () => AppState) => {
        dispatch(summonerActions.setSummonerName(summonerName));
    }
}

export function updateSummonerLeagues(leagues: LeagueItemProps[]) {
    return (dispatch: AppDispatch, _getState: () => AppState) => {
        dispatch(summonerActions.setSummonerLeagues(leagues));
    }
}