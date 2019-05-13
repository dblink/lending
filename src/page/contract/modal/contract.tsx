import * as React from 'react';
import { BaseModal } from '../../../components/modal/base/baseModal';
import { RemarkModal } from '../../../components/modal/remark';
import { CardList } from './BankCardList';
import { AddEditorBankCard } from './addBankCard';
import { Signature, SignatureCT } from './signature';
import { Lending } from './lending';
import { Repayment } from './repayment';
import { Cancel } from './cancel';
import { Settle } from './settle';
import { PostLoan } from './remarkList';
import { sessionData } from '../../../components/sessionData/sessionData';

interface Props {
    contractModal: ContractModal.ObjectShowModal;
    getList: (isRefresh ?: boolean)=>any;
}
export namespace ContractModal{
    export type pageState = '' | 'add' | 'list' | 'sign'| 'lending' | 'remark'
        | 'onlineSettle' | 'localSettle' | 
        'postLoan' | 'cancel' | 'repayment' | 'edit';
    export type dataState = {
        name ?: string,
        cardNo ?: string,
        contractId ?: string,
        borrowId ?: string;
        remark ?: string;
        Mobile ?: string;
        Id ?: string;
        period ?: string;
        serviceMoney ?: string;
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
            Object.assign(_data, data)
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
            case 'edit':
            case 'add':{
                return <AddEditorBankCard pageChange={this.showModal} data={this.state.data}
                     borrowerBaseInfoId={this.state.data.borrowId} />
            }
            case 'list': {
                let _data = this.state.data;
                return <CardList contractId={_data.contractId} closeModal={this.closeModal}
                    borrowId={_data.borrowId} pageChange={this.showModal} />
            }
            case 'sign': {
                let _data = this.state.data;
                if(sessionData.getData('UserInfo').ProductType.toString() === '1'){
                    return <Signature cardNo={_data.cardNo} name={_data.name} period={_data.period} serviceMoney={_data.serviceMoney}
                        cancel={this.closeModal} contractId={this.state.data.contractId} />
                }else if(sessionData.getData('UserInfo').ProductType.toString() === '2'
                        || sessionData.getData('UserInfo').ProductType.toString() === '3'
                    ){
                    return <SignatureCT cardNo={_data.cardNo} name={_data.name} period={_data.period} serviceMoney={_data.serviceMoney}
                        cancel={this.closeModal} contractId={this.state.data.contractId} />
                }
            }
            case 'lending': {
                return <Lending contractId={this.state.data.contractId} closeModal={this.closeModal} />
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
            case 'postLoan': {
                return <PostLoan closeModal={this.closeModal} ContractId={this.state.data.contractId} />
            }
        }
    }
    render() {
        return <BaseModal isOpen={this.state.isOpen}>
            {this.getDom()}
        </BaseModal>
    }
}
