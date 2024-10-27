import type { RouteProps } from 'react-router-dom';

export const getRouteReactivityCalc = () => '/reactivityCalc';
export const getRouteNeutronCalc = () => '/neutronCalc';

export const AppRoutes = {
    reactivityCalc: getRouteReactivityCalc(),
    neutronCalc: getRouteNeutronCalc(),
} as const;

export type AppRoutesType = keyof typeof AppRoutes;

export type AppRoutesProps = RouteProps & {
    // TODO access policy
};
