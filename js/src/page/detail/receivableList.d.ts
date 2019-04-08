import * as React from 'react';
import { RequestCallback, ParameterName, Parameter, PageInfo } from '../../components/request/setting';
interface Props {
}
declare type ListCallback = RequestCallback<ParameterName.selectRepayRecord>[];
declare type ReqParameter = Parameter<ParameterName.selectRepayRecord>;
interface State {
    callbackData: ListCallback;
    data: ReqParameter;
    pageInfo: PageInfo;
    isPageLoading: boolean;
    isLoading: boolean;
    detail: {
        TotalPrincipal?: string;
        TotalInterest?: string;
        TotalServiceMoney?: string;
    };
}
export declare class ReceivableList extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    getList(): void;
    inputChange(e: any): void;
    search(data: ReqParameter): void;
    render(): JSX.Element;
}
export {};
