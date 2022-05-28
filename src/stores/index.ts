import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { createWrapper } from 'next-redux-wrapper';
import { AnyAction, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/src/getDefaultMiddleware';

import summonerSlice, { SummonerState } from './summoner/summoner';

// ToDo: 새로운 redux toolkit slice 추가 시 타입 명시
export let store: EnhancedStore<
    { summoner: SummonerState; },
    AnyAction,
    [
        ThunkMiddlewareFor<{ summoner: SummonerState; }>,
    ]
> | null = null;

const makeStore = () => {
    store = configureStore({
        devTools: !!publicRuntimeConfig.REDUX_DEV_TOOLS,
        reducer: {
            [summonerSlice.name]: summonerSlice.reducer,
        },
    });

    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const wrapper = createWrapper(makeStore);
export default wrapper;
