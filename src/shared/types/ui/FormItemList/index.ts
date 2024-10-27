import type { ReactNode } from 'react';

import type { FormItem } from '@shared/types/formItem';
import type { FormInstance } from '@shared/types/ui';

export interface FormItemListProps {
    formItems: FormItem[];
    title?: string;
    renderItem?: (item: FormItem, idx: number) => ReactNode;
}

export interface FormListItemProps {
    index: number;
    remove: (index: number | number[]) => void;
    restField: { fieldKey?: number | undefined };
    name: number;
    state?: any;
    form?: FormInstance;
}
