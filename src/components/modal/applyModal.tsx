import * as React from 'react';
import { BaseModal } from './base/baseModal';
import {  BankCardInput, ApplyInput } from '../input';
import { PrimaryButton, CancelButton } from '../button';
import { ApplyContent } from '../menu/applyContent';

interface Props {}

interface State {
    isOpen: boolean;
}
interface Props {}

interface ModalState {
    step: 'inputCard' | 'applyList' | 'applyListDetail';
    dataState: any;
    card: string;
}

export class ApplyModal extends React.Component<Props, ModalState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            step: 'inputCard',
            dataState: {},
            card: ''
        };
        this.changeStep = this.changeStep.bind(this);
        this.setDataState = this.setDataState.bind(this);
        this.setCard = this.setCard.bind(this);
    }
    changeStep(step: 'inputCard' | 'applyList' | 'applyListDetail'){
        this.setState({
            step: step
        })
    }
    //设置数据状态
    setDataState(data: any){
        this.setState({
            dataState: data
        })
    }
    setCard(card: string){
        this.setState({
            card: card
        })
    }
    getStep(){
        switch(this.state.step){
            case 'inputCard':{
                return <InputCardModal 
                setDataState={this.setDataState}
                setCard={this.setCard}
                onChangeStep={this.changeStep} />
            }
            case 'applyList': {
                return <ApplyContentListModal 
                    dataState={this.state.dataState}
                    card={this.state.card}
                    onChangeStep={this.changeStep}/>
            }
            case 'applyListDetail': {
                return <ApplyContentDetail 
                    card= {this.state.card}
                    onChangeStep={this.changeStep} />
            }
        }
    }
    render() {
        return <BaseModal isOpen={true}>
            {this.getStep()}
        </BaseModal>
    }
} 
interface InputCardModalProps {
    onChangeStep: (str: string)=>void;
    setDataState: (data: any) =>void;
    setCard: (str: string) => void;
}
interface InputCardModalState {
    data: {
        card: string
    }
}
class InputCardModal extends React.Component<InputCardModalProps, InputCardModalState> {
    constructor(props: InputCardModalProps) {
        super(props);
        this.state = {
            data: {
                card: '',
            }
        };
        this.changeInput = this.changeInput.bind(this);
        this.searchCard = this.searchCard.bind(this);
    }
    changeInput(name: 'card', value: any){
        let _data = this.state.data;
        _data[name] = value;
        this.setState({
            data: _data
        })
    }
    searchCard(){
        this.props.setCard(this.state.data.card);
        /*请求 */
        this.props.onChangeStep('applyList')
        //this.props.setDataState({});
    }
    render() {
        return <div
            style={{background: '#fff', padding: '35px', width: '330px'}}>
            <BankCardInput 
                placeholder='请输入身份证' name='card' 
                value={this.state.data.card}
                onChange={(e)=>this.changeInput('card', e.target.value)} />
            <PrimaryButton 
                style={{height: '48px',marginTop: '20px'}}
                onClick={this.searchCard}>
                查询身份证
            </PrimaryButton>
            <CancelButton style={{height: '48px',marginTop: '20px'}}>
                关闭
            </CancelButton>
        </div>
    }
}

interface ApplyContentListModalProps {
    onChangeStep: (str: string) => void;
    dataState: any;
    card: string;
}

class ApplyContentListModal extends React.Component <ApplyContentListModalProps ,any>{
    render(){
        return <div style={{width: '500px', 
                height: '660px', 
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                background: '#Fff'}}>
                <div>
                    <BankCardInput value={this.props.card} disabled={true} borderNone={true} />
                    <ApplyContent 
                        dataState={this.props.dataState}
                        onChangeStep={this.props.onChangeStep} />
                </div>
                <div style={{display: 'flex'}}>
                    <CancelButton onClick={()=>this.props.onChangeStep('inputCard')} style={{borderRadius: '0', 
                        height: '40px',
                        width: '33%'}}>
                        返回
                    </CancelButton>
                    <CancelButton style={{borderRadius: '0',
                        height: '40px',
                        width: '34%'
                        }}>
                        关闭
                    </CancelButton>
                    <PrimaryButton style={{borderRadius: '0',
                        height: '40px',
                        width: '33%'}}>
                        确认
                    </PrimaryButton>
                </div>
        </div>
    }
}

class ApplyContentDetail extends React.Component <any, any>{
    render(){
        return <div style={{height: '660px',
                display:'flex',
                background: '#fff'
            }}>
            <div style={{width: '300px'}}>
                <BankCardInput value={this.props.card} disabled={true} borderNone={true} />
                <ApplyContent dataState={this.props.dataState} onChangeStep={this.props.onChangeStep}/>
            </div>
            <div style={{width: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    <div style={{color: '#333', fontWeight: 'bold', 
                        padding: '20px', textAlign:'center'}}>
                        申请借款信息
                    </div>
                    <div style={{width: '360px', margin:'auto'}}>
                        <div style={{marginTop: '20px'}}>
                            <ApplyInput type='text' text='申请金额' />
                        </div>
                        <div style={{marginTop: '20px'}}>
                            <ApplyInput type='text' text='申请周期' />
                        </div>
                        <div style={{marginTop: '20px'}}>
                            <ApplyInput type='text' text='用途' disabled={true} value='家庭消费'/>
                        </div>
                    </div>
                </div>
               
                <div style={{display: 'flex'}}>
                    <CancelButton 
                        onClick={()=>this.props.onChangeStep('applyList')}
                        style={{height: '40px', borderRadius:'0', width: '50%'}} >
                        取消
                    </CancelButton>
                    <PrimaryButton style={{height: '40px', borderRadius:'0', width: '50%'}} >
                        确认
                    </PrimaryButton>
                </div>
            </div>
        </div>
    }
}