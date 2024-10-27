import React, { useMemo } from 'react';

import Icon from '@ant-design/icons';

export const MoonFilled = React.memo(function MoonFilled() {
    const renderComponent = useMemo(
        () =>
            function RenderComponent() {
                return (
                    <svg
                        xmlns={'http://www.w3.org/2000/svg'}
                        height={'20'}
                        viewBox={'0 96 960 960'}
                        width={'20'}
                        stroke={'black'}
                        strokeWidth='40'
                        fill={'none'}
                    >
                        <path
                            d={
                                'M481.154 915.999q-141.666 0-240.832-99.167Q141.155 717.666 141.155 576q0-135.768 92.115-232.883 92.114-97.115 225.575-105.192 5.64 0 11.717.41 6.076.41 14.743.974-28.307 30.103-44.23 70.846-15.923 40.743-15.923 85.845 0 98.334 68.834 167.168 68.834 68.833 167.168 68.833 45.051 0 85.819-15.179 40.769-15.179 70.487-41.998-.564 7.589-.974 12.922-.411 5.333-.411 10.563-7.693 133.461-104.808 225.575-97.115 92.115-232.883 92.115Z'
                            }
                        />
                    </svg>
                );
            },
        []
    );
    return <Icon component={renderComponent} />;
});
