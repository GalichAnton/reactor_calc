import type { ReactNode } from 'react';

import type { DefaultOptionType } from 'antd/es/select';
import type { SelectProps as AntSelectProps } from 'antd/lib/select';

export interface SelectExtendedProps extends AntSelectProps {
    setClosable?: (val: string) => boolean;
    tag?: (val: ReactNode) => ReactNode;
    tagRenderOption?: 'value' | 'label';
    onTagClick?: (val?: any) => void;
}

export type OptionGroup = { label: string; options: DefaultOptionType[] };
