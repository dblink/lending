import * as React from 'react';
import './report.css';
declare type ReportProps = {
    location: {
        state: {
            ApplyId: any;
            CardNo: any;
        };
    };
};
declare type ReportState = {
    name: string;
    idCard: string;
    [index: string]: any;
};
export declare class Report extends React.Component<ReportProps, ReportState> {
    constructor(props: ReportProps);
    componentDidMount(): void;
    showBasicReport(): void;
    showPhoneReport(): void;
    showAlipayReport(): void;
    showWechatReport(): void;
    showJXLReport(): void;
    showMiGuanReport(): void;
    showIdCardReport(): void;
    render(): JSX.Element;
}
export declare class ReportPage extends React.Component {
    render(): JSX.Element;
}
export {};
