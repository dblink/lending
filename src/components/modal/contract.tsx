import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { BankCard } from '../bankCard/bankCard';
import { PrimaryButton, CancelButton } from '../button';
import { ApplyInput } from '../input';
import { cardList } from '../bankCard/card';
import { Parameter, ParameterName, Callback, RequestCallback, CallbackSummary } from '../request/setting';
import { Input } from './audit';
import { ModalTitle } from './title';
import { ReqOption, req } from '../request';
import { sessionData } from '../sessionData/sessionData';
import { logOut } from '../fail/logOut';
import { View } from '../../module/pageModule/view';
import { load } from '../loading/loading';
import { InnerProgress, PageLoading } from '../progress/progress';
import { main } from '../request/main';
import { Table } from '../table/commonTable';
import { RemarkModal } from './remark';
import { BankCardList } from '../../module/bankCardList.tsx/bankCardList';
import { BankInput, BankMessage } from '../bankCard/bankInput';
//let _bankInfo = require('../../components/getBankInfo');

interface Props {
    contractModal: ContractModal.ObjectShowModal;
    getList: (isRefresh ?: boolean)=>any;
}

export namespace ContractModal{
    export type pageState = '' | 'add' | 'list' | 'sign'| 'lending' | 'remark'
        | 'onlineSettle' | 'localSettle' | 'cancel' | 'repayment';
    export type dataState = {
        name ?: string,
        cardNo ?: string,
        contractId ?: string,
        borrowId ?: string;
        remark ?: string;
    }
    export type ObjectShowModal = {
        showModal:(page: ContractModal.pageState,data: ContractModal.dataState) => void;
    }
}

interface State {
    page: ContractModal.pageState;
    data: ContractModal.dataState;
    isOpen: boolean;
}


