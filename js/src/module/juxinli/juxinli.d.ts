import * as React from 'react';
interface Props {
    applyId: string;
    borrowerId: string;
    idCardNo: string;
    changePage: any;
    changeState: any;
    type: any;
    state: any;
}
interface State {
    data: {
        id_card_num?: string;
        phone?: string;
        name?: string;
        home_address?: string;
        contacts?: string;
    };
    url: string;
    isLoading: boolean;
    pageLoading: boolean;
    error: any;
}
export declare class Juxinli extends React.Component<Props, State> {
    constructor(props: Props);
    list: {
        0: string;
        1: string;
        2: string;
        3: string;
    };
    componentDidMount(): void;
    getInfo(): void;
    getJxl(): void;
    num: number;
    confirm(type?: 'once'): void;
    render(): JSX.Element;
}
export {};
