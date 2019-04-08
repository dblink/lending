import * as React from 'react';
import { sessionData } from '../../components/sessionData/sessionData';
import { ParameterName, Parameter } from '../../components/request/setting';
import { ReqOption, req } from '../../components/request';
import { logOut } from '../../components/fail/logOut';
import { CalendarInput } from '../../components/input';
import { ChartSettingHome, chartSetting } from './chartSetting';
import { PageLoading } from '../../components/progress/progress';
import { load } from '../../components/loading/loading';

interface Props {}

interface State {
    id: string;
    data: Parameter<ParameterName.getHomePageApplyCount>;
    xAxis: any[],
    series: {
        reviewData: any[], 
        applyData: any[]
    };
    show: boolean;
}

export class ApplyCharts extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let _date = new Date();
        this.state = {
            id: 'applyCharts',
            data: {
                Token: sessionData.getData('Token'),
                Time: `${_date.getFullYear()}/${_date.getMonth()+1}`
            },
            xAxis: [],
            series: {
                reviewData: [],
                applyData: []
            },
            show: false
        };
        this.drawChart = this.drawChart.bind(this);
        this.getApplyCharts = load.run.call(this, this.getApplyCharts, 'show');
        this.onChangeDate = this.onChangeDate.bind(this);
    }
    drawChart(){
        let _req:any = require;
        _req.ensure([], ()=>{
            let charts = require('./echarts');
            let applyCharts =  charts.chart.init(document.getElementById(this.state.id));
            let option: ChartSettingHome = {
                axis: this.state.xAxis,
                config: [{
                    name: '申请数',
                    data: this.state.series.applyData,
                    type: 'line'
                },{
                    name: '通过数',
                    data: this.state.series.reviewData,
                    type: 'line'
                }],
                title: '一月内申请/通过数'
            };
            applyCharts.setOption(chartSetting.home(option));
        }, ()=>{}, 'echarts');
    }
    getApplyCharts(){
        let _req:ReqOption<ParameterName.getHomePageApplyCount>;
        _req = {
            data: this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                let _x:any[] = [];
                let _apply:any[] = [];
                let _review:any[] = [];
                let data = e.Value;
                data.map((value:any, key: any)=>{
                    _x.push(value.Date);
                    _apply.push(value.ApplyCount);
                    _review.push(value.AuditCount);
                });
                this.setState({
                    xAxis: _x,
                    series: {
                        applyData: _apply,
                        reviewData: _review
                    },
                    show: false
                }, this.drawChart)
            }
        }
        req(ParameterName.getHomePageApplyCount, _req);

    }
    componentDidMount(){
        this.getApplyCharts();
    }
    onChangeDate(date:any){
        let _data =  this.state.data,
            _value = date.target.value.split('/');

        _data.Time = `${_value[0]}/${_value[1]}`;
        this.setState({
            data: _data
        },this.getApplyCharts)
    }
    render() {
        return <div style={{position: 'relative',
                width: '100%', height: '100%'
            }}>
            <div id={this.state.id} style={{
                width: '100%', height: '100%'}}>
            </div>
            <div style={{
                position: 'absolute', left: '20%', top: '1%'}}>
                <CalendarInput text='选择日期' 
                    onChange={this.onChangeDate}
                    value={this.state.data.Time} />
            </div>
            <PageLoading show={this.state.show} hideContent={true} />
        </div> 
    }
}