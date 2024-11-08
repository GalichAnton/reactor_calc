import { Param } from '../../types/param.ts';

export const areAllParamsFilled = <T extends Record<string, Param>>(
    params: T,
): boolean => {
    return Object.values(params).every((p) => p.value !== 0);
};
