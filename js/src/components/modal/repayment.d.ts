import * as React from 'react';
import { Parameter, ParameterName } from '../request/setting';
export declare type RepaymentModalPage = 'online' | 'local' | 'IsFormRepayAll' | '';
export declare type RepaymentModalFunc = {
    show: (page: RepaymentModalPage, data: {
        RepayPlanDetailId: '';
    }) => any;
    cancel: (isRefresh?: boolean) => any;
};
interface Props {
    getList: () => void;
    modal: RepaymentModalFunc;
}
interface State {
    show: boolean;
    page: RepaymentModalPage;
    data: Parameter<ParameterName.applyRepayOnline>;
}
export declare class RepaymentModal extends React.Component<Props, State> {
    constructor(props: Props);
    showModal(page: RepaymentModalPage, data: Parameter<ParameterName.applyRepayOnline>): void;
    cancelModal(isRefresh: boolean): void;
    getDom(): JSX.Element;
    render(): JSX.Element;
}
export {};
