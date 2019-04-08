import * as React from 'react';
import { ParameterName, Parameter, PageInfo, RequestCallback, ParameterSummary } from '../../components/request/setting';
import { FilterList } from '../../module/filter/filter';
interface Props {
}
interface State {
    data: Parameter<ParameterName.selectLoanRecord>;
    pageInfo?: PageInfo;
    callbackData: RequestCallback<ParameterName.selectLoanRecord>[];
    isPageLoading: boolean;
    isLoading: boolean;
    fee: {
        "TotalLoanMoney"?: string;
        "TotalOtherCharge"?: string;
        "TotalQueryCharge"?: string;
    };
}
export declare class LendingList extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    getLendingList(): void;
    changePage(num: number): void;
    search(data: Parameter<ParameterName.selectLoanRecord>): void;
    render(): JSX.Element;
}
declare type LendingFilterState = {
    data: FilterList<ParameterSummary[ParameterName.selectLoanRecord]>;
};
declare type LendingFilterProps = {
    data: Parameter<ParameterName.selectLoanRecord>;
    search: (data: Parameter<ParameterName.selectLoanRecord>) => void;
};
export declare class LendingFilter extends React.Component<LendingFilterProps, LendingFilterState> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
