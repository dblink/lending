import * as React from 'react';
import { Parameter, ParameterName } from '../request/setting';
interface Props {
    controller: {
        showModal: any;
        cancelModal?: any;
    };
    getList: any;
}
export declare type RechargePage = 'apply' | 'upload';
interface State {
    isOpen: boolean;
    page: RechargePage;
    data: any;
}
export declare class RechargeModal extends React.Component<Props, State> {
    constructor(props: Props);
    showModal(page: RechargePage, data?: any): void;
    cancelModal(bool?: boolean): void;
    getDom(): JSX.Element;
    render(): JSX.Element;
}
declare type RechargeApplyProps = {
    cancelModal: (bool?: boolean) => void;
    type?: 'transform';
};
declare type RechargeApplyState = {
    data: Parameter<ParameterName.applyRechargeLoanBalance>;
    isLoading: boolean;
};
export declare class RechargeApply extends React.Component<RechargeApplyProps, RechargeApplyState> {
    constructor(props: any);
    inputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    confirm(): void;
    render(): JSX.Element;
}
export {};
