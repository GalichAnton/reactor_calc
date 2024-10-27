import type { HTMLAttributeAnchorTarget } from 'react';

import { NavLink } from 'react-router-dom';

interface NavbarRouteProps {
    route?: string;
    text: string;
    target?: HTMLAttributeAnchorTarget;
}

export function NavbarRoute(props: NavbarRouteProps) {
    const { route, text, target } = props;

    if (!route) {
        return <>{text}</>;
    }

    return (
        <NavLink to={route} key={route} target={target}>
            {text}
        </NavLink>
    );
}
