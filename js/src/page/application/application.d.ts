import * as React from 'react';
import { RequestCallback, ParameterName, Parameter, PageInfo, ParameterSummary } from '../../components/request/setting';
import { FilterList } from '../../module/filter/filter';
interface Props {
    location: any;
}
interface State {
    callbackData: RequestCallback<ParameterName.getApplyItems>[];
    data: Parameter<ParameterName.getApplyItems>;
    pageInfo?: PageInfo;
    isLoading: boolean;
    isPageLoading: boolean;
}
declare type FilterType = FilterList<ParameterSummary[ParameterName.getApplyItems]>;
export declare class Application extends React.Component<Props, State> {
    constructor(props: Props);
    searchList: FilterType;
    componentDidMount(): void;
    search(data: any): void;
    getList(): void;
    setShowModal(): void;
    changeModal: any;
    changePage(num: number): void;
    inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
    applyStatus: {
        '1': string;
        '2': string;
        '3': string;
    };
    searchListFunc: () => FilterType;
    render(): JSX.Element;
}
export {};
