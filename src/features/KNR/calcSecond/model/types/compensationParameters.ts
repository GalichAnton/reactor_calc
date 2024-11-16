import { Param, Params } from '@shared/types/param';

/**
 * Интерфейс для расчетных параметров реактора
 */
export interface CompensationParameters extends Params {
    /** Запас реактивности для обеспечения кампании с учётом погрешности */
    totalReactivity: Param;

    /** Коэффициент черноты стержня */
    rodBlackness: Param;

    /** Компенсирующая способность центрального стержня */
    centralRodCompensation: Param;

    /** Число регулирующих стержней  */
    nControlRoads: Param;

    /** Количество ОР СУЗ   */
    nSUZ: Param;
}
