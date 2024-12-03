import React, { CSSProperties } from 'react';
import type { PublicOptions } from '../../utils/options';
declare global {
    const VERSION: string;
}
interface OwnProps {
    style?: CSSProperties;
    className?: string;
    baseURL?: string;
}
export declare type PlaygroundProps = OwnProps & PublicOptions;
declare const _default: React.NamedExoticComponent<PlaygroundProps>;
/**
 * A React component wrapper for the embeddable iframe player. This ensures
 * properties are passed and encoded correctly.
 *
 * Most props are passed directly through to the player; props passed into the
 * player can't be changed after the initial render. Other props can be updated
 * normally.
 */
export default _default;
