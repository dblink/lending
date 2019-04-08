import * as React from 'react';
import { ParameterName, Parameter, PageInfo, RequestCallback, ParameterSummary } from '../../components/request/setting';
import { EmployeesModalOperate } from '../../components/modal/employeesModal';
import { FilterList } from '../../module/filter/filter';
interface Props {
}
interface State {
    data: Parameter<ParameterName.getUserAllInfo>;
    callbackData: RequestCallback<ParameterName.getUserAllInfo>[];
    pageInfo: PageInfo;
    isLoading: boolean;
    isPageLoading: boolean;
}
export declare class EmployeesList extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    getEmployeesList(): void;
    changePage(num: number): void;
    search(data: any): void;
    modalOperate: EmployeesModalOperate;
    render(): JSX.Element;
}
declare type EmployeesFilterState = {
    data: FilterList<ParameterSummary[ParameterName.getUserAllInfo]>;
};
declare type EmployeesFilterProps = {
    data: Parameter<ParameterName.getUserAllInfo>;
    getList: (data: EmployeesFilterProps['data']) => void;
};
export declare class EmployeesFilter extends React.Component<EmployeesFilterProps, EmployeesFilterState> {
    constructor(props: EmployeesFilterProps);
    render(): JSX.Element;
}
export {};