export class ModalContract extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            page: '',
            data: {},
            isOpen: false
        };
        this.getDom = this.getDom.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.props.contractModal.showModal = this.showModal;
    }
    showModal(page: ContractModal.pageState, data ?: ContractModal.dataState){
        let _data = this.state.data;
        //if {data} exist, for {data} the assignment; 
        if(data){
            _data = data;
        }
        this.setState({
            page: page, 
            data: _data,
            isOpen: true
        })
    }
    closeModal(isRefresh ?: boolean){
        this.setState({
            page: '',
            data: {},
            isOpen: false
        },()=>{
            if(typeof isRefresh === 'boolean'){
                this.props.getList();
            }
        })
    }
    getDom(){
        switch(this.state.page){
            case 'add':{
                return <AddBankCard pageChange={this.showModal}
                     borrowerBaseInfoId={this.state.data.borrowId} />
            }
            case 'list': {
                let _data = this.state.data;
                return <ListBankCard contractId={_data.contractId} closeModal={this.closeModal}
                    borrowId={_data.borrowId} pageChange={this.showModal} />
            }
            case 'sign': {
                let _data = this.state.data;
                return <Signature cardNo={_data.cardNo} name={_data.name}
                    cancel={this.closeModal} contractId={this.state.data.contractId} />
            }
            case 'lending': {
                return <Leading contractId={this.state.data.contractId} closeModal={this.closeModal} />
            }
            case 'repayment': {
                return <Repayment contractId={this.state.data.contractId} cancel={this.closeModal} />
            }
            case 'cancel': return <Cancel contractId={this.state.data.contractId} cancel={this.closeModal} />
            case 'localSettle': {
                return <Settle type='local' contractId={this.state.data.contractId} cancel={this.closeModal} />
            }
            case 'onlineSettle': {
                return <Settle type='online' contractId={this.state.data.contractId} cancel={this.closeModal} />
            }
            case 'remark': {
                return <RemarkModal text={this.state.data.remark} cancelModal={this.closeModal} />
            }
        }
    }
    render() {
        return <BaseModal isOpen={this.state.isOpen}>
            {this.getDom()}
        </BaseModal>
    }
}
type ListBankCardProps = {
    pageChange: (str : ContractModal.pageState)=>void;
    borrowId : string;
    contractId: string;
    closeModal: ()=>void;
}
type ListBankCardState = {
    data: Parameter<ParameterName.getBankCardInfo>;
    postCardData: Parameter<ParameterName.modifyContractCard>;
    list: RequestCallback<ParameterName.getBankCardInfo>[];
    isPageLoading: boolean;
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
            isPageLoading: false,
            list: []
        }
        this.choiceCard = this.choiceCard.bind(this);
        this.confirm = load.run.call(this, this.confirm.bind(this));
        this.getBankInfoList = load.run.call(this, this.getBankInfoList, 'isPageLoading')
    }
    componentDidMount(){
        this.getBankInfoList();
    }
    getBankInfoList(){
        let _options:ReqOption<ParameterName.getBankCardInfo> = {
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                this.setState({
                    list: e.Value,
                    isPageLoading: false
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
                    isLoading: false,
                })
            }),
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
            <div style={{height: '100%', overflow: 'auto',position: 'relative'}}>
                <PageLoading show={this.state.isPageLoading} />
                <PrimaryButton onClick={()=>{this.props.pageChange('add')}} style={{height: '40px'}}>
                    添加银行卡
                </PrimaryButton>
                {/*
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
                */}
                <BankCardList list={this.state.list} choiceCard={(value)=>this.choiceCard(value.Id)} />
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
        this.confirm = load.run.call(this, this.confirm)
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
    name:string;
    cardNo: string;
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
        this.confirm = load.run.call(this, this.confirm, 'isPageLoading');
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
                _form.setAttribute('action', 'https://hqb.95epay.com/sloan/paySignature.action')
                for(let k in e.Value){
                    _strData += `<input name=${k} value=${_data[k] ? _data[k] : ''} />`;
                }
                _form.innerHTML = _strData;
                _form.submit();
            }
        }
        req(ParameterName.signature, _req);
    }
    num = 0;
    confirm(){
        if(localStorage.getItem('isServiceSign') !== 'true'){
            alert('请签署双方服务协议！');
            this.setState({
                isPageLoading: false
            })
            return;
        }
        localStorage.setItem('isServiceSign', '');
        let _req: ReqOption<ParameterName.getSignatureState>;
        _req ={
            data: {
                ContractId: this.props.contractId,
                Token: sessionData.getData('Token')
            },
            fail: logOut((e:Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                if(e.Value.Status.toString() === '0'){
                    alert('签约成功！');
                    this.props.cancel(true);
                }else if(e.Value.Status.toString() === '-1'){
                    if(this.num !== 0){
                        alert(e.Value.ErrorMessage);
                        this.props.cancel();
                    }else{
                        this.num = this.num + 1;
                        setTimeout(()=>{
                            this.setState({
                                isPageLoading: false
                            },this.confirm)
                        }, 10000)
                    }
                }
            }   
        }
        req(ParameterName.getSignatureState, _req);
    }
    render(){
        return <div style={{background: '#FFF', height:'90%',
            width: '90%',
            position:'relative',
            flexDirection: 'column', display:'flex'}}>
            <PageLoading show={this.state.isPageLoading} />
            <form ref={e=>this.form = e} target='iframe' hidden></form>
            <div>
                <a href={`/service/${this.props.name}/${this.props.cardNo}`} target='_blank'>
                    点击签署双方服务协议
                </a>
            </div>
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
        //console.log(props.contractId)
        this.state = {
            data: {
                //ServiceMoney: '',
                LoanContractId: props.contractId,
                Token: sessionData.getData('Token')
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm);
    }
    confirm(){
        let _req: ReqOption<ParameterName.applyLoan> = {
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                alert('购买处理中！10分钟有结果');
                this.props.closeModal(true)
            }
        }
        req(ParameterName.applyLoan, _req);
    }
    render(){
        return <div style={{background: '#FFF',
             display: 'flex', justifyContent: 'space-between', 
             width: '90%', maxWidth: '500px', height: '300px', flexDirection: 'column'}}>
             <div style={{padding:'0 70px'}}>
                <ModalTitle >
                    购买
                </ModalTitle>
             </div>
             <p style={{textAlign: 'center'}}>是否确认购买？</p>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton onClick={this.props.closeModal}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认' }
                </PrimaryButton>
            </div>
        </div>
    }
}

type RepaymentState = {
    data: Parameter<ParameterName.selectContractPlan>;
    callBackData: any;
    isLoading: boolean;
}
type RepaymentProps = {
    contractId: string;
    cancel: ()=>void;
}

class Repayment extends React.Component<RepaymentProps, RepaymentState>{
    constructor(props: RepaymentProps){
        super(props);
        this.state = {
            data:{
                LoanContractId: props.contractId,
                Token : sessionData.getData('Token')
            },
            isLoading: false,
            callBackData: []
        }
        this.getInfo = load.run.call(this, this.getInfo);
    }
    componentDidMount(){
        this.getInfo();
    }
    setting: {
        head: string;
        attr: CallbackSummary[ParameterName.selectContractPlan];
        format ?: (data: RequestCallback<ParameterName.selectContractPlan>, attr:CallbackSummary[ParameterName.selectContractPlan])=>void;
    }[] = [
        {
            attr: 'Period',
            head: '期数',
            format: (data)=>{
                return data.Period + '期';
            }
        },
        {
            attr: 'RepayTime',
            head: '还款时间'
        },{
            attr: 'Principal',
            head: '申请金额'
        },{
            attr: 'Interest',
            head: '利息'
        },{
            attr: 'ServiceMoney',
            head: '服务费'
        },{
            attr: 'RepayMoney',
            head: '应还金额'
        },{
            attr: 'Status',
            head: '状态',
            format: (e)=>{
                switch(e.Status.toString()){
                    case '1': return <span>待还款</span>;
                    case '2': return <span>申请中</span>;
                    case '3': return <span>还款成功</span>;
                    case '4': return <span>还款失败</span>;
                    case '5': return <span>逾期</span>;
                    case '6': return <span>待入账</span>;
                }
            }
        }
    ];
    getInfoRequest:any;
    getInfo(){
        let _req: ReqOption<ParameterName.selectContractPlan> ={
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (data)=>{
                this.setState({
                    callBackData: data.Value,
                    isLoading: false
                })
            }
        };
        this.getInfoRequest = req(ParameterName.selectContractPlan, _req)
    }
    componentWillUnmount(){
        if(typeof this.getInfoRequest === 'function'){
            this.getInfoRequest.close();
        }
    }
    render(){
        let Tab = Table.CommonTable;
        return <div style={{background: '#FFF', height: '90%',
             overflow: 'auto',justifyContent: 'space-between',
            display: 'flex', flexDirection: 'column', width: '600px'}}>
            <ModalTitle >还款表</ModalTitle>
            <div style={{height: '500px', position: 'relative', overflow:this.state.isLoading ? 'hidden' : 'auto'}}>
                <Tab setting={this.setting} list={this.state.callBackData} />
                <PageLoading show={this.state.isLoading} />
            </div>
            
            <div style={{display: 'flex', minHeight: '40px'}}>
                <CancelButton onClick={()=>this.props.cancel()}>关闭</CancelButton>
            </div>
        </div>
    }
}

