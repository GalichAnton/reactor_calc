import { betta, Lambda, lambda } from '../../constants/general.ts';

export const calcPower = (
    prevPower: number,
    interval: number,
    c: number,
    ro: number,
) => {
    return (
        (prevPower + interval * lambda * c) /
        (1 - interval * ((ro - betta) / Lambda))
    );
};
