import * as React from 'react';
import './vertical.scss';
interface Props {
    iconName?: string;
    text: string;
    isMust?: boolean;
    style?: React.CSSProperties;
    className?: string;
    onClick?: any;
}
interface State {
}
export declare class Vertical extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
