import * as React from 'react';
import { Parameter, ParameterName, Callback } from '../../../components/request/setting';
import { ContractModal } from './contract';
import { sessionData } from '../../../components/sessionData/sessionData';
import { Input } from '../../../components/modal/audit';
import { load } from '../../../components/loading/loading';
import { cardList, cardNumber } from '../../../components/bankCard/card';
import { ReqOption, req } from '../../../components/request';
import { BankMessage, BankInput } from '../../../components/bankCard/bankInput';
import { ModalTitle } from '../../../components/modal/title';
import { ApplyInput } from '../../../components/input';
import { CancelButton, PrimaryButton } from '../../../components/button';
import { InnerProgress } from '../../../components/progress/progress';

type AddBankCardState = {
    bankcard: string;
    error : any;
    data : Parameter<ParameterName.bindBankCard | ParameterName.changeBankCard>;
    type : 'shuangQian' | 'local';
    sendMessageId: string;
    code: string;
    userType: '1' | '2' | '3'; //1 = 双乾 2 = 汇付
    isLoading: boolean;
}
type AddBankCardProps = {
    borrowerBaseInfoId: string;
    data ?: ContractModal.dataState;
    pageChange: any;
}
export class AddEditorBankCard extends React.Component<AddBankCardProps, AddBankCardState>{
    constructor(props: AddBankCardProps){
        super(props);
        this.state = {
            data: {
                Id: props.data.Id || '',
                BankCardNo:'',
                BankCode: '',
                Mobile: props.data.Mobile || '',
                BankName: '',
                BorrowerBaseInfoId: props.borrowerBaseInfoId,
                ReturnUrl: 'http://lotus.hehuadata.com/contract/success',
                Token: sessionData.getData('Token')
            },
            userType: sessionData.getData('UserInfo').ProductType.toString(),
            code: '',
            sendMessageId: '',
            bankcard: '',
            error: {},
            type: 'local',
            isLoading: false,
        }
        let _req:any = require;
        _req.ensure([], ()=>{
            this.BIN = require(/* webpackChunkName: 'bankcardinfo' */ '../../../components/bankInfo/index')
        });
        this.getBankInfo = this.getBankInfo.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.inputMobileChange = new Input().inputChange.bind(this);
        this.confirm = load.run.call(this, this.confirm);
        this.doubleMoney = this.doubleMoney.bind(this);
        this.collectPay = this.collectPay.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    getBankInfo(){
        let _bankcard = this.state.bankcard.replace(/\s/g, '');
        if(this.BIN && _bankcard.length >= 15 && _bankcard.length <= 19){
            this.BIN.getBankBin(_bankcard,(err: any,data:any)=>{
                if(data){
                    if(!cardList[data.bankCode] || data.cardType === 'CC'){
                        err = '不支持该银行卡！';
                    }
                }
                if(!err){
                    let _data = this.state.data;
                    _data.BankCardNo = _bankcard;
                    _data.BankCode = data.bankCode;
                    _data.BankName = cardList[data.bankCode];
                    this.setState({
                        data: _data,
                        error: {}
                    })
                }else{
                    let _error = this.state.error;
                    _error.bankcard = err.replace(/^\d*:|,.*/g,'');
                    alert('_error');
                    this.setState({
                        error: _error
                    })
                }
            })
        }
    }
    inputMobileChange: any;
    inputChange(e: React.ChangeEvent<any>){
        if(this.state.isLoading){
            return;
        }
        let _value = e.target.value;
        _value = _value.match(/\d{4}|\d{1,3}$/g);
        _value = _value ? _value.join(' ') : '';
        this.setState({
            bankcard: _value,
        },()=>{
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(this.getBankInfo, 1000);
        });
    }
    timer: any;
    BIN: any;
    form: HTMLFormElement;
    fail = (e: Callback)=>{
        alert(e.ErrMsg);
        this.setState({
            isLoading: false
        })
    }
    success = (e: any)=>{
        alert('操作成功！');
        this.props.pageChange('list');
    }
    sendMessageSuccess = (e: any)=>{
        alert('发送成功！');
        this.setState({
            sendMessageId: e.Value,
            isLoading: false
        })
    }
    //双乾
    doubleMoney(){
        let _options: ReqOption<ParameterName.bindBankCard | ParameterName.changeBankCard>;
        _options = {
            data: this.state.data,
            fail: this.fail,
            succeed: this.success
        }
        if(this.props.data.Id){
            req(ParameterName.changeBankCard, _options);
        }else{
            req(ParameterName.bindBankCard, _options);
        }
    }
    //汇付发送验证码
    sendMessage(){
        let _options: ReqOption<ParameterName.bindBankCard | ParameterName.changeBankCard>;
        let _data = this.state.data;
        _data.BankCode = cardNumber[_data.BankCode as 'ICBC'];
        _options = {
            data: _data,
            fail: this.fail,
            succeed: this.sendMessageSuccess
        }
        req(ParameterName.bindBankCard, _options);
    }
    //汇付
    collectPay(){
        let _options: ReqOption<ParameterName.deductBindBankCard>;
        _options = {
            data: {
                BankCardNo: this.state.data.BankCardNo,
                BindTransId: this.state.sendMessageId,
                BorrowerId: this.state.data.BorrowerBaseInfoId,
                ValidCode: this.state.code,
                Token: sessionData.getData('Token')
            },
            fail: this.fail,
            succeed: this.success
        }
        req(ParameterName.deductBindBankCard, _options);
    }
    confirm(){
        switch(this.state.userType){
            case '1': {
                this.doubleMoney();
                break;
            };
            case '3':
            case '2': {
                this.collectPay()
                break;
            }
        }

    }
    onWaring=(name: string, err: string)=>{
        let _error = this.state.error;
        _error[name] = err
        this.setState({
            error: _error
        })
    }
    onSuccess=(data: BankMessage)=>{
        let _data = this.state.data;
        _data.BankCardNo = data.BankCardNo;
        _data.BankCode = data.BankCode;
        _data.BankName = data.BankName;
        this.setState({
            data: _data,
            error: {}
        })
    }
    render(){
        return <div className='flex-space-between' style={{background: '#FFF', 
            flexDirection: 'column',
            height: '600px', padding:'30px'}}>
                <div style={{width: '300px'}}>
                    <ModalTitle >
                        添加银行卡
                    </ModalTitle>
                    {
                        <div style={{marginTop: '30px'}}>
                            {/*
                                <ApplyInput text='银行卡号' 
                                name={'bankcard'}
                                value={this.state.bankcard}
                                onChange={this.inputChange}
                                error={this.state.error['bankcard']}
                            />
                            */}
                            <BankInput
                                onSuccess= {this.onSuccess}
                                isLoading= {this.state.isLoading}
                                onWaring={(str)=>this.onWaring('bankcard', str)}
                                error={this.state.error['bankcard']}
                            />
                            
                        </div>
                    }
                    {
                        <div style={{marginTop: '30px'}}>
                            <ApplyInput text='预留手机号'
                                name={'Mobile'}
                                value={this.state.data.Mobile}
                                onChange={(e)=>{
                                    if(!this.props.data.Id){
                                        this.inputMobileChange(e)
                                    }
                                }}
                                error={this.state.error['mobile']}
                            />
                        </div>
                    }
                    {
                        this.state.userType !== '1' ? <div style={{marginTop: '30px'}}>
                            <ApplyInput text='验证码'
                                name={'code'}
                                value={this.state.code}
                                sendMessage={this.sendMessage}
                                onChange={(e)=>{
                                    this.setState({
                                        code: e.target.value
                                    })
                                }}
                                error={this.state.error['code']}
                            />
                        </div> : ''
                    }
                </div>
                
                <div style={{height: '40px', display: 'flex'}}>
                    <CancelButton onClick={()=>this.props.pageChange('list')}>
                        取消
                    </CancelButton>
                    <PrimaryButton onClick={this.confirm}>
                        {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'} 
                    </PrimaryButton>
                </div>
        </div>
    }
}

