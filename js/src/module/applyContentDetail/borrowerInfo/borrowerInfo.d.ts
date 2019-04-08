import * as React from 'react';
import { ParameterName, Parameter } from '../../../components/request/setting';
declare type BorrowerInfoProps = {
    card: string;
    userId: string;
    name: string;
    isExit: boolean;
    onChangeStep: (str: string, type: string) => void;
    onChangeDataState: (str: string, status: boolean) => void;
};
declare type BorrowerInfoState = {
    data: Parameter<ParameterName.updateBorrowPersonInfo>;
    isLoading: boolean;
    error: string;
    pageLoading: boolean;
};
export declare class BorrowerInfo extends React.Component<BorrowerInfoProps, BorrowerInfoState> {
    constructor(props: any);
    componentDidMount(): void;
    getInfo(): void;
    inputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    getBirthAndSexByCardId(card: string): {
        birth: string;
        sex: boolean;
    };
    confirm(): void;
    render(): JSX.Element;
}
export {};
