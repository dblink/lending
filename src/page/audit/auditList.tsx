import * as React from 'react';
import { CallbackSummary, ParameterName, RequestCallback, Parameter } from '../../components/request/setting';
import { HrefButton } from '../../components/button';
import { Table } from '../../components/table/commonTable';
import { ReqOption, req } from '../../components/request';
import { Paging } from '../../components/paging/paging';
import { View } from '../../module/pageModule/view';
import { AuditModal } from '../../components/modal/audit';
import { sessionData } from '../../components/sessionData/sessionData';

interface Props {}

interface State {
    callBackData: RequestCallback<ParameterName.getApplyItems>[];
    data: Parameter<ParameterName.getApplyItems>;
    status: 'Approved' | 'Denied';
    isShowModal: boolean;
    id: string;
}

export class AuditList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {
                BorrowerName: '',
                EmployeeId: '',
                EndTime: '',
                Token: sessionData.getData('Token'),
                PageSize: '10',
                MerchantNo: '',
                Mobile: '',
                PageIndex: '1',
                StartTime: '',
                Status: '3'
            },
            status: 'Approved',
            isShowModal: false,
            callBackData: [],
            id: ''
        };
        this.changePage = this.changePage.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount(){
        let _options: ReqOption<ParameterName.getAuditItems> = {
            data: this.state.data,
            fail: (e)=>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                this.setState({
                    callBackData: e.Value.PagedList
                })
            }
        }
        req(ParameterName.getAuditItems, _options);
    }
    changePage(num: number){
        let _data = this.state.data;
        _data.PageIndex = num;''
        this.setState({
            data: _data
        })
    }
    showModal(str: 'Approved' | 'Denied', id: string){
        this.setState({
            isShowModal: true,
            status: str,
            id: id,
        })
    }
    closeModal(){
        this.setState({
            isShowModal: false
        })
    }
    render() {
        return <View>
            <div style={{height: '40px',display: 'flex'}}>
                <div style={{background: '#fff', width: '100%'}}>

                </div>
                <Paging 
                    changePage={this.changePage}
                    index = {this.state.data.PageIndex}
                    totalSize = {10}
                    lastPage = '20'
                />
            </div>
            <div style={{marginTop: '30px'}}>
                <AuditTable showModal={this.showModal} data={this.state.callBackData} />
            </div>
            <AuditModal id={this.state.id} status={this.state.status} 
                cancelModal={this.closeModal}
                isShowModal={this.state.isShowModal} />
        </View>
    }
}

type AuditTableProps = {
    data: any;
    showModal: (str: State['status'], id: string) => void;
}

class AuditTable extends React.Component<AuditTableProps, any>{
    constructor(props: any){
        super(props);
    }
    setting: {
        attr: CallbackSummary[ParameterName.getAuditItems];
        head: string;
        format ?: any;
    }[] = [
    {
        attr: 'ApplyTime',
        head: '申请时间'
    },{
        attr:'BorrowerRealName',
        head: '姓名'
    },{
        attr: 'BorrowerMobile',
        head: '手机号'
    },{
        attr: 'ApplyMoney',
        head: '金额'
    },{
        attr: 'Period',
        head: '期数'
    },{
        attr: 'ConfirmPersonName',
        head: '业务员'
    },{
        attr: 'Id',
        head: '审核',
        format: (data: any)=>{
            return <div style={{display: 'flex',width: '100px', margin:'auto'}}>
                <HrefButton style={{width: '50%'}} 
                    onClick={()=>this.props.showModal('Approved', data.Id)}>
                    通过
                </HrefButton>
                <HrefButton style={{color: '#F14531', width: '50%'}}
                    onClick={()=>this.props.showModal('Denied', data.Id)}
                    >
                    拒绝
                </HrefButton>
            </div>
        }
    },{
        attr: 'Id',
        head: '操作',
        format: ()=>{
            return <HrefButton style={{margin: 'auto'}}>
                申请信息
            </HrefButton>
        }
    }];

    render(){
        let Tab = Table.CommonTable;
        return <Tab list={this.props.data} setting={this.setting} />
    }
}