import { NeutronCalc, ReactivityPage } from '@pages/index.ts';
import {
    AppRoutes,
    AppRoutesProps,
    AppRoutesType,
} from '@shared/constants/routes.ts';

export const RouteConfig: Record<AppRoutesType, AppRoutesProps> = {
    reactivityCalc: {
        path: AppRoutes.reactivityCalc,
        element: <ReactivityPage />,
    },
    neutronCalc: {
        path: AppRoutes.neutronCalc,
        element: <NeutronCalc />,
    },
};
