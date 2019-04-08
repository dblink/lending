import * as React from 'react';
interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    [index: string]: any;
}
interface State {
}
export declare class Icon extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
