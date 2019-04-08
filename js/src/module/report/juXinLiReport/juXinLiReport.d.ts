import * as React from 'react';
import './css/juXinLiReport.css';
export declare class ReportMainPage extends React.Component<any, any> {
    constructor(props: any);
    componentDidMount(): void;
    user_info_check_config: ({
        attr: string;
        text: string;
    } | {
        attr: string;
        text: string;
        format(data: any): any;
    })[];
    check_black_info_config: ({
        attr: string;
        text: string;
        format(data: any): any;
    } | {
        attr: string;
        text: string;
    })[];
    behavior_check_config: {
        attr: string;
        text: string;
    }[];
    cell_behavior_config: ({
        attr: string;
        text: string;
    } | {
        attr: string;
        text: string;
        format(value: any): any;
    })[];
    contact_region_config: ({
        attr: string;
        text: string;
    } | {
        attr: string;
        text: string;
        format(data: any): any;
    })[];
    contact_list_config: ({
        attr: string;
        text: string;
    } | {
        attr: string;
        text: string;
        format(data: any): JSX.Element | "未知";
    })[];
    contact_details_config: ({
        attr: string;
        text: string;
    } | {
        attr: string;
        text: string;
        format(data: any): JSX.Element;
    })[];
    deliver_address_config: ({
        attr: string;
        text: string;
        format(data: any): JSX.Element;
    } | {
        attr: string;
        text: string;
    })[];
    contact_list_place_config: ({
        attr: string;
        text: string;
    } | {
        attr: string;
        text: string;
        format(data: any): any;
    })[];
    ebusiness_expense_config: ({
        attr: string;
        text: string;
    } | {
        attr: string;
        text: string;
        format(data: any): any;
    })[];
    trip_info_config: {
        attr: string;
        text: string;
    }[];
    render(): JSX.Element;
}
