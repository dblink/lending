import * as React from 'react';
import { Parameter, ParameterName, RequestCallback, PageInfo, ParameterSummary } from '../../components/request/setting';
import { RechargePage } from '../../components/modal/rechargeModal';
import { FilterList } from '../../module/filter/filter';
interface Props {
}
interface State {
    data: Parameter<ParameterName.selectRechargeLoanBalance>;
    callBackData: RequestCallback<ParameterName.selectRechargeLoanBalance>[];
    isPageLoading: boolean;
    money: {
        FrozenLoanBalance: string;
        LoanBalance: string;
    };
    isGetMoney: boolean;
    isLoading: boolean;
    pageInfo: PageInfo;
}
declare type FilterType = FilterList<ParameterSummary[ParameterName.selectRechargeLoanBalance]>;
export declare class RechargeList extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    controller: {
        showModal: (page: RechargePage, data?: any) => void;
        cancelModal?: any;
        [index: string]: any;
    };
    getList(): void;
    filterList: FilterType;
    filterListFunction: () => FilterType;
    search(data: Parameter<ParameterName.selectRechargeLoanBalance>): void;
    getLendingMoney(): void;
    changePage(num: any): void;
    render(): JSX.Element;
}
export {};
