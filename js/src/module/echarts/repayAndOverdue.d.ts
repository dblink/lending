import * as React from 'react';
import { Parameter, ParameterName } from '../../components/request/setting';
interface Props {
    id: string;
    state: 'overdueCount' | 'overdueMoney';
}
interface State {
    data: Parameter<ParameterName.getOverdueCount>;
    id: string;
    overdue: any[];
    xAxis: any[];
}
export declare class RepayAndOverdue extends React.Component<Props, State> {
    constructor(props: Props);
    drawChart(): void;
    getOverdueData(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
