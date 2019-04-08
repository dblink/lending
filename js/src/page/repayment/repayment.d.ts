import * as React from 'react';
import { RequestCallback, ParameterName, Parameter, PageInfo } from '../../components/request/setting';
import { RepaymentModalFunc } from '../../components/modal/repayment';
interface Props {
    location?: any;
    state?: string;
    time?: {
        endTime: string;
        startTime: string;
    };
}
interface State {
    data: Parameter<ParameterName.selectRepayPlanDetail>;
    callbackData: RequestCallback<ParameterName.selectRepayPlanDetail>[];
    pageInfo: PageInfo;
    isPageLoading: boolean;
    isLoading: boolean;
}
export declare class Repayment extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    getList(): void;
    changePage(num: number): void;
    search(data: Parameter<ParameterName.selectRepayPlanDetail>): void;
    modal: RepaymentModalFunc;
    render(): JSX.Element;
}
export {};
