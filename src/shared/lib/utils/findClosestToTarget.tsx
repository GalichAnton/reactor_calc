export function findClosestToTarget(
    x?: number[],
    f?: number[],
    target: number = 1,
): { x: number; y: number; index: number } {
    if (!x || !f) {
        return { x: 0, y: 0, index: -1 };
    }

    if (x.length !== f.length) {
        throw new Error('Длины массивов x и f должны совпадать');
    }

    let closestIndex = -1;
    let smallestDifference = Infinity;

    for (let i = 0; i < f.length; i++) {
        const difference = Math.abs(f[i] - target);
        if (difference < smallestDifference) {
            smallestDifference = difference;
            closestIndex = i;
        }
    }

    if (closestIndex !== -1) {
        return { x: x[closestIndex], y: f[closestIndex], index: closestIndex };
    }

    return { x: 0, y: 0, index: -1 };
}
