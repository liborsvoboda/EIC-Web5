import { CSSProperties, ReactNode } from 'react';
interface Props {
    text: string;
    textStyle?: CSSProperties;
    headerStyle?: CSSProperties;
    children?: ReactNode;
}
export default function Header({ text, textStyle, headerStyle, children, }: Props): JSX.Element;
export {};
