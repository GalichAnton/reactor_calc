import { theme as antdTheme } from 'antd';

import type { ThemeConfig } from 'antd/lib/config-provider';

const { darkAlgorithm, defaultAlgorithm } = antdTheme;

export const commonConfig: Partial<ThemeConfig> = {
    token: {
        lineHeight: 1.4,

        fontSize: 13,
        fontSizeSM: 11.5,
        fontSizeLG: 16,

        borderRadius: 6,

        paddingLG: 16,
        paddingMD: 13,
        paddingSM: 10,
        paddingXS: 6,
        paddingXXS: 4,

        paddingContentHorizontal: 12,
        paddingContentVerticalSM: 10,
        controlPaddingHorizontalSM: 6,

        marginLG: 18,
        marginMD: 10,
        marginSM: 10,
        marginXS: 6,
        marginXXS: 2,

        controlHeight: 30,
        controlHeightLG: 33,
        controlHeightSM: 22,
    },
    components: {
        Menu: {
            itemHeight: 30,
            fontSize: 13,
        },
        Table: {
            colorBorderSecondary: 'rgba(194,188,188,0.5)',
        },
        Form: {
            marginLG: 8,
        },
    },
};

const siderColor = '#1d91f7';
export const lightConfig: Partial<ThemeConfig> = {
    algorithm: defaultAlgorithm,
    token: {
        colorFillQuaternary: '#fafafa',
    },
    components: {
        Menu: {
            itemBg: siderColor,
            itemColor: '#fff',
            colorBgElevated: siderColor,
        },
        Layout: {
            siderBg: siderColor,
        },
    },
};

export const darkConfig: Partial<ThemeConfig> = {
    algorithm: darkAlgorithm,
    token: {
        colorBgLayout: '#0e0e0e',
        colorSplit: '#C2BDBD7F',
    },
};
