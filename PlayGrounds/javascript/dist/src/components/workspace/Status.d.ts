import { CSSProperties, ReactNode } from 'react';
interface Props {
    text: string;
    isError: boolean;
    style?: CSSProperties;
    textStyle?: CSSProperties;
    errorTextStyle?: CSSProperties;
    children?: ReactNode;
}
export default function Status({ text, isError, children, style, textStyle, errorTextStyle, }: Props): JSX.Element;
export {};
