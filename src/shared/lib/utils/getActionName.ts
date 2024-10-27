export const getActionName = (storeName: string, actionName: string) => {
    return `${storeName}.${actionName}`;
};
