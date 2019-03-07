import * as React from 'react';
import { Vertical } from './base/vertical';
import { Icon } from '../icon/icon';

interface Props {
    onChangeStep: any;
    dataState : any;
    name : string;
}

interface State {}

export class ApplyContent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.stateDom = this.stateDom.bind(this);
    }
    arr: {
        text: string,
        iconName: string,
        name: string,
        isMust ?: boolean
    }[] = [{
        text: '申请借款信息',
        name: 'ISApply',
        iconName: 'borrowInfo',
        isMust: true,
    },{
        text: '借款人信息',
        iconName: 'personInfo',
        name: 'ISExsitBorrower',
        isMust: true
    },{
        text: '实名认证',
        iconName: 'authentication',
        name: 'ISUploadPersonCardState',
        isMust: true
    },{
        text: '借款人详细信息',
        iconName: 'detailInfo',
        name: 'ISExsitBorrowerDetail'
    },{
        text: '蜜罐',
        iconName: 'miguanReport',
        name: 'HoneypotStatus'
    },{
        text: '蜜蜂',
        name: 'HoneyBeeStatus',
        iconName: 'juxinliReport'
    },{
        text: '支付宝',
        name: 'Alipay',
        iconName: 'zhifubaoReport'
    }]
    stateDom(name: any){
        if(typeof this.props.dataState[name] === 'boolean') {
            if(
                this.props.dataState[name]
            ){
                return  <span style={{color: 'green'}}>已完成</span>
            }else{
                return <span style={{color: 'red'}}>未填写</span>
            }
        }else {
            switch(this.props.dataState[name].toString()){
                case '1':
                case '4':{
                    return  <span style={{color: 'red'}}>未获取</span>
                }
                case '2':{
                    return <span style={{color: 'blue'}}>获取中</span>
                }
                case '3': {
                    return <span style={{color: 'green'}}>已获取</span>
                }
            }
        }
    }
    render() {
        return <div style={{borderTop: '10px solid #F6F6F6'}}>
            {
                 this.arr.map((value, key)=>{
                    return <Vertical key={key}
                        onClick={()=>this.props.onChangeStep('applyListDetail', value.name)}
                        isMust={value.isMust} text={value.text} className={this.props.name === value.name ? 'click' : ''}
                        iconName={value.iconName} >
                        <div>
                            {
                                this.stateDom(value.name) || ''
                            }
                            <Icon style={{marginLeft: '15px', color: '#ccc'}}>
                                arrowRight
                            </Icon>
                        </div>
                    </Vertical>
                }) 
            }
        </div> 
       
    }
}