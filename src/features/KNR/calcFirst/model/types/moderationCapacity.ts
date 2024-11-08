import { Params, Param } from '@shared/types/param.ts';

/**
 * Интерфейс для параметров замедляющей способности
 */
export interface ModerationCapacity extends Params {
    /**
     * Замедляющая способность U235 в см^(-1)
     * ξΣ_s5 = ξσ_s5 * N_5
     * @type {Param}
     */
    moderationCapacityU235: Param;

    /**
     * Замедляющая способность U238 в см^(-1)
     * ξΣ_s8 = ξσ_s8 * N_8
     * @type {Param}
     */
    moderationCapacityU238: Param;

    /**
     * Замедляющая способность кислорода O2 в см^(-1)
     * ξΣ_sO2 = ξσ_sO2 * N_O2
     * @type {Param}
     */
    moderationCapacityO2: Param;

    /**
     * Замедляющая способность воды H2O в см^(-1)
     * ξΣ_sH2O = ξσ_sH2O * N_H2O
     * @type {Param}
     */
    moderationCapacityH2O: Param;

    /**
     * Замедляющая способность циркония Zr в см^(-1)
     * ξΣ_sZr = ξσ_sZr * N_Zr
     * @type {Param}
     */
    moderationCapacityZr: Param;

    /**
     * Суммарная замедляющая способность в см^(-1)
     * Сумма всех замедляющих способностей
     * @type {Param}
     */
    totalModerationCapacity: Param;
}
