import * as React from 'react';
import { ParameterSummary, ParameterName, Parameter } from '../../../components/request/setting';
declare type ApplyInfoState = {
    data: Parameter<ParameterName.addLoanApplyRecord>;
    isLoading: boolean;
    pageLoading: boolean;
    error: string;
};
declare type ApplyInfoProps = {
    id: string;
    name: string;
    isExist: boolean;
    onChangeDataState: (str: string, status: boolean) => void;
    onChangeStep: (str: string, name?: string) => void;
};
export declare class ApplyInfo extends React.Component<ApplyInfoProps, ApplyInfoState> {
    constructor(props: any);
    componentDidMount(): void;
    getInfo(): void;
    inputChange(name: ParameterSummary[ParameterName.addLoanApplyRecord], value: any): void;
    confirm(): void;
    render(): JSX.Element;
}
export {};
