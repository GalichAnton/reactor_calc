// calculationStore.ts
import { create } from 'zustand';

interface CalculationState {
    isCalculating: boolean;
    isCalculated: boolean;
    activeTab: string;

    startCalculation: (val: boolean) => void;
    setActiveTab: (tab: string) => void;
    setIsCalculated: (isCalculated: boolean) => void;
}

export const useCalculationStore = create<CalculationState>((set) => ({
    isCalculating: false,
    activeTab: '0',
    isCalculated: false,
    startCalculation: (val: boolean) => {
        set({
            isCalculating: val,
        });
    },

    setActiveTab: (tab: string) => {
        set({
            activeTab: tab,
        });
    },
    setIsCalculated: (val: boolean) => {
        set({
            isCalculated: val,
        });
    },
}));
