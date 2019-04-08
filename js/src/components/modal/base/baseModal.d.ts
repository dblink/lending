import * as React from 'react';
import './baseModal.css';
interface Props {
    children: any;
    isOpen: boolean;
    style?: React.CSSProperties;
}
interface State {
}
export declare class BaseModal extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element | "";
}
export {};
