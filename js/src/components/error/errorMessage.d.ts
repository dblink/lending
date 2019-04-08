import * as React from 'react';
import './css/errorMessage.css';
interface Props {
    children: string;
}
interface State {
}
export declare class ErrorMessage extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
