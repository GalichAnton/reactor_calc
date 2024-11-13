/**
 * Микроскопическое сечение деления для изотопа Pu-239, в барнах.
 */
export const MICRO_SIGMA_F_PU9 = 742e-24;

/**
 * Микроскопическое сечение поглощения для изотопа Pu-239, в барнах.
 */
export const MICRO_SIGMA_A_PU9 = 1028e-24;

/**
 * g-фактор Весткотта для деления Pu-239.
 */
export const VESKOT_GF_PU9 = 2.0514;

/**
 * g-фактор Весткотта для поглощения Pu-239.
 */
export const VESKOT_GA_PU9 = 2.3419;

/**
 * Среднее количество нейтронов на акт деления для изотопа Pu-239.
 */
export const AVERAGE_N_PER_F_PU9 = 2.87;

/**
 * Среднее количество нейтронов на акт деления для изотопа Pu-239.
 */
export const AVERAGE_N_PER_F_PU235 = 2.416;

/**
 * Выход ксенона-135 на акт деления.
 */
export const YIELD_PER_FISSION_XE = 0.059;

/**
 * Выход самария-149 на акт деления.
 */
export const YIELD_PER_FISSION_SM = 0.014;

/**
 * Константа распада ксенона-135, в секундах^{-1}.
 */
export const DECAY_CONSTANT_XE = 2.09e-5;

/**
 * Микроскопическое сечение поглощения для изотопа Xe-135, в барнах.
 */
export const MICRO_SIGMA_A_XE135 = 2.65e6;

/**
 * Z - для построения зависимостей.
 */
export const START_Z = Array.from({ length: 201 }, (_, i) => i * 0.005);

/**
 * Число Авогадро, в яд/моль.
 */
export const N_A = 6.02e23;

/**
 * Плотность кислорода, в г/см^3.
 */
export const DENSITY_O2 = 0.001429;

/**
 * Плотность циркония, в г/см^3.
 */
export const DENSITY_ZR = 5.94;

/**
 * Плотность оксида урана, в г/см^3.
 */
export const DENSITY_UO2 = 9.3;

/**
 * Молярная масса диоксида урана, в г/моль.
 */
export const MOLAR_MASS_UO2 = 270;

/**
 * Молярная масса воды, в г/моль.
 */
export const MOLAR_MASS_H2O = 18;

/**
 * Молярная масса циркония, в г/моль.
 */
export const MOLAR_MASS_ZR = 91;

/**
 * Молярная масса кислорода, в г/моль.
 */
export const MOLAR_MASS_O2 = 16;

/**
 * Масса одного ядра UO2.
 */
export const NUCLEUS_MASS_UO2 = 0.0479e24;

/**
 * Возраст тепловых нейтронов в воде, см²
 */
export const WATER_NEUTRON_AGE = 27.3;
