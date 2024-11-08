import { KNRTabs } from '@widgets/KNR/Tabs';
import { Page } from '@widgets/Page';

const KNRPage = () => {
    /**
     * Рассчитывает g-фактор Весткотта для поглощения U-235
     * @param T - температура нейтронного газа (°C)
     * @returns g-фактор с погрешностью не более ±1.5%
     * @throws Error если температура выше 2800°C
     */
    function calculateU235AbsorptionGFactor(T: number): number {
        if (T > 2800) {
            throw new Error('Температура выше допустимого предела 2800°C');
        }
        return 0.912 + 0.25 * Math.exp(-0.00475 * T);
    }

    /**
     * Рассчитывает g-фактор Весткотта для деления U-235
     * @param T - температура нейтронного газа (°C)
     * @returns g-фактор с погрешностью не более ±1.5%
     * @throws Error если температура выше 2800°C
     */
    function calculateU235FissionGFactor(T: number): number {
        if (T > 2800) {
            throw new Error('Температура выше допустимого предела 2800°C');
        }
        const ga5 = calculateU235AbsorptionGFactor(T);

        return ga5 - 0.004;
    }

    /**
     * Вычисляет функцию ga9 для плутония-239 при заданной температуре.
     *
     * @param {number} Tn - Температура в Кельвинах.
     * @returns {number} Значение функции ga9 при данной температуре.
     */
    function calculatePu9AbsorptionGFactor(Tn: number): number {
        const a = 0.9442;
        const b = -4.038e-4; // 4,038 × 10^-4
        const c = 2.6375e-6; // 2,6375 × 10^-6

        return a + b * Tn + c * Tn * Tn;
    }

    /**
     * Вычисляет функцию gf9 для плутония-239 при заданной температуре.
     *
     * @param {number} Tn - Температура в Кельвинах.
     * @returns {number} Значение функции gf9 при данной температуре.
     */
    function calculatePu9FissionGFactor(Tn: number): number {
        const a = 0.8948;
        const b = -1.43e-4; // 1,430 × 10^-4
        const c = 2.022e-6; // 2,022 × 10^-6

        return a + b * Tn + c * Tn * Tn;
    }

    console.log(
        'calculateU235AbsorptionGFactor',
        calculateU235AbsorptionGFactor(800),
    );
    console.log(
        'calculateU235FissionGFactor',
        calculateU235FissionGFactor(800),
    );
    console.log(
        'calculatePu9AbsorptionGFactor',
        calculatePu9AbsorptionGFactor(800),
    );
    console.log('calculatePu9FissionGFactor', calculatePu9FissionGFactor(800));
    return (
        <Page>
            <KNRTabs />
        </Page>
    );
};

export default KNRPage;
