import { summonerActions } from '../summoner';
import { AppDispatch, AppState } from '../../index';

export function updateSummonerName(summoner: string | undefined) {
    console.log(summoner);
    return (dispatch: AppDispatch, _getState: () => AppState) => {
        dispatch(summonerActions.setSummonerName(summoner));
    }
}