import type { ReactNode } from 'react';

import type { ButtonProps } from 'antd/lib/button';

export interface AppButtonProps extends ButtonProps {
    tooltip?: ReactNode;
}
