import * as React from 'react';
import './css/loanAgreement.css';
interface Props {
    data?: {
        "RealName": string;
        "IDCardNo": string;
        "Mobile": string;
        "Email": string;
        "BankName": string;
        "BankCardNo": string;
        "Amount": string;
        "StartTime": string;
        "Rate": string;
        "Purpose": string;
        "RepayDate": string;
        "RepayWay": string;
        OutTradeNo: string;
    };
    success?: (data: any) => void;
}
interface State {
}
export declare class LoanAgreement extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
