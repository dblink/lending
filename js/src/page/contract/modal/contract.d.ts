import * as React from 'react';
interface Props {
    contractModal: ContractModal.ObjectShowModal;
    getList: (isRefresh?: boolean) => any;
}
export declare namespace ContractModal {
    type pageState = '' | 'add' | 'list' | 'sign' | 'lending' | 'remark' | 'onlineSettle' | 'localSettle' | 'cancel' | 'repayment' | 'edit';
    type dataState = {
        name?: string;
        cardNo?: string;
        contractId?: string;
        borrowId?: string;
        remark?: string;
        Mobile?: string;
        Id?: string;
        period?: string;
        serviceMoney?: string;
    };
    type ObjectShowModal = {
        showModal: (page: ContractModal.pageState, data: ContractModal.dataState) => void;
    };
}
interface State {
    page: ContractModal.pageState;
    data: ContractModal.dataState;
    isOpen: boolean;
}
export declare class ModalContract extends React.Component<Props, State> {
    constructor(props: Props);
    showModal(page: ContractModal.pageState, data?: ContractModal.dataState): void;
    closeModal(isRefresh?: boolean): void;
    getDom(): JSX.Element;
    render(): JSX.Element;
}
export {};
