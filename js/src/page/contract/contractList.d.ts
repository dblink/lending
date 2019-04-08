import * as React from 'react';
import { ParameterName, Parameter, RequestCallback, Callback, PageInfo, ParameterSummary } from '../../components/request/setting';
import { ContractModal } from './modal/contract';
import { FilterList } from '../../module/filter/filter';
interface Props {
    Status: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    Time?: 'weekIn' | 'weekOut';
}
declare type ContractParameter = Parameter<ParameterName.getContractItems>;
interface State {
    data: ContractParameter;
    callbackData: RequestCallback<ParameterName.getContractItems>[];
    borrowId: string;
    contractId: string;
    page: '' | 'add' | 'list' | 'sign' | 'lending';
    modalOpen: boolean;
    isLoading: boolean;
    isPageLoading: boolean;
    pageInfo: PageInfo;
}
declare type FilterType = FilterList<ParameterSummary[ParameterName.getContractItems]>;
export declare class ContractList extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    getListFail: (e: Callback<any>) => void;
    getListSuccess: (e: Callback<any>) => void;
    getList(): void;
    changePage(num: number): void;
    selectList: FilterType;
    selectListFunction: () => FilterType;
    search(data: Parameter<ParameterName.getContractItems>): void;
    modalOperate: ContractModal.ObjectShowModal;
    render(): JSX.Element;
}
export {};
