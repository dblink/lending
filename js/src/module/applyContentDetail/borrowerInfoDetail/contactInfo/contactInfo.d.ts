import * as React from 'react';
declare type ContactInfoState = {
    type: string;
    data: any[];
    editData: any;
    sub: any;
};
declare type ContactInfoProps = {
    name: string;
    watcher: {
        run?: any;
        setData?: any;
    };
    data: any;
};
export declare class ContactInfo extends React.Component<ContactInfoProps, ContactInfoState> {
    constructor(props: ContactInfoProps);
    changeType(type: string): void;
    edit(data: any, key: any): void;
    del(key: any): void;
    changeData(data: any): void;
    list: {
        text: string;
        value: string;
    }[];
    setting: any;
    getDom(): JSX.Element;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
