import * as React from 'react';
import { ChangeEvent } from "react";
interface Props {
    postServiceMessage?: (money: any) => void;
    ContractNo: any;
    BorrowName: any;
    CompanyName: any;
    IDCardNo: any;
    Period: any;
    StartTime: any;
    match: {
        params: {
            idCard: any;
            name: any;
            serviceFee: any;
            period: any;
        };
    };
}
export default class ServiceAgreement extends React.Component<Props, any> {
    constructor(props: any);
    serviceMoney: any;
    termChange(e: any): void;
    delayChange(func?: any): (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputChange(e: ChangeEvent<HTMLInputElement>, func: any): void;
    render(): JSX.Element;
}
export {};
