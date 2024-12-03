import React, { PureComponent, CSSProperties } from 'react';
export interface Step {
    title: string;
    description?: string;
}
interface Props {
    steps: Step[];
    activeStepIndex: number;
    onChangeActiveStepIndex: (index: number) => void;
    showNextButton?: boolean;
    style?: CSSProperties;
    rowStyle?: CSSProperties;
    rowStyleActive?: CSSProperties;
    rowTitleStyle?: CSSProperties;
    rowTitleStyleActive?: CSSProperties;
    descriptionStyle?: CSSProperties;
    descriptionTextStyle?: CSSProperties;
    buttonTextStyle?: CSSProperties;
    buttonContainerStyle?: CSSProperties;
    buttonWrapperStyle?: CSSProperties;
    dividerStyle?: CSSProperties;
}
export default class WorkspacesList extends PureComponent<Props> {
    static defaultProps: {
        style: null;
        rowStyle: null;
        rowTitleStyle: null;
        descriptionStyle: null;
        activeRowStyle: null;
        onChangeActiveStepIndex: () => void;
    };
    getComputedStyle: () => React.CSSProperties;
    getComputedRowStyle: (isActive: boolean) => React.CSSProperties | undefined;
    getComputedRowTitleStyle: (isActive: boolean) => React.CSSProperties | undefined;
    getComputedDescriptionStyle: () => React.CSSProperties;
    getComputedDescriptionTextStyle: () => React.CSSProperties;
    getComputedButtonTextStyle: () => React.CSSProperties;
    getComputedButtonContainerStyle: () => React.CSSProperties;
    getComputedButtonWrapperStyle: () => React.CSSProperties;
    getComputedDividerStyle: () => React.CSSProperties;
    renderStep: (step: Step, index: number, list: Step[]) => JSX.Element;
    render(): JSX.Element;
}
export {};
