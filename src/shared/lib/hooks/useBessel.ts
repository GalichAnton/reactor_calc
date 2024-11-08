import { useCallback } from 'react';

import BESSEL from 'bessel';

export const useBessel = () => {
    const calculateBesselJ = useCallback((x: number, n: number): number => {
        return BESSEL.besselj(x, n);
    }, []);

    const calculateBesselY = useCallback((x: number, n: number): number => {
        return BESSEL.bessely(x, n);
    }, []);

    const calculateBesselI = useCallback((x: number, n: number): number => {
        return BESSEL.besseli(x, n);
    }, []);

    const calculateBesselK = useCallback((x: number, n: number): number => {
        return BESSEL.besselk(x, n);
    }, []);

    return {
        besselJ: calculateBesselJ,
        besselY: calculateBesselY,
        besselI: calculateBesselI,
        besselK: calculateBesselK,
    };
};
