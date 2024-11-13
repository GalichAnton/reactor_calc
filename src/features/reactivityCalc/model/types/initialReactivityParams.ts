import { OPERATING_MODE } from '@features/reactivityCalc';

export interface InitialReactivityParams {
    velocity: number;
    mode: OPERATING_MODE;
    startReactivity: number;
    height: number;
    power: number;
    interval: number;
    nominalPower: number;
    reactorHeight: number;
    thermalPower: number;
    process: number;
    nTvs: number;
    nTvel: number;
    r_t: number;
    uraniumVolume: number;
}
