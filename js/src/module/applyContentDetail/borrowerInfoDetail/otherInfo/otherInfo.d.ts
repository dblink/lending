import * as React from 'react';
declare type OtherInfoState = {
    type: 'edit' | 'add' | '';
    data: any[];
    sub: any;
    editData: any;
    maritalStatus: 1 | 2 | 3 | '';
};
declare type OtherInfoProps = {
    watcher: {
        run?: any;
        setData?: any;
    };
    name: string;
    data: any;
    maritalStatus: 1 | 2 | 3 | '';
};
export declare class OtherInfo extends React.Component<OtherInfoProps, OtherInfoState> {
    constructor(props: OtherInfoProps);
    changeType(str: OtherInfoState['type']): void;
    editData(data: any): void;
    changeData(sub: any): void;
    delData(sub: any): void;
    selectChange(e: React.ChangeEvent<HTMLSelectElement>): void;
    list: {
        text: string;
        value: string;
    }[];
    choicePage(): JSX.Element;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
