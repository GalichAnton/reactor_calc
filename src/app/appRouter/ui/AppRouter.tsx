import { Suspense, useCallback } from 'react';

import {
    AppRoutesProps,
    getRouteReactivityCalc,
} from '@shared/constants/routes';
import { Spinner } from '@shared/ui';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RouteConfig } from '../config/config';

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<Spinner size="large" />}>
                {route.element}
            </Suspense>
        );
        return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return (
        <Routes>
            {Object.values(RouteConfig).map(renderWithWrapper)}
            <Route
                path={'/'}
                element={<Navigate to={getRouteReactivityCalc()} />}
            />
        </Routes>
    );
};
