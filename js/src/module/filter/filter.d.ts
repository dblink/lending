import * as React from 'react';
import { ParameterName, ParameterSummary } from '../../components/request/setting';
export declare type FilterList<i> = {
    name: i;
    value: any;
    text: any;
    type: 'date' | 'input' | 'select';
    list?: {
        value: any;
        text: any;
    }[];
}[];
declare type FilterProps = {
    filterList: FilterList<ParameterSummary[ParameterName]>;
    filter: (data: any) => void;
};
declare type FilterState = {
    data: any;
    isCancel: boolean;
};
export declare class Filter extends React.Component<FilterProps, FilterState> {
    constructor(props: FilterProps);
    inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
    initData: any;
    filter: (type: 'cancel' | 'action') => void;
    filterClosure(): (type: "cancel" | "action") => void;
    render(): JSX.Element;
}
export {};
