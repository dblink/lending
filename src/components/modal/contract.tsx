import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { BankCard } from '../bankCard/bankCard';
import { PrimaryButton, CancelButton } from '../button';
import { ApplyInput } from '../input';
import { cardList } from '../bankCard/card';
import { Parameter, ParameterName, Callback, RequestCallback } from '../request/setting';
import { Input } from './audit';
import { ModalTitle } from './title';
import { ReqOption, req } from '../request';
import { sessionData } from '../sessionData/sessionData';
//let _bankInfo = require('../../components/getBankInfo');

interface Props {
    borrowId: string;
    page: string;
    isOpen: boolean;
    closeModal: ()=>void;
}

interface State {
    type: '' | 'add'
}


export class ModalContract extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            type: '',
        };
        this.getDom = this.getDom.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }
    pageChange(type: State['type']){
        this.setState({
            type: type
        })
    }
    getDom(){
        if(this.state.type === 'add'){
            return  <AddBankCard borrowerBaseInfoId={this.props.borrowId} />
        }else{
            return  <ListBankCard closeModal={this.props.closeModal}
            borrowId={this.props.borrowId} pageChange={this.pageChange} />
        }
        
    }
    render() {
        return <BaseModal isOpen={this.props.isOpen}>
            {this.getDom()}
        </BaseModal>
    }
}
type ListBankCardProps = {
    pageChange: (str : State['type'])=>void;
    borrowId : string;
    closeModal: ()=>void;
}
type ListBankCardState = {
    data: Parameter<ParameterName.getBankCardInfo>;
    list: RequestCallback<ParameterName.getBankCardInfo>[];
}
class ListBankCard extends React.Component<ListBankCardProps, ListBankCardState>{
    constructor(props:ListBankCardProps){
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                BorrowerId: props.borrowId,
            },
            list: []
        }
        
    }
    componentDidMount(){
        this.getBankInfoList();
    }
    getBankInfoList(){
        let _options:ReqOption<ParameterName.getBankCardInfo> = {
            data: this.state.data,
            fail: (e)=>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                //let _data = this.state.list;
                this.setState({
                    list: e.Value
                })
            }
        }
        req(ParameterName.getBankCardInfo, _options);
    }
    render(){
        return <div className='flex-space-between'
                style={{background: '#fff', 
                minWidth: '300px',
                flexDirection: 'column', height: '600px'}}>
            <ModalTitle>
                选择银行卡 
            </ModalTitle>
            <PrimaryButton onClick={()=>{this.props.pageChange('add')}} style={{height: '40px'}}>
                添加银行卡
            </PrimaryButton>
            <div style={{height: '100%', overflow: 'auto'}}>
                {
                    this.state.list.map((value, key)=>{
                        return <div style={{display: 'flex', alignItems:'center', margin: '15px'}}>
                            <input type='radio' name='card' id={`card${key}`} 
                                style={{width: '24px', height: '24px'}} />
                            <label htmlFor={`card${key}`}>
                                <BankCard mobile={value.Mobile} 
                                    bankCode={value.BankCode} cardNo={value.BankCardNo} />
                            </label>
                        </div>
                    })
                }
            </div>
            <div style={{display: 'inline-flex', height: '40px'}}>
                <CancelButton onClick={this.props.closeModal}>
                    关闭
                </CancelButton>
                <PrimaryButton>
                    确认
                </PrimaryButton>
            </div>
        </div>
    }
}
type AddBankCardState = {
    bankcard: string;
    error : any;
    data : Parameter<ParameterName.bindBankCard>;
    type : 'shuangQian' | 'local';
}
type AddBankCardProps = {
    borrowerBaseInfoId: string;
}
class AddBankCard extends React.Component<AddBankCardProps, AddBankCardState>{
    constructor(props: AddBankCardProps){
        super(props);
        this.state = {
            data: {
                BankCardNo:'',
                BankCode: '',
                Mobile: '',
                BankName: '',
                BorrowerBaseInfoId: props.borrowerBaseInfoId,
                ReturnUrl: 'http://lotus.hehuadata.com/contract/success',
                Token: sessionData.getData('Token')
            },
            bankcard: '',
            error: {},
            type: 'local'
        }
        let _req:any = require;
        _req.ensure([], ()=>{
            this.BIN = require(/* webpackChunkName: 'bankcardinfo' */ '../bankInfo/index')
        });
        this.getBankInfo = this.getBankInfo.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.inputMobileChange = new Input().inputChange.bind(this);
        this.confirm = this.confirm.bind(this);
    }
    getBankInfo(){
        let _bankcard = this.state.bankcard.replace(/\s/g, '');
        if(this.BIN && _bankcard.length >= 15 && _bankcard.length <= 19){
            this.BIN.getBankBin(_bankcard,(err: any,data:any)=>{
                if(data){
                    if(!cardList[data.bankCode]){
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
                    this.setState({
                        error: _error
                    })
                }
                
            })
        }
    }
    inputMobileChange: any;
    inputChange(e: React.ChangeEvent<any>){
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
    confirm(){
        let _options: ReqOption<ParameterName.bindBankCard>;
        //console.log(this.state.data);
        _options = {
            data: this.state.data,
            fail: (e)=>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                console.log(e.Value);
                let _form = this.form,
                    _strData = '',
                    _data = e.Value;
                _form.setAttribute('method', 'post');
                _form.setAttribute('action', 'http://hqbtest.95epay.com:4080/smallloan/sloan/bindCard.action')
                for(let k in e.Value){
                    _strData += `<input name=${k} value=${_data[k] ? _data[k] : ''} />`;
                }
                _form.innerHTML = _strData;
                
                this.setState({
                    type: 'shuangQian'
                },()=>_form.submit())
            }
        }
        req(ParameterName.bindBankCard, _options);
    }
    render(){
        return <div className='flex-space-between' style={{background: '#FFF', 
            flexDirection: 'column',
            height: '600px', padding:'30px'}}>
                <form ref={(e)=>this.form=e} target='iframe' style={{display: 'none'}}></form>
                <div style={{width: '300px'}}>
                    <ModalTitle >
                        添加银行卡
                    </ModalTitle>
                    {
                        this.state.type === 'local' ?
                        <div>
                            <ApplyInput text='银行卡号' 
                                name={'bankcard'}
                                value={this.state.bankcard}
                                onChange={this.inputChange}
                                error={this.state.error['bankcard']}
                            />
                            <ApplyInput text='预留手机号'
                                name={'Mobile'}
                                value={this.state.data.Mobile}
                                onChange={this.inputMobileChange}
                                error={this.state.error['mobile']}
                            />
                        </div>:
                        <iframe name='iframe'>

                        </iframe>
                    } 
                    
                </div>
                
                <div style={{height: '40px', display: 'flex'}}>
                    <CancelButton>
                        取消
                    </CancelButton>
                    <PrimaryButton onClick={this.confirm}>
                        确认
                    </PrimaryButton>
                </div>
        </div>
    }
}