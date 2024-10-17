export const calcH = (
    prevH: number,
    interval: number,
    velocity: number,
    mode: number,
) => {
    return prevH + velocity * mode * interval;
};
