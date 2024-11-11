import { roundToDecimal } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';

import {
    calculateAZDiameter,
    calculateAZVolume,
    calculateGeometricParameter,
    calculateKeffective,
    calculateNumberOfTVS,
    calculateReactivity,
} from './helpers.ts';
import { AZPhysParams } from '../../../model/types/azPhysParams.ts';

/**
 * Интерфейс входных параметров для расчета физических параметров активной зоны
 */
interface AZCalcProps {
    /** Шаг решетки ТВС (см) */
    latticePitch: number;
    /** Тепловая мощность реактора (МВт) */
    thermalPower: number;
    /** Удельная энергонапряженность активной зоны (кВт/л) */
    corePowerDensity: number;
    /** Высота активной зоны (см) */
    coreHeight: number;
    /** Коэффициент размножения в бесконечной среде */
    infiniteMultiplicationFactor: number;
    /** Возраст нейтронов (см²) */
    neutronAge: number;
    /** Квадрат длины диффузии (см²) */
    diffusionLengthSquared: number;
}

/**
 * Рассчитывает физические параметры активной зоны реактора
 *
 * @param {AZCalcProps} params - Входные параметры для расчета
 * @returns {Promise<SetParams<AZPhysParams>>} Объект с рассчитанными параметрами активной зоны
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateAZParams = async (
    params: AZCalcProps,
): Promise<SetParams<AZPhysParams>> => {
    const {
        latticePitch,
        thermalPower,
        corePowerDensity,
        coreHeight,
        infiniteMultiplicationFactor,
        neutronAge,
        diffusionLengthSquared,
    } = params;

    try {
        // Расчет объема активной зоны
        const azVolume = roundToDecimal(
            calculateAZVolume(thermalPower, corePowerDensity),
            3,
        );

        // Расчет диаметра активной зоны
        const d = calculateAZDiameter(azVolume, coreHeight);

        // Расчет геометрического параметра
        const B = calculateGeometricParameter(d, coreHeight);

        // Расчет количества ТВС
        const Ntvs = calculateNumberOfTVS(d, latticePitch);

        // Расчет эффективного коэффициента размножения
        const keff = calculateKeffective(
            infiniteMultiplicationFactor,
            B,
            neutronAge,
            diffusionLengthSquared,
        );

        // Расчет реактивности
        const ro = calculateReactivity(keff);

        // Формирование и возврат объекта с результатами
        return {
            numFuelAssemblies: Ntvs,
            diameter: d,
            effectiveMultiplicationFactor: keff,
            reactorReactivity: ro,
            geometricParameter: B,
            volume: azVolume,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете физических параметров активной зоны: ${error}`,
        );
    }
};
