import * as React from 'react';
import { BankCardInput } from '../../components/input';
import { ApplyContent } from '../../components/menu/applyContent';
import { CancelButton, PrimaryButton } from '../../components/button';
import { ReqOption, req } from '../../components/request';
import { ParameterName } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { load } from '../../components/loading/loading';
import { InnerProgress } from '../../components/progress/progress';
interface ApplyContentListProps {
    onChangeStep: (str: string) => void;
    setType: (str: string) => void;
    dataState: any;
    card: string;
    name: string;
    close: ()=>void;
    changeShow: any;
}
interface ApplyContentListState {
    isLoading: boolean;
}

//状态列表
export class ApplyContentList extends React.Component <ApplyContentListProps ,ApplyContentListState>{
    constructor(props: ApplyContentListProps){
        super(props);
        this.state ={
            isLoading: false
        };
        this.onChangeStep = this.onChangeStep.bind(this);
        this.close = this.close.bind(this);
        this.confirm = load.run.call(this, this.confirm);
    }
    onChangeStep(str: string, name: string){
        if(this.state.isLoading){
            return;
        }
        if(name === 'Alipay' || name === 'HoneypotStatus' || name === 'HoneyBeeStatus'){
            if(this.props.dataState.ApplyId === '0'){
                alert('请先填写申请借款信息！');
                name = 'ISApply';
            }
        }
        this.props.setType(name);
        this.props.onChangeStep(str);
    }
    close(){
        this.props.close();
    }
    confirm(){
        let _props = this.props;
        if(!_props.dataState.ISUploadPersonCardState){
            alert('实名认证必填！');
            return;
        }
        if(!_props.dataState.ISApply){
            alert('申请信息必填！');
            return;
        }
        if(!_props.dataState.ISExsitBorrower){
            alert('借款信息必填！');
            return;
        }
        let _options: ReqOption<ParameterName.confirmApply> = {
            data: {
                BorrowerId: _props.dataState.BorrowerId,
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
                this.props.changeShow(false, true);
            }
        }
        req(ParameterName.confirmApply, _options)
    }
    render(){
        return <div style={{width: '500px', 
                height: '600px', 
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                background: '#Fff'}}>
                <div>
                    <BankCardInput value={this.props.card} disabled={true} borderNone={true} />
                    <ApplyContent 
                        name={this.props.name}
                        dataState={this.props.dataState}
                        onChangeStep={this.onChangeStep} />
                </div>
                <div style={{display: 'flex'}}>
                    <CancelButton 
                        onClick={()=>this.props.onChangeStep('inputCard')} 
                        style={{
                            borderRadius: '0', 
                            height: '40px',
                            width: '33%'}} >
                        返回
                    </CancelButton>
                    <CancelButton onClick={this.close}
                        style={{borderRadius: '0',
                            height: '40px',
                            width: '34%'
                            }}>
                        关闭
                    </CancelButton>
                    <PrimaryButton style={{borderRadius: '0',
                        height: '40px',
                        width: '33%'}} onClick={this.confirm}>
                        {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'}
                    </PrimaryButton>
                </div>
        </div>
    }
}