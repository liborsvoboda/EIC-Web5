import { PureComponent, CSSProperties } from 'react';
interface Props {
    active: boolean;
    inverse: boolean;
    isError: boolean;
    onClick: () => void;
    onChange: (active: boolean) => void;
    containerStyle?: CSSProperties;
    textStyle?: CSSProperties;
}
interface State {
    hover: boolean;
}
export default class extends PureComponent<Props, State> {
    static defaultProps: {
        active: boolean;
        inverse: boolean;
        isError: boolean;
        onClick: () => void;
        onChange: () => void;
    };
    state: {
        hover: boolean;
    };
    render(): JSX.Element;
}
export {};
