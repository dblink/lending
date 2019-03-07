import * as React from 'react';
import { CallbackSummary, ParameterName, RequestCallback, Parameter, PageInfo, Callback } from '../../components/request/setting';
import { HrefButton } from '../../components/button';
import { Table } from '../../components/table/commonTable';
import { ReqOption, req } from '../../components/request';
import { Paging } from '../../components/paging/paging';
import { View } from '../../module/pageModule/view';
import { AuditModal } from '../../components/modal/audit';
import { sessionData } from '../../components/sessionData/sessionData';
import { PageLoading } from '../../components/progress/progress';
import { load } from '../../components/loading/loading';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { Filter, FilterList } from '../../module/filter/filter';
import { logOut } from '../../components/fail/logOut';

interface Props {}

interface State {
    callBackData: RequestCallback<ParameterName.getAuditItems>[];
    data: Parameter<ParameterName.getAuditItems>;
    status: 'Approved' | 'Denied';
    pageInfo: PageInfo;
    isShowModal: boolean;
    id: string;
    isLoading: boolean;
    isPageLoading: boolean;
}

export class AuditList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let _obj = getIntervalDate(new Date(), 1);
        this.state = {
            data: {
                BorrowerName: '',
                EmployeeId: '',
                EndTime: _obj.endTime,
                Token: sessionData.getData('Token'),
                PageSize: '10',
                MerchantNo: '',
                Mobile: '',
                PageIndex: '1',
                StartTime: _obj.startTime,
                Status: '3'
            },
            status: 'Approved',
            isShowModal: false,
            callBackData: [],
            id: '',
            isLoading: true,
            isPageLoading: false,
            pageInfo: {}
        };
        this.changePage = this.changePage.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getList = load.run.call(this, this.getList, 'isPageLoading');
        this.filterList = this.filterListFunction();
        this.search = this.search.bind(this);
    }
    componentDidMount(){
        this.getList();
    }
    getList(){
        let _options: ReqOption<ParameterName.getAuditItems> = {
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                this.setState({
                    callBackData: e.Value.PagedList,
                    pageInfo:e.Value.PageInfo,
                    isLoading: false,
                    isPageLoading: false
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
    closeModal(refresh ?: boolean){
        this.setState({
            isShowModal: false
        }, ()=>{
            refresh && this.getList()
        })
    }
    filterList: FilterList;
    filterListFunction:()=>FilterList = ()=>{
        return [
            {
                text: '借款人',
                name: 'BorrowerName',
                type: 'input',
                value: this.state.data.BorrowerName
            },{
                text: '手机号',
                name: 'Mobile',
                type: 'input',
                value: this.state.data.Mobile
            },{
                text: '开始日',
                name: 'StartTime',
                type: 'date',
                value: this.state.data.StartTime
            },{
                text: '结束日',
                name: 'EndTime',
                type: 'date',
                value: this.state.data.EndTime
            }
        ]
    }
    search(data: Parameter<ParameterName.getAuditItems>){
        let _data = Object.assign({}, this.state.data, data);
        this.setState({
            data: _data
        }, this.getList)
    }
    render() {
        return <View>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', position: 'relative', marginBottom: '30px'}}>
                    <Filter filterList={this.filterList} filter={this.search} />
                    <Paging 
                        changePage={this.changePage}
                        index = {this.state.data.PageIndex}
                        totalSize = {this.state.pageInfo.TotalCount}
                        lastPage = {this.state.pageInfo.PageCount}
                    />
                    <PageLoading show={this.state.isLoading} hideContent={true} />
                </div>
                <div style={{flex:'auto', position: 'relative'}}>
                    <PageLoading show={this.state.isPageLoading} />
                    <AuditTable showModal={this.showModal} data={this.state.callBackData} />
                </div>                
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