import * as React from 'react';
interface Props {
    valid: boolean;
    style?: React.CSSProperties;
}
interface State {
}
export declare class BaseInfoTip extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
