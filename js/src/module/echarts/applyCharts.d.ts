import * as React from 'react';
import { ParameterName, Parameter } from '../../components/request/setting';
interface Props {
}
interface State {
    id: string;
    data: Parameter<ParameterName.getHomePageApplyCount>;
    xAxis: any[];
    series: {
        reviewData: any[];
        applyData: any[];
    };
    show: boolean;
}
export declare class ApplyCharts extends React.Component<Props, State> {
    constructor(props: Props);
    drawChart(): void;
    getApplyCharts(): void;
    componentDidMount(): void;
    onChangeDate(date: any): void;
    render(): JSX.Element;
}
export {};
