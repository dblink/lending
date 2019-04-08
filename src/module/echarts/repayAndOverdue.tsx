import * as React from 'react';
import { chartSetting, ChartSettingHome } from './chartSetting';
import { Parameter, ParameterName } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { ReqOption, req } from '../../components/request';
import { logOut } from '../../components/fail/logOut';
import { PageLoading } from '../../components/progress/progress';

interface Props {
    id: string;
    state: 'overdueCount' | 'overdueMoney'
}

interface State {
    data: Parameter<ParameterName.getOverdueCount>;
    id: string;
    overdue: any[];
    xAxis: any[];
}

export class RepayAndOverdue extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token')
            },
            id: props.id,
            overdue: [],
            xAxis: [],
        };
        this.getOverdueData = this.getOverdueData.bind(this);
    }
    drawChart(){
        let _req:any = require;
        _req.ensure([], ()=>{
            let charts = require('./echarts');
            let applyCharts =  charts.chart.init(document.getElementById(this.state.id));
            let option: ChartSettingHome = {
                title: this.props.state === 'overdueCount' 
                    ? '七日内逾期（单）' : '七日内逾期金额(元)',
                config: [{
                    name: '逾期数',
                    type: "bar",
                    data: this.state.overdue,
                    barWidth: '20px'
                }],
                axis: this.state.xAxis,
                color: ['#72BEFF']
            }
            applyCharts.setOption(chartSetting.home(option));
        }, ()=>{}, 'echarts');
    }
    getOverdueData(){
        let _req: ReqOption<ParameterName.getOverdueCount>;
            _req = {
                data: this.state.data,
                succeed: (e)=>{
                    let _data: any[] = [],
                        _value: any[] = [];
                    e.Value.map((val: any)=>{
                        _data.push(val.Key);
                        _value.push(val.Value);
                    });
                    this.setState({
                        xAxis: _data,
                        overdue: _value
                    }, this.drawChart);
                },
                fail: logOut((e)=>{
                    alert(e.ErrMsg);
                })
            };
        if(this.props.state === 'overdueCount'){
            req(ParameterName.getOverdueCount, _req);
        }else{
            req(ParameterName.getOverdueAmount, _req);
        }
    }
    componentDidMount(){
        this.getOverdueData();
    }
    render() {
        return <div style={{width: '100%', height: '100%',position:'relative'}} id={this.state.id}>
            <PageLoading show={true} hideContent={true} />
        </div>
    }
}