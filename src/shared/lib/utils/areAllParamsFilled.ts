export const areAllParamsFilled = (params: any): boolean => {
    return Object.values(params).every((value) => value !== 0);
};
