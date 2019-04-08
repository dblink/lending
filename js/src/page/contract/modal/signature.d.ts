import * as React from 'react';
import { Parameter, ParameterName } from '../../../components/request/setting';
declare type SignatureProps = {
    contractId: string;
    name: string;
    cardNo: string;
    period: string;
    serviceMoney: string;
    cancel: (bool?: boolean) => void;
};
declare type SignatureState = {
    data: Parameter<ParameterName.signature>;
    isPageLoading: boolean;
};
export declare class Signature extends React.Component<SignatureProps, SignatureState> {
    constructor(props: SignatureProps);
    form: HTMLFormElement;
    componentDidMount(): void;
    getInfo(): void;
    num: number;
    confirm(): void;
    render(): JSX.Element;
}
export {};
