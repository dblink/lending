import * as React from 'react';
import { Parameter, ParameterName, ParameterSummary } from '../../../components/request/setting';
declare type CertificationProps = {
    onChangeStep: (str: string, type: string) => void;
    onChangeDataState: (str: string, status: boolean) => void;
    IDCard: string;
    name: string;
};
declare type CertificationState = {
    isLoading: boolean;
    data: Parameter<ParameterName.uploadBorrowerImage>;
    error: string;
};
export declare function getBlobFile(_canvas: HTMLCanvasElement): Blob;
export declare class Certification extends React.Component<CertificationProps, CertificationState> {
    constructor(props: CertificationProps);
    getData(name: ParameterSummary[ParameterName.uploadBorrowerImage], value: any): void;
    confirm(): void;
    render(): JSX.Element;
}
export {};
