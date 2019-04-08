import * as React from 'react';
export declare namespace Table {
    type settingProps<T = string, d = any> = {
        head: string;
        attr: T;
        format?: (data: d, ...props: any) => any;
    }[];
    type TableProps = {
        list: {
            [index: string]: any;
        }[];
        setting: settingProps;
        title?: string;
        className?: string;
    };
    class CommonTable extends React.Component<TableProps, any> {
        constructor(props: any);
        render(): JSX.Element;
    }
}
export declare type TablePropsFunc = {
    icon: string;
    tip: string;
    operate: {
        onClick: (value: any) => void;
    };
};
export declare type TablePropsList = {
    [index: string]: any;
};
export declare type TablePropsSetting = {
    attr: any;
    text: any;
    format?: any;
    bg?: any;
    flex?: any;
};
interface TableProps {
    list: TablePropsList[] | TablePropsList;
    title?: string;
    titleLil?: string;
    setting: TablePropsSetting[];
    style?: React.CSSProperties;
    className?: string;
    func?: TablePropsFunc[];
}
export declare class SeemTable extends React.Component<TableProps, any> {
    constructor(props: any);
    render(): (string | JSX.Element)[];
}
export declare class AbeamTable extends React.Component<TableProps, any> {
    constructor(props: any);
    render(): (string | JSX.Element)[];
}
export {};
