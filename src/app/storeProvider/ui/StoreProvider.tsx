import React, { type FC, type ReactNode } from 'react';

import { type DeepPartial } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { type StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children: ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider: FC<StoreProviderProps> = props => {
    const { children, initialState } = props;

    const store = createReduxStore(initialState as StateSchema);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                {children}
            </PersistGate>
        </Provider>
    );
};
