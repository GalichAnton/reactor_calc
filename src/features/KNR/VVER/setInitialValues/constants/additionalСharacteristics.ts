/**
 * Микроскопическое сечение деления для изотопа Pu-239, в барнах.
 */
export const MICRO_SIGMA_F_PU9 = 742;

/**
 * Микроскопическое сечение поглощения для изотопа Pu-239, в барнах.
 */
export const MICRO_SIGMA_A_PU9 = 1028;

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
export const START_Z = Array.from({ length: 201 }, (_, i) => i * 0.01);
