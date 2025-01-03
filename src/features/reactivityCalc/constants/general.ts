export const KH = 2.681e-5;
export const K_U = -0.00001;
export const K_H2O = -1.82e-4;
export const lambda = 0.078;
export const betta = 0.0064;

export const Lambda = 3e-5;

export const lambdaSix = [0.0124, 0.0305, 0.1114, 0.3013, 1.136, 3.013];
export const bettaSix = [2.1e-4, 1.4e-3, 1.26e-3, 2.53e-3, 7.4e-4, 2.7e-4];

/** Плотность урана в кг/м³ */
export const URANIUM_DENSITY = 1e4;

/** Коэффициент теплопроводности урана, Вт/(м·К) */
export const LAMBDA_U = 3;

/** Коэффициент теплопроводности гелиевого зазора, Вт/(м·К) */
export const LAMBDA_ZAZ = 0.25;

/** Коэффициент теплопроводности циркониевой оболочки, Вт/(м·К) */
export const LAMBDA_OB = 20;

/** Толщина гелиевого зазора в метрах */
export const DELTA_ZAZ = 1e-4;

/** Толщина циркониевой оболочки в метрах */
export const DELTA_OB = 6 * 1e-4;

/**
 * Коэффициент теплоотдачи от оболочки твэла к теплоносителю, Вт/(м²·К)
 * Определяет интенсивность теплообмена между поверхностью оболочки и теплоносителем
 */
export const ALPHA_COEF = 3e4;

/**
 * Удельная теплоёмкость урана, Дж/(кг·К)
 * Характеризует количество теплоты, необходимое для изменения температуры 1 кг урана на 1 К
 */
export const URANIUM_HEAT_CAPACITY = 300;

/**
 * Удельная теплоёмкость теплоностителя
 */
export const PV_HEAT_CAPACITY = 5.6e3;

export const G = 1.9e4;

export const m = 1e4;
