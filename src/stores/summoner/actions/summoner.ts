import { summonerActions } from '../summoner';
import { AppDispatch, AppState } from '../../index';

export function updateSummonerName(summonerName: string) {
    return (dispatch: AppDispatch, _getState: () => AppState) => {
        dispatch(summonerActions.setSummonerName(summonerName));
    }
}