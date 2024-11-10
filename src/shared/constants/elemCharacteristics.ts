export interface ElementCharacteristic {
    /**
     * Плотность, г/см3
     */
    density: number;

    /**
     * Атомная масса, а.е.м.
     */
    atomicMass: number;

    /**
     *  Сечение поглощения нейтронов, σf (0,025 эВ)
     */
    crossSectionF: number; //

    /**
     * Сечение захвата нейтронов, σa (0,025 эВ)
     */
    crossSectionA: number; //

    /**
     *  Сечение рассеяния нейтронов, σs на 1 эВ
     */
    crossSectionS: number;

    /**
     * ξ * σs на 1 эВ
     */
    xiCrossSectionS: number;

    /**
     * Сечение транспортное нейтронов, σtr на 1 эВ
     */
    crossSectionTr: number;
}

export const elemCharacteristics: Record<string, ElementCharacteristic> = {
    O: {
        density: 0.00143,
        atomicMass: 16,
        crossSectionF: 0,
        crossSectionA: 0.0002e-24,
        crossSectionS: 3.8e-24,
        xiCrossSectionS: 0.46e-24,
        crossSectionTr: 3.6e-24,
    },
    H2O: {
        density: 0.997,
        atomicMass: 18,
        crossSectionF: 0,
        crossSectionA: 0.661e-24,
        crossSectionS: 46e-24,
        xiCrossSectionS: 42.5e-24,
        crossSectionTr: 9.5e-24,
    },
    C: {
        density: 1.6,
        atomicMass: 12,
        crossSectionF: 0,
        crossSectionA: 0.0037e-24,
        crossSectionS: 4.8e-24,
        xiCrossSectionS: 0.75e-24,
        crossSectionTr: 3.7e-24,
    },
    Zr: {
        density: 6.44,
        atomicMass: 91,
        crossSectionF: 0,
        crossSectionA: 0.191e-24,
        crossSectionS: 6.2e-24,
        xiCrossSectionS: 0.14e-24,
        crossSectionTr: 6.1e-24,
    },
    Steel: {
        density: 7.9,
        atomicMass: NaN,
        crossSectionF: 0,
        crossSectionA: 2.8e-24,
        crossSectionS: 10.1e-24,
        xiCrossSectionS: 0.37e-24,
        crossSectionTr: 10.3e-24,
    },
    U235: {
        density: 18.7,
        atomicMass: 235,
        crossSectionF: 584e-24,
        crossSectionA: 694e-24,
        crossSectionS: 10e-24,
        xiCrossSectionS: 0.09e-24,
        crossSectionTr: 7.8e-24,
    },
    U238: {
        density: 18.94,
        atomicMass: 238,
        crossSectionF: 0,
        crossSectionA: 2.71e-24,
        crossSectionS: 8.3e-24,
        xiCrossSectionS: 0.07e-24,
        crossSectionTr: 7.7e-24,
    },
    Pu239: {
        density: 19.79,
        atomicMass: 239,
        crossSectionF: 742e-24,
        crossSectionA: 1028e-24,
        crossSectionS: 9e-24,
        xiCrossSectionS: 0.08e-24,
        crossSectionTr: 10e-24,
    },
} as const;
