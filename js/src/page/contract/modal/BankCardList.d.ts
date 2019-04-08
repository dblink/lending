import * as React from 'react';
import { Parameter, ParameterName, RequestCallback } from "../../../components/request/setting";
import { ContractModal } from './contract';
declare type CardListProps = {
    pageChange: (str: ContractModal.pageState, data?: ContractModal.dataState) => void;
    borrowId: string;
    contractId: string;
    closeModal: () => void;
};
declare type CardListState = {
    data: Parameter<ParameterName.getBankCardInfo>;
    postCardData: Parameter<ParameterName.modifyContractCard>;
    list: RequestCallback<ParameterName.getBankCardInfo>[];
    isPageLoading: boolean;
    isLoading: boolean;
};
export declare class CardList extends React.Component<CardListProps, CardListState> {
    constructor(props: CardListProps);
    componentDidMount(): void;
    getBankInfoList(): void;
    choiceCard(value: any): void;
    confirm(): void;
    editorCard(value: any): void;
    render(): JSX.Element;
}
export {};
