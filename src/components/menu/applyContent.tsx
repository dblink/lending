import * as React from 'react';
import { Vertical } from './base/vertical';

interface Props {
    onChangeStep: any;
    dataState : any;
}

interface State {}

export class ApplyContent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    arr: {
        text: string,
        iconName: string,
        isMust ?: boolean
    }[] = [{
        text: '申请借款信息',
        iconName: '1',
        isMust: true,
    },{
        text: '借款人信息',
        iconName: '2',
        isMust: true
    },{
        text: '实名认证',
        iconName: '3',
        isMust: true
    },{
        text: '借款人详细信息',
        iconName: '4'
    },{
        text: '蜜罐',
        iconName: '5'
    },{
        text: '蜜蜂',
        iconName: '6'
    },{
        text: '支付宝',
        iconName: '7'
    }]
    stateDom(){
        
    }
    render() {
        return <div style={{borderTop: '10px solid #F6F6F6'}}>
            {
                 this.arr.map((value)=>{
                    return <Vertical 
                    onClick={()=>this.props.onChangeStep('applyListDetail')}
                    isMust={value.isMust} text={value.text} 
                    iconName={value.iconName} default={<span style={{color: 'green'}}>已完成</span>}/>
                }) 
            }
        </div> 
       
    }
}