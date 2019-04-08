import * as React from 'react';
declare type CompanyInfoState = {
    data: {
        CompanyName?: string;
        CompanyAddress?: string;
        Department?: string;
        Position?: string;
        Salary?: string;
    };
};
declare type CompanyInfoProps = {
    data: string;
    watcher: {
        run?: any;
        setData?: any;
    };
    name: string;
};
export declare class CompanyInfo extends React.Component<CompanyInfoProps, CompanyInfoState> {
    constructor(props: CompanyInfoProps);
    inputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
