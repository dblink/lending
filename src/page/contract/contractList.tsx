import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Table } from '../../components/table/commonTable';
import { CallbackSummary, ParameterName, Parameter, RequestCallback } from '../../components/request/setting';
import { HrefButton } from '../../components/button';
import { ReqOption, req } from '../../components/request';
import { Paging } from '../../components/paging/paging';
import { ModalContract } from '../../components/modal/contract';
import { sessionData } from '../../components/sessionData/sessionData';

interface Props {
    Status: 1 | 2 | 3 | 4 | 5 | 6 | 7
}

interface State {
    data: Parameter<ParameterName.getContractItems>;
    callbackData: RequestCallback<ParameterName.getContractItems>[];
    borrowId: string;
    page: string;
    modalOpen: boolean;
}

export class ContractList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                Status: props.Status,
                StartTime: '',
                PageIndex: '1',
                PageSize: '5',
                BorrowerName: '',
                EmployeeId: '',
                EndTime: '',
                Mobile: ''
            },
            callbackData: [],
            borrowId: '',
            page: '',
            modalOpen: false,
        };
        this.getList = this.getList.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        this.getList();
    }
    getList(){
        let _option: ReqOption<ParameterName.getContractItems> = {
            data: this.state.data,
            fail: (e)=>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                this.setState({
                    callbackData: e.Value.PagedList
                })
            }
        }
        req(ParameterName.getContractItems, _option);
    }
    showModal(page: string, id: string){
        this.setState({
            page: page,
            borrowId: id,
            modalOpen: true
        })
    }
    closeModal(){
        this.setState({
            modalOpen: false
        })
    }
    render() {
        return <View>
            <div style={{height: '40px', 
                display: 'flex',
                marginBottom: '30px'}}>
                <div style={{background: '#fff'}}>

                </div>
                <Paging 
                    changePage={(num)=>{console.log(num)}}
                    index = {this.state.data.PageIndex}
                    totalSize = {10}
                    lastPage = '20'
                />
            </div>
            <ContractTable showModal={this.showModal} data={this.state.callbackData} />
            <ModalContract closeModal={this.closeModal}
                page={this.state.page} isOpen={this.state.modalOpen} 
                borrowId={this.state.borrowId}  />
        </View>
    }
}

type ContractTableProps = {
    data: any;
    showModal: (page: string, id: string) =>void
}
class ContractTable extends React.Component<ContractTableProps , any> {
    constructor(props: any){
        super(props);
        this.state = {}
    }
    setting: {
        attr: CallbackSummary[ParameterName.getContractItems],
        head: string;
        format ?: any;
    }[] = [{
        attr: 'CreateTime',
        head: '申请时间'
    },{
        attr: 'BorrowerName',
        head: '姓名'
    },{
        attr: 'Mobile',
        head: '手机号'
    },{
        attr: 'StoreId',
        head: '门店'
    },{
        attr: 'Money',
        head: '合同金额'
    },{
        attr: 'Period',
        head: '期数'
    },{
        attr: 'PeriodType',
        head: '期数类型',
        format: (data: any, attr: any)=>{
            switch(data[attr]){
                case  1 : 
                case '1': {
                    return '每周'
                }
                case  2 :
                case '2': {
                    return '每月'
                }
                case  3 :
                case '3': {
                    return '每天'
                }
            }
        }
    },{
        attr: 'Remark',
        head: '备注',
    },{
        attr: 'State',
        head: '状态',
        format: (data: any, attr: any) =>{
            switch(data[attr]){
                case 1:
                    return <HrefButton onClick={()=>{this.props.showModal('sign', data.BorrowPersonBaseInfoId)}}>等待签约</HrefButton>;
                case 2:
                    return '等待放款';
                case 3:
                    return '履约中';
                case 4:
                    return '逾期';
                case 5:
                    return '结清';
                case 6:
                    return '取消';
                case 7:
                    return '签约失败';
            }
        }
    },{
        attr: 'State',
        head: '操作',
        format: (data: any, attr: any) =>{
            return <div>
                <HrefButton style={{margin: 'auto'}}>
                    操作
                </HrefButton>
            </div>
        }
    }];
    render(){
        let Tab = Table.CommonTable;

        return <Tab list={this.props.data} setting={this.setting} />
    }
}