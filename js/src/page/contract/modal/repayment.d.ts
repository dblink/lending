import * as React from 'react';
import { Parameter, ParameterName, CallbackSummary, RequestCallback } from '../../../components/request/setting';
declare type RepaymentState = {
    data: Parameter<ParameterName.selectContractPlan>;
    callBackData: any;
    isLoading: boolean;
};
declare type RepaymentProps = {
    contractId: string;
    cancel: () => void;
};
export declare class Repayment extends React.Component<RepaymentProps, RepaymentState> {
    constructor(props: RepaymentProps);
    componentDidMount(): void;
    setting: {
        head: string;
        attr: CallbackSummary[ParameterName.selectContractPlan];
        format?: (data: RequestCallback<ParameterName.selectContractPlan>, attr: CallbackSummary[ParameterName.selectContractPlan]) => void;
    }[];
    getInfoRequest: any;
    getInfo(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
