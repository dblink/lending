import * as React from 'react';
interface Props {
    onChangeStep: any;
    dataState: any;
    name: string;
}
interface State {
}
export declare class ApplyContent extends React.Component<Props, State> {
    constructor(props: Props);
    arr: {
        text: string;
        iconName: string;
        name: string;
        isMust?: boolean;
    }[];
    stateDom(name: any): JSX.Element;
    render(): JSX.Element;
}
export {};
