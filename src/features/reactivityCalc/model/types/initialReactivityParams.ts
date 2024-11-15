import { OPERATING_MODE } from '@features/reactivityCalc';

/**
 * Интерфейс, описывающий начальные параметры реактивности ядерного реактора
 * @interface InitialReactivityParams
 */
export interface InitialReactivityParams {
    /** Скорость движения СУЗ (в см) */
    velocity: number;

    /** Режим работы ОР СУЗ */
    mode: OPERATING_MODE;

    /** Начальное значение реактивности (в процентах) */
    startReactivity: number;

    /** Текущая высота активной зоны реактора (в метрах) */
    height: number;

    /** Текущая мощность реактора (в мегаваттах) */
    power: number;

    /** Интервал расчета (в секундах) */
    interval: number;

    /** Номинальная мощность реактора (в мегаваттах) */
    nominalPower: number;

    /** Полная высота реактора (в метрах) */
    reactorHeight: number;

    /** Тепловая мощность реактора (в мегаваттах) */
    thermalPower: number;

    /** Степень протекания процесса (в процентах) */
    process: number;

    /** Количество тепловыделяющих сборок (ТВС) в реакторе */
    nTvs: number;

    /** Количество тепловыделяющих элементов (ТВЭЛ) в одной ТВС */
    nTvel: number;

    /** Радиус топливной таблетки (в миллиметрах) */
    r_t: number;

    /** Объем урана в активной зоне реактора (в кубических метрах) */
    uraniumVolume: number;

    /** Средняя температура уранового топлива (в градусах Цельсия) */
    averageUraniumTemp: number;

    /** Температура теплоносителя (в градусах Цельсия) */
    coolantTemp: number;

    /** Удельное энерговыделение в активной зоне (в ваттах на кубический метр) */
    corePowerDensity: number;

    /** Коэффициент теплопередачи (в ваттах на квадратный метр на градус Цельсия) */
    thermalTransferCoeff: number;

    /** Постоянная времени */
    tauZero: number;

    /** Коэффициент a */
    aCoef: number;
}