type CancelProps = {
    contractId: string;
    cancel: (bool ?: boolean)=>void;
}

type CancelState = {
    data: Parameter<ParameterName.cancelContract>;
    isLoading: boolean;
}

class Cancel extends React.Component<CancelProps, CancelState>{
    constructor(props: any){
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                ContractId: this.props.contractId
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm);
        this.cancel = this.cancel.bind(this);
    }
    confirm(){
        let _req: ReqOption<ParameterName.cancelContract>;
        _req = {
            data: this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                alert('取消成功！');
                this.props.cancel(true)
            }
        }
        req(ParameterName.cancelContract, _req)
    }
    cancel(){
        this.props.cancel()
    }
    render(){
        return <div style={{height: '90%', width: '500px',flexDirection: 'column', 
            background: '#FFF', display:'flex', justifyContent: 'space-between'}}>
            <ModalTitle>
                取消合同
            </ModalTitle>
            <div style={{flex: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                是否确认取消合同
            </div>
            <div style={{display: 'flex', height: '40px'}}>
                <CancelButton onClick={this.cancel}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'}
                </PrimaryButton>
            </div>
        </div>
    }
}

type SettleProps = {
    contractId: string;
    type : 'local' | 'online';
    cancel: (bool ?: boolean)=>void;
}
type SettleState = {
    data: Parameter<ParameterName.applyRepayOfflineClearing>;
    isLoading: boolean;
}
class Settle extends React.Component<SettleProps, SettleState>{
    constructor(props: SettleProps){
        super(props);
        this.state = {
            data: {
                LoanContractId: this.props.contractId,
                Token: sessionData.getData('Token'),
                RepayMoney: ''
            },
            isLoading: false
        }
        this.inputChange = load.isLoading.call(this, this.inputChange);
        this.confirm = load.run.call(this, this.confirm);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _data = this.state.data;
        _data.RepayMoney = e.target.value;
        this.setState({
            data: _data
        })
    }
    confirm(){
        console.log(this.props.type);
        let _req: ReqOption<ParameterName.applyRepayOfflineClearing
            | ParameterName.applyRepayOnlineClearing>;
        _req = {
            data:this.state.data,
            fail: logOut((e)=>{
                this.setState({
                    isLoading: false
                })
                alert(e.ErrMsg)
            }),
            succeed:(e)=>{
                if(this.props.type === 'local'){
                    alert('提交结清申请成功！');
                }else if(this.props.type === 'online'){
                    alert('结清中，5分钟后有结果');                    
                }
                this.setState({
                    isLoading: false
                }, ()=>this.props.cancel(true))
            }
        }
        if(this.props.type === 'local'){
            req(ParameterName.applyRepayOfflineClearing, _req)
        }else if(this.props.type === 'online'){
            req(ParameterName.applyRepayOnlineClearing, _req);
        }
        
    }
    render(){
        return <div style={{background: '#FFF', 
            height: '300px', width: '600px', flexDirection: 'column',
            display: 'flex', justifyContent: 'space-between'}}>
            <ModalTitle>
                {this.props.type === 'local' ? '线下结清' : '线上结清'}
            </ModalTitle>
            <div style={{padding:'0 70px'}}>
                <ApplyInput text='结清金额'
                    name='RepayMoney' onChange={this.inputChange}
                    value={this.state.data.RepayMoney}
                />
            </div>
            <div style={{display: 'flex', height: '40px'}}>
                <CancelButton onClick={()=>this.props.cancel()}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={()=>this.confirm()}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> :'确认'}
                </PrimaryButton>
            </div>
        </div>
    }
}