import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Table } from '../../components/table/commonTable';
import { CallbackSummary, ParameterName, Parameter, RequestCallback, Callback, PageInfo } from '../../components/request/setting';
import { HrefButton, PrimaryButton, CancelButton } from '../../components/button';
import { ReqOption, req } from '../../components/request';
import { Paging } from '../../components/paging/paging';
import { ModalContract } from '../../components/modal/contract';
import { sessionData } from '../../components/sessionData/sessionData';
import { overdueToken } from '../../components/fail/failJump';
import { PageLoading, InnerProgress } from '../../components/progress/progress';
import { load } from '../../components/loading/loading';
import { logOut } from '../../components/fail/logOut';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { Filter, FilterList } from '../../module/filter/filter';

interface Props {
    Status: -1 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    location: any;
}

interface State {
    data: Parameter<ParameterName.getContractItems>;
    callbackData: RequestCallback<ParameterName.getContractItems>[];
    borrowId: string;
    contractId: string;
    page: '' | 'add' | 'list' | 'sign' | 'lending';
    modalOpen: boolean;
    isLoading: boolean;
    isPageLoading: boolean;
    pageInfo : PageInfo;
}

export class ContractList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let _obj = getIntervalDate(new Date(), 1);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                Status: props.Status,
                StartTime: _obj.startTime,
                PageIndex: '1',
                PageSize: '10',
                BorrowerName: '',
                EmployeeId: '',
                EndTime: _obj.endTime,
                Mobile: ''
            },
            callbackData: [],
            borrowId: '',
            contractId: '',
            page: '',
            modalOpen: false,
            isLoading: true,
            isPageLoading: false,
            pageInfo :{}
        };
        this.getList =  load.run.call(this, this.getList, 'isPageLoading');
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changePage = this.changePage.bind(this);
        this.selectList =  this.selectListFunction();
        this.search = this.search.bind(this);
    }
    componentDidMount(){
        this.getList();
    }
    getList(){
        let _option: ReqOption<ParameterName.getContractItems> = {
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                this.setState({
                    isLoading: false,
                    isPageLoading: false,
                    callbackData: e.Value.PagedList,
                    pageInfo : e.Value.PageInfo
                })
            }
        }
        req(ParameterName.getContractItems, _option);
    }
    showModal(page: '' | 'add' | 'list' | 'sign' | 'lending', data: {id: string, contractId: string}){
        this.setState({
            page: page,
            borrowId: data.id,
            contractId: data.contractId,
            modalOpen: true
        })
    }
    closeModal(bool?: boolean){
        if(typeof bool === 'boolean' && bool){
            let _data = this.state.data;
            _data.PageIndex = 1;
            this.setState({
                data: _data,
                modalOpen: false,
                borrowId: '',
                contractId: '',
            },()=>{
                this.getList()
            });
            return;
        }else{
            this.setState({
                modalOpen: false,
                borrowId: '',
                contractId: '',
            })
        }
    }
    changePage(num: number){
        //console.log(num);
        if(this.state.isPageLoading){
            return;
        }
        let _data = this.state.data;
        _data.PageIndex = num;
        this.setState({
            data: _data
        }, this.getList)
    }
    selectList:FilterList;
    selectListFunction:()=>FilterList = ()=>{
        let filterSetting: FilterList = [{
                name: 'BorrowerName',
                text: '借款人',
                value: this.state.data.BorrowerName,
                type: 'input'
            },{
                name: 'Mobile',
                text: '手机号',
                value: this.state.data.Mobile,
                type: 'input'
            },{
                name: 'StartTime',
                text: '开始日',
                value: this.state.data.StartTime,
                type: 'date'
            },{
                name: 'EndTime',
                text: '结束日',
                value: this.state.data.EndTime,
                type: 'date'
            }
        ];
        if(this.props.Status.toString() === '-1'){
            filterSetting.push({
                name: 'Status',
                text: '状态',
                value: this.state.data.Status,
                type: 'select',
                list: [
                    {
                        text: '全部',
                        value :'-1'
                    },{
                        text: '等待签约',
                        value: '1'
                    },{
                        text: '等待放款',
                        value: '2',
                    },{
                        text: '履约中',
                        value: '3'
                    },{
                        text:  '逾期',
                        value: '4'
                    },{
                        value: '5',
                        text: '结清'
                    },{
                        value: '6',
                        text: '取消'
                    },{
                        value: '7',
                        text:'签约失败'
                    }
                ]
            })
        }
        return filterSetting
    }
    search(data: Parameter<ParameterName.getContractItems>){
        if(this.state.isPageLoading){
            return;
        }
        let _searchData = data,
        _newParameterData:Parameter<ParameterName.getContractItems>,
        _parameterData = this.state.data;
        _newParameterData = Object.assign({}, _parameterData, _searchData);
        _newParameterData.PageIndex = 1;
        this.setState({
            data: _newParameterData
        }, this.getList)        
    }
    render() {
        return <View>
            <div style={{height: '100%', position:'relative', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex',
                    marginBottom: '30px',
                    position: 'relative',
                    justifyContent:'space-between'}}>
                    <Filter filter={this.search} filterList={this.selectList}  />
                    <Paging 
                        changePage={this.changePage}
                        index = {this.state.data.PageIndex}
                        totalSize = {this.state.pageInfo.TotalCount}
                        lastPage = {this.state.pageInfo.PageCount}
                    />
                    <PageLoading show={this.state.isLoading} hideContent={true}/>
                </div>
                <div style={{flex:'auto',position:'relative'}}>
                    <PageLoading show={this.state.isPageLoading} />
                    <ContractTable showModal={this.showModal} data={this.state.callbackData} />
                </div>   
            </div>
            <ModalContract contractId={this.state.contractId} closeModal={this.closeModal}
                    page={this.state.page} isOpen={this.state.modalOpen} 
                    borrowId={this.state.borrowId}  />
        </View>
    }
}

type ContractTableProps = {
    data: any;
    showModal: (page: string, data: {id: string, contractId: string}) =>void
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
                    let _data:any = {};
                    _data.id = data.BorrowPersonBaseInfoId;
                    _data.contractId = data.Id;
                    return <HrefButton style={{width: 'auto'}} onClick={()=>{this.props.showModal('sign', _data)}}>等待签约</HrefButton>;
                case 2:
                    let _lending:any = {};
                    _lending.id = data.Id;
                    return <HrefButton style={{width: 'auto'}} onClick={()=>{this.props.showModal('lending', _lending)}}>等待放款</HrefButton>;
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
                case 8: 
                    return '放款中';
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

        return <Tab list={this.props.data || []} setting={this.setting} />
    }
}