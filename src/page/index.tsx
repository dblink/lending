import * as React from 'react';
import { View } from '../module/pageModule/view';
import { browserHistory } from '../router';
import { ApplyCharts } from '../module/echarts/applyCharts';
import { RepayAndOverdue } from '../module/echarts/repayAndOverdue';

interface Props {}

interface State {}

export class Welcome extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    myChart:any;
    componentDidMount(): void {
    }
    list:any = [{
        icon: 'img/home/todayRepay.png',
        url: '/logged/repayListToday',
        text: '今日待还款'
    },{
        icon: 'img/home/todayReview.png',
        url: '/logged/auditListToday',
        text: '今日待审核'
    },{
        icon: 'img/home/weekInOverdue.png',
        url: '/logged/overdueListInWeek',
        text: '7日内逾期'
    },{
        icon: 'img/home/weekOutOverdue.png',
        url: '/logged/overdueListOutWeek',
        text: '7日+逾期'
    }]
    render() {
        return <View>
            <div style={{display: 'flex', 
                height: '100%',
                flexDirection: 'column',
                overflow: 'auto',
                background: "url('img/home/index_bg.jpg')",
                justifyContent: 'space-between'
            }}>
                <div style={{display: 'flex',  justifyContent: 'space-between'}}>
                {
                    this.list.map((value: any)=>{
                        return <div 
                            onClick={()=>browserHistory.push(value.url)}
                            style={{
                                cursor: 'pointer',
                                display: 'flex', //flexDirection: 'column',
                                alignItems: 'center',
                                padding: '10px',
                                //marginLeft: '10px',
                                height: '80px', width: '20%', position: 'relative'}}>

                                <img src={value.icon} style={{height: '100%'}} />
                                <div style={{fontWeight: 'bold',marginLeft: '10px', color: '#444'}}>
                                    {value.text}
                                </div>
                           
                        </div>
                    })
                }
                </div>
                {
                    <div style={{display: 'flex', height: '30%'}}>
                        <RepayAndOverdue id='overDueNumberCount' state='overdueCount' />
                        <RepayAndOverdue id='overDueNumberMoney' state='overdueMoney' />
                    </div>
                    
                }
                {
                    <div style={{display: 'flex', height: '40%'}}>
                         <ApplyCharts />
                    </div>
                }
                
            </div>
        </View>
    }
}