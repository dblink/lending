import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { ModalTitle } from './title';
import { BankCardList } from '../../module/bankCardList.tsx/bankCardList';
import { ParameterName, Parameter, PageInfo } from '../request/setting';
import { ReqOption, req } from '../request';
import { sessionData } from '../sessionData/sessionData';
import { logOut } from '../fail/logOut';
import { load } from '../loading/loading';
import { PrimaryButton, CancelButton } from '../button';
import { string } from 'prop-types';
import { PageLoading, InnerProgress } from '../progress/progress';
import { BankInput, BankMessage } from '../bankCard/bankInput';
import { BankCardInput, ApplyInput } from '../input';
import { Table } from '../table/commonTable';
import { Switch } from 'react-router';
import { Paging } from '../paging/paging';
import { RechargeModal, RechargeApply } from './rechargeModal';

interface Props {
    modal: {
        show: any;
        cancel: any;
    };
    getInfo: ()=>void;
}

interface State {
    data: Parameter<ParameterName.applyWithdraw>;
    type: 'bankList' | 'withdrawal' | 'detail' | 'transform';
    isOpen: boolean;
    isLoading: boolean;
}

export class Withdrawal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                Remark: ''
            },
            type: 'bankList',
            isOpen: false,
            isLoading: false
        };
        this.getDom = this.getDom.bind(this);
        this.cancel = this.cancel.bind(this);
        this.getId = this.getId.bind(this);
        this.showModal = this.showModal.bind(this);
        this.confirm = load.run.call(this, this.confirm);
        this.inputChange = load.isLoading.call(this, this.inputChange);
        this.props.modal.show = this.showModal;
        
        
    }
    cancel(bool ?: boolean){
        this.setState({
            isOpen: false
        }, ()=>{
            if(typeof bool === 'boolean'){
                this.props.getInfo()
            }
            
        })
    }
    getId(id: string){
        let _data = this.state.data;
        _data.WithdrawBankCardId = id;
        this.setState({
            data: _data,
            type: 'withdrawal'
        });
    }
    showModal(page: 'bankList' | 'transform' | 'withdrawal' | 'detail' = 'bankList'){
        this.setState({
            type: page,
            isOpen: true
        })
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _data =this.state.data;
        _data[e.target.name as 'Token'] = e.target.value;
        this.setState({
            data: _data
        })
    } 
    confirm(){
        let _req: ReqOption<ParameterName.applyWithdraw>;
        _req  ={
            data:this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false,
                })
            }),
            succeed: (e)=>{
                alert('申请成功！');
                this.setState({
                    isLoading: false,
                })
                this.cancel(true)
            }
        }
        req(ParameterName.applyWithdraw, _req);
    }
    getDom(){
        switch(this.state.type){
            case 'detail': return <Detail cancel={this.cancel} />
            case 'bankList': return <CardList confirm={this.getId} cancel={this.cancel}  />;
            case 'transform': return <RechargeApply cancelModal={this.cancel} type='transform' /> ;
            case 'withdrawal': return <div style={{width: '300px', height: '500px',
                display: 'flex', flexDirection: 'column',justifyContent:'space-between',
                background: '#FFF'}}>
                <div style={{padding:'0 30px'}}>
                    <ModalTitle>申请提现</ModalTitle>
                    <ApplyInput text='提现金额' onChange={this.inputChange} 
                        name ={'WithdrawAmount'}
                        value={this.state.data.WithdrawAmount} />
                </div>
                
                <div style={{height: '40px', display:'flex'}}>
                    <CancelButton onClick={()=>this.cancel()}>
                        取消
                    </CancelButton>
                    <PrimaryButton onClick={()=>this.confirm()}>
                        {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'} 
                    </PrimaryButton>
                </div>
            </div>
        }
    }
    render() {
        return <BaseModal isOpen={this.state.isOpen} >
            {this.getDom()}
        </BaseModal>
    }
}

