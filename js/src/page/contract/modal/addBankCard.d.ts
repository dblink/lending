import * as React from 'react';
import { Parameter, ParameterName, Callback } from '../../../components/request/setting';
import { ContractModal } from './contract';
import { BankMessage } from '../../../components/bankCard/bankInput';
declare type AddBankCardState = {
    bankcard: string;
    error: any;
    data: Parameter<ParameterName.bindBankCard | ParameterName.changeBankCard>;
    type: 'shuangQian' | 'local';
    sendMessageId: string;
    code: string;
    userType: '1' | '2' | '3';
    isLoading: boolean;
};
declare type AddBankCardProps = {
    borrowerBaseInfoId: string;
    data?: ContractModal.dataState;
    pageChange: any;
};
export declare class AddEditorBankCard extends React.Component<AddBankCardProps, AddBankCardState> {
    constructor(props: AddBankCardProps);
    getBankInfo(): void;
    inputMobileChange: any;
    inputChange(e: React.ChangeEvent<any>): void;
    timer: any;
    BIN: any;
    form: HTMLFormElement;
    fail: (e: Callback<any>) => void;
    success: (e: any) => void;
    sendMessageSuccess: (e: any) => void;
    doubleMoney(): void;
    sendMessage(): void;
    collectPay(): void;
    confirm(): void;
    onWaring: (name: string, err: string) => void;
    onSuccess: (data: BankMessage) => void;
    render(): JSX.Element;
}
export {};
