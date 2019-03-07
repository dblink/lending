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
import { logOut } from '../fail/logOut';
import { View } from '../../module/pageModule/view';
import { load } from '../loading/loading';
import { InnerProgress, PageLoading } from '../progress/progress';
import { main } from '../request/main';
//let _bankInfo = require('../../components/getBankInfo');

interface Props {
    borrowId: string;
    contractId: string;
    page: '' | 'add' | 'list' | 'sign' | 'lending';
    isOpen: boolean;
    closeModal: ()=>void;
}

interface State {
    type: '' | 'add' | 'list' | 'sign' | 'lending'
}


export class ModalContract extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            type: props.page,
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
        //console.log(this.state.type);
        switch(this.props.page){
            case 'add':{
                return <AddBankCard pageChange={this.pageChange} borrowerBaseInfoId={this.props.borrowId} />
            }
            case 'list': {
                return <ListBankCard contractId={this.props.contractId} closeModal={this.props.closeModal}
                borrowId={this.props.borrowId} pageChange={this.pageChange} />
            }
            case 'sign': {
                return <Signature cancel={this.props.closeModal} contractId={this.props.contractId} />
            }
            case 'lending': {
                return <Leading contractId={this.props.borrowId} closeModal={this.props.closeModal} />
            }
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
    contractId: string;
    closeModal: ()=>void;
}
type ListBankCardState = {
    data: Parameter<ParameterName.getBankCardInfo>;
    postCardData: Parameter<ParameterName.modifyContractCard>;
    list: RequestCallback<ParameterName.getBankCardInfo>[];
    isLoading: boolean;
}
class ListBankCard extends React.Component<ListBankCardProps, ListBankCardState>{
    constructor(props:ListBankCardProps){
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                BorrowerId: props.borrowId,
            },
            postCardData: {
                Token: sessionData.getData('Token'),
                BankCardId: '',
                ContractId: this.props.contractId
            },
            isLoading: false,
            list: []
        }
        this.choiceCard = this.choiceCard.bind(this);
        this.confirm = load.run.call(this, this.confirm.bind(this));
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
                this.setState({
                    list: e.Value
                })
            }
        }
        req(ParameterName.getBankCardInfo, _options);
    }
    choiceCard(value: any){
        let _data = this.state.postCardData;
        _data.BankCardId = value;
        this.setState({
            data: _data
        })
    }
    confirm(){
        let _postCard: ReqOption<ParameterName.modifyContractCard>;
        _postCard = {
            data: this.state.postCardData,
            fail: logOut((e:Callback)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            }, location.pathname),
            succeed: (e)=>{
                this.props.pageChange('sign')
            }
        }
        req(ParameterName.modifyContractCard, _postCard);
    }
    render(){
        return <div className='flex-space-between'
                style={{background: '#fff', 
                minWidth: '300px',
                flexDirection: 'column', height: '600px'}}>
            <ModalTitle>
                选择银行卡 
            </ModalTitle>
            <div>

            </div>
            <PrimaryButton onClick={()=>{this.props.pageChange('add')}} style={{height: '40px'}}>
                添加银行卡
            </PrimaryButton>
            <div style={{height: '100%', overflow: 'auto'}}>
                {
                    this.state.list.map((value, key)=>{
                        return <div key={key} onClick={()=>this.choiceCard(value.Id)} style={{display: 'flex', alignItems:'center', margin: '15px'}}>
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
                <PrimaryButton onClick={this.confirm}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'} 
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
    isLoading: boolean;
}
type AddBankCardProps = {
    borrowerBaseInfoId: string;
    pageChange: any;
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
            type: 'local',
            isLoading: false,
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
    confirm(){
        let _options: ReqOption<ParameterName.bindBankCard>;
        _options = {
            data: this.state.data,
            fail: (e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            },
            succeed: (e)=>{
                alert('绑卡成功！');
                this.props.pageChange('list');
            }
        }
        req(ParameterName.bindBankCard, _options);
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
                            <ApplyInput text='银行卡号' 
                                name={'bankcard'}
                                value={this.state.bankcard}
                                onChange={this.inputChange}
                                error={this.state.error['bankcard']}
                            />
                        </div>
                    }
                    {
                        <div style={{marginTop: '30px'}}>
                            <ApplyInput text='预留手机号'
                                name={'Mobile'}
                                value={this.state.data.Mobile}
                                onChange={this.inputMobileChange}
                                error={this.state.error['mobile']}
                            />
                        </div>
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

type SignatureProps = {
    contractId: string;
    cancel: (bool?: boolean)=>void;
}
type SignatureState = {
    data: Parameter<ParameterName.signature>;
    isPageLoading: boolean;
}

class Signature extends React.Component<SignatureProps, SignatureState> {
    constructor(props: SignatureProps){
        super(props);
        this.state = {
            data: {
                ReturnUrl: 'http://lotus.hehuadata.com/contract/success',
                Token: sessionData.getData('Token'),
                ContractId: this.props.contractId,
            },
            isPageLoading: false,
        }
        this.getInfo = load.run.call(this, this.getInfo, 'isPageLoading');
    }
    form: HTMLFormElement;
    componentDidMount(): void {
        this.getInfo();
    }
    getInfo(){
        let _req: ReqOption<ParameterName.signature>;
        _req = {
            data: this.state.data,
            fail: logOut((e:Callback)=>{
                alert(e);
            }, location.pathname),
            succeed: (e)=>{
                this.setState({
                    isPageLoading: false
                })
                let _form = this.form,
                    _strData = '',
                    _data = e.Value;
                _form.setAttribute('method', 'post');
                _form.setAttribute('action', 'http://hqbtest.95epay.com:4080/smallloan/sloan/paySignature.action')
                for(let k in e.Value){
                    _strData += `<input name=${k} value=${_data[k] ? _data[k] : ''} />`;
                }
                _form.innerHTML = _strData;
                _form.submit();
            }
        }
        req(ParameterName.signature, _req);
    }
    confirm(){
        this.props.cancel(true);
    }
    render(){
        return <div style={{background: '#FFF', height:'90%',
            width: '90%',
            position:'relative',
            flexDirection: 'column', display:'flex'}}>
            <PageLoading show={this.state.isPageLoading} />
            <form ref={e=>this.form = e} target='iframe' hidden></form>
            <iframe name='iframe' style={{border: 0, width: '100%', height: '100%'}}>
            
            </iframe>
            <div style={{display: 'flex', minHeight: '40px'}}>
                <CancelButton onClick={()=>this.props.cancel()}>取消</CancelButton>
                <PrimaryButton onClick={this.confirm}>确认</PrimaryButton>
            </div>
        </div>
    }
}

type LeadingProps = {
    closeModal: any;
    contractId: any;
}
type LeadingState = {
    data: Parameter<ParameterName.applyLoan>;
    isLoading: boolean;
}

class Leading extends React.Component<LeadingProps, LeadingState> {
    constructor(props: LeadingProps){
        super(props);
        this.state = {
            data: {
                ServiceMoney: '',
                LoanContractId: props.contractId,
                Token: sessionData.getData('Token')
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm);
        this.inputChange = this.inputChange.bind(this);
    }
    confirm(){
        let _req: ReqOption<ParameterName.applyLoan> = {
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                this.props.closeModal(true)
            }
        }
        req(ParameterName.applyLoan, _req);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _name = e.target.name,
            _value = e.target.value,
            _data = this.state.data;
        _data[_name as 'ServiceMoney'] = _value;
        this.setState({
            data: _data
        })
    }
    render(){
        return <div style={{background: '#FFF',
             display: 'flex', justifyContent: 'space-between', 
             width: '90%', maxWidth: '500px', height: '300px', flexDirection: 'column'}}>
             <div style={{padding:'0 70px'}}>
                <ModalTitle >
                    放款
                </ModalTitle>
                <ApplyInput text='每期服务费' type='text' 
                    onChange={this.inputChange}
                    name='ServiceMoney' value={this.state.data.ServiceMoney} />
             </div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton onClick={this.props.closeModal}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    确认
                </PrimaryButton>
            </div>
        </div>
    }
}