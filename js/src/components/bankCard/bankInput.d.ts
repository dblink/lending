import * as React from 'react';
export declare type BankMessage = {
    BankCardNo: string;
    BankCode: string;
    BankName: string;
};
interface Props extends React.InputHTMLAttributes<any> {
    isLoading: boolean;
    onSuccess: (data: BankMessage) => void;
    onWaring: (error: string) => void;
    error: string;
}
interface State {
    bankcard: '';
    info: any;
}
export declare class BankInput extends React.Component<Props, State> {
    constructor(props: Props);
    inputChange(): (e: React.ChangeEvent<any>) => void;
    getBankInfo(): void;
    BIN: any;
    render(): JSX.Element;
}
export {};
