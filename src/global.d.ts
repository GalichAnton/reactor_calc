declare module 'bessel' {
    interface Bessel {
        besselj: (x: number, n: number) => number;
        bessely: (x: number, n: number) => number;
        besseli: (x: number, n: number) => number;
        besselk: (x: number, n: number) => number;
        version: string;
    }

    const BESSEL: Bessel;
    export default BESSEL;
}
