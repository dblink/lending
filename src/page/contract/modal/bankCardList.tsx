import * as React from 'react';
import { Parameter, ParameterName, RequestCallback, Callback } from "../../../components/request/setting";
import { sessionData } from "../../../components/sessionData/sessionData";
import { load } from '../../../components/loading/loading';
import { req, ReqOption } from '../../../components/request';
import { logOut } from '../../../components/fail/logOut';
import { ModalTitle } from '../../../components/modal/title';
import { PageLoading, InnerProgress } from '../../../components/progress/progress';
import { PrimaryButton, CancelButton } from '../../../components/button';
import { BankCardList } from '../../../module/bankCardList.tsx/bankCardList';
import { ContractModal } from './contract';

type CardListProps = {
    pageChange: (str : ContractModal.pageState, data ?: ContractModal.dataState)=>void;
    borrowId : string;
    contractId: string;
    closeModal: ()=>void;
}
type CardListState = {
    data: Parameter<ParameterName.getBankCardInfo>;
    postCardData: Parameter<ParameterName.modifyContractCard>;
    list: RequestCallback<ParameterName.getBankCardInfo>[];
    isPageLoading: boolean;
    isLoading: boolean;
}
export class CardList extends React.Component<CardListProps, CardListState>{
    constructor(props:CardListProps){
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
        this.editorCard = this.editorCard.bind(this);
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
    editorCard(value: any){
        this.props.pageChange('edit', {Id: value.Id, Mobile: value.Mobile})
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
                <PrimaryButton onClick={()=>{this.props.pageChange('add',{Mobile: '', Id: ''})}} style={{height: '40px'}}>
                    添加银行卡
                </PrimaryButton>
                <BankCardList list={this.state.list} editorCard={this.editorCard} choiceCard={(value)=>this.choiceCard(value.Id)} />
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
