import * as React from 'react';
import { InputCard } from '../../module/inputCard/inputCard';
import { config } from '../../components/config';
import { ApplyContent } from '../../components/menu/applyContent';
import { ApplyInfo } from '../../module/applyContentDetail/applyInfo/applyInfo';
import { BorrowerInfo } from '../../module/applyContentDetail/borrowerInfo/borrowerInfo';
import { Certification } from '../../module/applyContentDetail/certification/certification';
import { BorrowerInfoDetail } from '../../module/applyContentDetail/borrowerInfoDetail/borrowerInfoDetail';
import { Honeypot } from '../../module/honeypot/honeypot';
import { Juxinli } from '../../module/juxinli/juxinli';
import { Gongxinbao } from '../../module/applyContentDetail/gongXinBao/gongXinBao';
import { CancelButton, PrimaryButton } from '../../components/button';
import { ReqOption, req } from '../../components/request';
import { ParameterName } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { load } from '../../components/loading/loading';
import { InnerProgress } from '../../components/progress/progress';

interface Props {}

interface State {
    type: 'apply' | 'applyList' | 'applyInfo';
    data: any;
    card: string;
    isLoading: boolean;
    detail: 'ISApply' | 'ISExsitBorrower' | 'HoneypotStatus' | 'Alipay' | 'HoneyBeeStatus'
        | 'ISUploadPersonCardState' | 'ISExsitBorrowerDetail' | '';
}
type StateAttr = 'type' | 'data' | 'card' | 'detail';

export class MobileApplication extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            type: 'apply',
            data: {},
            card: '',
            detail: '',
            isLoading: false
        };
        this.getPage = this.getPage.bind(this);
        this.changeState = this.changeState.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setData = this.setData.bind(this);
        this.confirm = load.run.call(this, this.confirm);
    }
    changeState(name: StateAttr, value: any){
        let _state:any = this.state;
        _state[name] = value;
        this.setState(_state)
    }
    
    detailPage: State['detail'][] 
        = ['ISApply', 'HoneypotStatus', 'HoneyBeeStatus', 'Alipay',
        'ISExsitBorrower', 'ISUploadPersonCardState', 'ISExsitBorrowerDetail'];

    changePage(value:any){
        let _state:any = this.state;
        let name = 'detail';
        if(this.detailPage.indexOf(value) === -1){
            name = 'type';
        }
        if(name === 'detail'){
            if(value === 'Alipay' || value === 'HoneypotStatus' || value === 'HoneyBeeStatus'){
                if(this.state.data.ApplyId === '0'){
                    alert('请先填写申请借款信息！');
                    value = 'ISApply';
                }
            }
        }
        _state.type = '';
        _state.detail = '';
        _state[name] = value;
        this.setState(_state)
    }
    setData(name: any, value: any){
        let _data = this.state.data;
        _data[name] = value;
        this.setState({
            data: _data
        })
    }
    confirm(){
        let _props = this.state;
        if(!_props.data.ISUploadPersonCardState){
            alert('实名认证必填！');
            this.setState({
                isLoading: false
            })
            return;
        }
        if(!_props.data.ISApply){
            alert('申请信息必填！');
            this.setState({
                isLoading: false
            })
            return;
        }
        if(!_props.data.ISExsitBorrower){
            alert('借款信息必填！');
            this.setState({
                isLoading: false
            })
            return;
        }
        let _options: ReqOption<ParameterName.confirmApply> = {
            data: {
                BorrowerId: _props.data.BorrowerId,
                Token: sessionData.getData('Token')
            },
            fail:(e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            },
            succeed:(e)=>{
                alert('提交成功！');
                this.setState({
                    isLoading: false
                })
                this.changePage('apply')
            }
        }
        req(ParameterName.confirmApply, _options)
    }
    getPage(){
        let page = this.state.type || this.state.detail;
        switch(page){
            case 'apply': return(
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                     <InputCard 
                        style={{width: '100%'}}
                        onChangeStep={(e)=>{this.changePage(e)}} 
                        setCard={(e)=>{this.changeState('card', e)}}
                        setDataState={(e)=>this.changeState('data', e)}
                    />
                </div>
            )
            case 'applyList': return (
                <div style={{display: 'flex', flexDirection:'column',width:'100%',
                    justifyContent: 'space-between', height: '100%'}}>
                    <ApplyContent dataState={this.state.data} name={this.state.card}
                        onChangeStep={
                            (e: any, name: any)=>{
                                console.log(name);
                                this.changePage(name)
                            }
                        }
                    />
                    <div style={{display: 'flex', height: '48px'}}>
                        <CancelButton onTouchEnd={()=>{this.setState({type:'apply'})}}>返回</CancelButton>
                        <PrimaryButton onTouchEnd={this.confirm}>
                            {
                                this.state.isLoading 
                                    ? <InnerProgress height='32px' />
                                    : '提交'
                            }
                        </PrimaryButton>
                    </div>
                </div>
               
            )
            case 'ISApply': return (
                <ApplyInfo name='ISApply' id={this.state.data.BorrowerId} isExist={this.state.data.ISApply}  
                    onChangeDataState={this.setData}  
                    onChangeStep={this.changePage} />
            )
            case 'ISExsitBorrower': return (
                <BorrowerInfo name='ISExsitBorrower' card={this.state.card} isExit={this.state.data.ISExsitBorrower}
                    onChangeDataState={this.setData} userId={this.state.data.BorrowerId}
                    onChangeStep={this.changePage} />
            )
            case 'ISUploadPersonCardState': return(
                <Certification name='ISUploadPersonCardState' IDCard={this.state.card}
                    onChangeStep={this.changePage}
                    onChangeDataState={this.setData} />
            )
            case 'ISExsitBorrowerDetail': return(
                <BorrowerInfoDetail name='ISExsitBorrowerDetail' 
                    borrowerId={this.state.data.BorrowerId}
                    onChangeDataState={this.setData}
                    onChangeStep={this.changePage}
                    isExit={this.state.data.ISExsitBorrowerDetail} />
            )
            case 'HoneypotStatus': return(
                <Honeypot applyId={this.state.data.ApplyId} 
                    setDataState={this.setData}
                    type='HoneypotStatus'
                    skip={this.changePage}
                    idCardNo={this.state.card}  />
            )
            case 'HoneyBeeStatus': return(
                <Juxinli applyId={this.state.data.ApplyId}
                    idCardNo={this.state.card}
                    changePage={this.changePage}
                    state={this.state.data}
                    changeState={this.setData}
                    type='HoneyBeeStatus'
                    borrowerId={this.state.data.BorrowerId} />    
            )
            case 'Alipay': return(
                <Gongxinbao applyId={this.state.data.ApplyId}
                        changePage={this.changePage}
                        changeState={this.changePage}
                        state = {this.state.data}
                        idCardNo={this.state.card}
                        type='Alipay'
                    />
            )
        }
    }
    render() {
        return <div style={{height: config.HEIGHT + 'px'}}>
            {this.getPage()}
        </div>
    }
}