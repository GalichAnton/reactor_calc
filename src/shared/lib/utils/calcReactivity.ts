import { k } from '../../constants/general.ts';

export const calcReactivity = (
    prevReactivity: number,
    prevH: number,
    currentH: number,
) => {
    return prevReactivity + k * (prevH - currentH);
};