type CardListProps = {
    cancel: (bool ?: boolean) =>void;
    confirm : (id: string)=>void;
    
}
type CardListState = {
    isLoading: boolean;
    bankList: any[];
    id: string;
    type: 'cardList' | 'addCard'
}
class CardList extends React.Component<CardListProps, CardListState>{
    constructor(props: any){
        super(props);
        this.state = {
            isLoading:false,
            bankList : [],
            id: '',
            type: 'cardList'
        }
        this.getList = load.run.call(this, this.getList);
        this.choiceCard  = this.choiceCard.bind(this);
        this.confirm = load.isLoading.call(this, this.confirm);
        this.cancel = this.cancel.bind(this);
    }
    componentDidMount(){
        this.getList();
    }
    getList(){
        let _req: ReqOption<ParameterName.getBankCardItems> = {
            data:{
                Token: sessionData.getData('Token')
            },
            fail: logOut((e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                this.setState({
                    isLoading: false,
                    bankList: e.Value
                })
            }
        }
        req(ParameterName.getBankCardItems, _req);
    }
    choiceCard(id: string){
        this.setState({
            id: id
        })
    }
    confirm(){
        if(this.state.id){
            this.props.confirm(this.state.id);
        }else{
            alert('请选择银行卡')
        }
    }
    cancel(bool ?: boolean){
        this.setState({
            type: 'cardList'
        }, ()=>{
            if(typeof bool === 'boolean'){
                this.getList();
            }
        })
    }
    getDom(){
        switch(this.state.type){
            case 'addCard': return <AddBankCard cancel={this.cancel} />
            case 'cardList': return <div style={{
                background: '#FFF',
                flexDirection: 'column',justifyContent: 'space-between',
                height: '500px', width:'400px',display: 'flex'}}>
                <div>
                    <ModalTitle>银行卡列表</ModalTitle>
                    <div style={{position: 'relative'}}>
                        <PrimaryButton onClick={()=>{this.setState({type: 'addCard'})}} style={{height: '32px'}}>添加银行卡</PrimaryButton>
                        {
                            !this.state.isLoading 
                                &&  <BankCardList list={this.state.bankList} choiceCard={(value)=>this.choiceCard(value.Id)} />
                        }
                        <PageLoading show={this.state.isLoading} />
                    </div>
                </div>
                
                <div style={{display: 'flex', height: '40px'}}>
                    <CancelButton onClick={()=>this.props.cancel()}>关闭</CancelButton>
                    <PrimaryButton onClick={this.confirm} >确认</PrimaryButton>
                </div>
            </div>
        }
    }
    render(){
        return this.getDom()
    }
}

type AddBankCardState = {
    data: Parameter<ParameterName.withdrawBindCard>;
    error: any;
    isLoading: boolean;
}
type AddBankCardProps = {
    cancel: (bool?: boolean)=>void
}
class AddBankCard extends React.Component <AddBankCardProps, AddBankCardState>{
    constructor(props: any){
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token')
            },
            //bankcard: '',
            isLoading: false,
            error: {
                bankcard: ''
            }
        }
        this.onWaring = this.onWaring.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.inputChange = load.isLoading.call(this, this.inputChange);
        this.confirm = load.run.call(this, this.confirm);
    }
    onSuccess(data: BankMessage){
        let _data = this.state.data;
        _data.BankCardNo = data.BankCardNo;
        _data.BankCode = data.BankCode;
        _data.BankName = data.BankName;
        this.setState({
            data: _data
        })
    }
    onWaring(name: string, value: any){
        let _error = this.state.error;
        _error[name] = value;
        this.setState({
            error: _error
        })
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _data = this.state.data;
        _data[e.target.name as 'Token'] = e.target.value;
        this.setState({
            data:_data
        })
    }
    confirm(){
        let _req: ReqOption<ParameterName.withdrawBindCard>;
        _req = {
            data: this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg)
            }),
            succeed: (e)=>{
                alert('绑卡成功！');
                this.props.cancel(true)
            }
        }
        req(ParameterName.withdrawBindCard, _req);
    }
    render(){
        return <div style={{height: '500px', width: '300px', 
            background: '#FFF', flexDirection: 'column', justifyContent: 'space-between',
            display: 'flex'}}>
            <div style={{padding: '0 20px'}}>
                <ModalTitle>绑定银行卡</ModalTitle>
                <div>
                    <BankInput
                        onSuccess= {this.onSuccess}
                        isLoading= {this.state.isLoading}
                        onWaring={(str)=>this.onWaring('bankcard', str)}
                        error={this.state.error['bankcard']}
                    />
                    <ApplyInput text="身份证号" name='IdCardNo' onChange={this.inputChange} 
                        value={this.state.data.IdCardNo} />
                    <ApplyInput text='预留手机号' name='Mobile' 
                        value={this.state.data.Mobile}  onChange={this.inputChange} />
                    <ApplyInput text='真实姓名' name='RealName' 
                        value={this.state.data.RealName}  onChange={this.inputChange} />
                </div>
            </div>
            <div style={{display: 'flex', height: '40px'}}>
                <CancelButton onClick={()=>this.props.cancel()}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'}
                </PrimaryButton>
            </div>
        </div>
    }
}
type DetailState = {
    data: Parameter<ParameterName.getWithdrawItems>;
    isPageLoading: boolean;
    dataList: any;
    pageInfo: PageInfo;
    isLoading: boolean;
}
class Detail extends React.Component <any, DetailState>{
    constructor(props: any){
        super(props);
        this.state = {
            data: {
                PageIndex: '1',
                PageSize: '10',
                Status: '-1',
                Token: sessionData.getData('Token')
            },
            dataList: [],
            pageInfo: {},
            isLoading: true,
            isPageLoading: false
        }
        this.getList = load.run.call(this, this.getList, 'isPageLoading');
        this.changePage = load.isLoading.call(this, this.changePage, 'isPageLoading');
    }
    componentDidMount(){
        this.getList();
    }
    getList(){
        let _req: ReqOption<ParameterName.getWithdrawItems>;
        _req = {
            data: this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isPageLoading: false,
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                this.setState({
                    dataList: e.Value.PagedList,
                    pageInfo: e.Value.PageInfo,
                    isPageLoading: false,
                    isLoading: false
                })
            }
        }
        req(ParameterName.getWithdrawItems, _req);
    }
    setting: Table.settingProps = [{
        attr: 'CreateTime',
        head: '申请时间'
        },{
            attr: 'WithdrawAmount',
            head: '申请金额'
        },{
            attr: 'remark',
            head: '备注'
        },{
            attr: 'Status',
            head: '状态',
            format: (data)=>{
                switch(data.Status.toString()){
                    case '1': return '申请中';
                    case '2': return '提现中';
                    case '3': return '提现成功';
                    case '4': return '提现失败';
                    case '5': return '拒绝提现';
                }
            }
        }]
    changePage(num:any){
        let _data = this.state.data;
        _data.PageIndex = num;
        this.setState({
            data: _data
        }, ()=>this.getList())
    }
    render(){
        let Tab = Table.CommonTable;
        return <div style={{background:'#FFF', 
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            height: '90%', width: '500px'}}>
            <div style={{height: '40px',position: 'relative'}}>
                <Paging index={this.state.data.PageIndex}
                    changePage={this.changePage}
                    totalSize={this.state.pageInfo.TotalCount}
                    lastPage={this.state.pageInfo.PageCount} />
                <PageLoading show={this.state.isLoading} hideContent={true} />
            </div>
            <div style={{flex: 'auto', position: 'relative'}}>
                <PageLoading show={this.state.isPageLoading} />
                <Tab list={this.state.dataList} setting={this.setting} />
            </div>
            <div style={{minHeight: '40px', display: 'flex'}}>
                <CancelButton onClick={()=>this.props.cancel()}>取消</CancelButton>
            </div>
        </div>
        
    }
}