import * as React from 'react';
import { View } from '../module/pageModule/view';
import { browserHistory } from '../router';

interface Props {}

interface State {}

export class Welcome extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    list:any = [{
        icon: 'img/home/todayRepay.png',
        url: '/logged/repayListToday',
        text: '今日待还款'
    },{
        icon: 'img/home/todayRepay.png',
        url: '/logged/auditListToday',
        text: '今日待审核'
    },{
        icon: 'img/home/overDueList.png',
        url: '/logged/overdueListInWeek',
        text: '7日内逾期'
    }]
    render() {
        return <View>
            <div style={{display: 'flex', justifyContent: 'space-around', flexWrap:'wrap'}}>
                {
                    this.list.map((value: any)=>{
                        return <div 
                            onClick={()=>browserHistory.push(value.url)}
                            style={{background: '#FFF',
                                cursor: 'pointer',
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'center', alignItems: 'center',
                                height: '200px', width: '200px', position: 'relative'}}>
                            {/*<div style={{position: 'absolute', borderRadius: '10px',color: '#FFF',
                                    fontSize: '12px',
                                    padding: '0 10px',right: '15px', top: '15px',background:'red'}}>
                                34123条
                            </div>*/}
                            <div style={{textAlign: 'center'}}>
                                <img src={value.icon} style={{width: '100px'}} />
                                <div style={{fontWeight: 'bold',marginTop: '10px', color: '#444'}}>
                                    {value.text}
                                </div>
                                {/*
                                <div style={{color: '#1B8DEF',fontSize: '12px', marginTop: '10px'}}>
                                    123123123元
                                </div>
                                */}
                            </div>
                        </div>
                    })
                }
            </div>
        </View>
    }
}