import * as React from 'react';
interface Props {
}
interface State {
    type: 'apply' | 'applyList' | 'applyInfo';
    data: any;
    card: string;
    isLoading: boolean;
    detail: 'ISApply' | 'ISExsitBorrower' | 'HoneypotStatus' | 'Alipay' | 'HoneyBeeStatus' | 'ISUploadPersonCardState' | 'ISExsitBorrowerDetail' | '';
}
declare type StateAttr = 'type' | 'data' | 'card' | 'detail';
export declare class MobileApplication extends React.Component<Props, State> {
    constructor(props: Props);
    changeState(name: StateAttr, value: any): void;
    detailPage: State['detail'][];
    changePage(value: any): void;
    setData(name: any, value: any): void;
    confirm(): void;
    getPage(): JSX.Element;
    render(): JSX.Element;
}
export {};
