import { betta, lambda, Lambda } from '../../constants/general.ts';

export const calcC = (prevC: number, n: number, interval: number) => {
    return prevC + interval * ((n * betta) / Lambda - lambda * prevC);
};
