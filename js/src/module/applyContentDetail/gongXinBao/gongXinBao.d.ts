import * as React from 'react';
interface Props {
    applyId: string;
    idCardNo: string;
    changePage: any;
    changeState: any;
    type: any;
    state: any;
}
interface State {
    gxb: string;
    pageLoading: boolean;
    isLoading: boolean;
    error: any;
}
export declare class Gongxinbao extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    getGXBToken(): void;
    number: number;
    confirm(): void;
    render(): JSX.Element;
}
export {};
