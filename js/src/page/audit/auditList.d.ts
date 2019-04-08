import * as React from 'react';
import { ParameterName, RequestCallback, Parameter, PageInfo, ParameterSummary } from '../../components/request/setting';
import { FilterList } from '../../module/filter/filter';
interface Props {
    time?: {
        endTime: string;
        startTime: string;
    };
}
interface State {
    callBackData: RequestCallback<ParameterName.getAuditItems>[];
    data: Parameter<ParameterName.getAuditItems>;
    status: 'Approved' | 'Denied';
    pageInfo: PageInfo;
    isShowModal: boolean;
    id: string;
    isLoading: boolean;
    isPageLoading: boolean;
}
declare type FilterType = FilterList<ParameterSummary[ParameterName.getAuditItems]>;
export declare class AuditList extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    getList(): void;
    changePage(num: number): void;
    showModal(str: 'Approved' | 'Denied', id: string): void;
    closeModal(refresh?: boolean): void;
    filterList: FilterType;
    filterListFunction: () => FilterType;
    search(data: Parameter<ParameterName.getAuditItems>): void;
    render(): JSX.Element;
}
export {};
