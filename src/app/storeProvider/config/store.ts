import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { type ThunkExtraArg, type StateSchema } from './StateSchema';
import { EOPReducer } from '@entities/EOP';
import { userReducer } from '@entities/user';
import { enrichmentOperatorSaveReducer } from '@features/enrichment/operator/save';
import { enrichmentRuleSaveReducer } from '@features/enrichment/rule/save';
import { environmentSaveReducer } from '@features/environment/save';
import { eventNewVersionReducer } from '@features/event/addVersion';
import { eventSaveReducer } from '@features/event/save';
import { fieldSaveReducer } from '@features/field/save';
import { graphiteRuleSaveReducer } from '@features/graphiteRule/save';
import { dictionarySaveReducer } from '@features/mmExporter/dictionary/save';
import { messageSaveReducer } from '@features/mmExporter/message/save';
import { moiraTriggerReducer } from '@features/routerRule/moiraTrigger';
import { routerRuleSaveReducer } from '@features/routerRule/save';
import { apiClient, rtkApi } from '@shared/api';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        [rtkApi.reducerPath]: rtkApi.reducer,
        EOP: EOPReducer,
        user: userReducer,
        environmentSave: environmentSaveReducer,
        fieldSave: fieldSaveReducer,
        eventSave: eventSaveReducer,
        eventNewVersion: eventNewVersionReducer,
        routerRuleSave: routerRuleSaveReducer,
        moiraTrigger: moiraTriggerReducer,
        graphiteRule: graphiteRuleSaveReducer,
        enrichmentOperator: enrichmentOperatorSaveReducer,
        enrichmentRule: enrichmentRuleSaveReducer,
        dictionary: dictionarySaveReducer,
        message: messageSaveReducer,
    };

    const extraArg: ThunkExtraArg = {
        api: apiClient,
    };

    const store = configureStore({
        reducer: rootReducers,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: initialState,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
                serializableCheck: false,
                immutableCheck: false,
            }).concat(rtkApi.middleware),
    });

    // This is needed for refetchOnFocus/refetchOnReconnect
    setupListeners(store.dispatch);

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
