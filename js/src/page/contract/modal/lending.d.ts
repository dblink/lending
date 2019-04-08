import * as React from 'react';
import { Parameter, ParameterName } from '../../../components/request/setting';
declare type LendingProps = {
    closeModal: any;
    contractId: any;
};
declare type LendingState = {
    data: Parameter<ParameterName.applyLoan>;
    isLoading: boolean;
};
export declare class Lending extends React.Component<LendingProps, LendingState> {
    constructor(props: LendingProps);
    confirm(): void;
    render(): JSX.Element;
}
export {};
