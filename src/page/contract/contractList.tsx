import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Table } from '../../components/table/commonTable';
import { CallbackSummary, ParameterName, Parameter, RequestCallback, Callback, PageInfo, ParameterSummary } from '../../components/request/setting';
import { HrefButton, PrimaryButton, CancelButton } from '../../components/button';
import { ReqOption, req } from '../../components/request';
import { Paging } from '../../components/paging/paging';
import { ModalContract, ContractModal } from './modal/contract';
import { sessionData } from '../../components/sessionData/sessionData';
import { overdueToken } from '../../components/fail/failJump';
import { PageLoading, InnerProgress } from '../../components/progress/progress';
import { load } from '../../components/loading/loading';
import { logOut } from '../../components/fail/logOut';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { Filter, FilterList } from '../../module/filter/filter';
import { browserHistory } from '../../router';
import { addMerchantItem } from '../../module/filter/addMerchantItem';

interface Props {
    Status: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    //location: any;
    Time ?: 'weekIn' | 'weekOut'
}
type ContractParameter = Parameter<ParameterName.getContractItems>;
interface State {
    data: ContractParameter;
    callbackData: RequestCallback<ParameterName.getContractItems>[];
    borrowId: string;
    contractId: string;
    page: '' | 'add' | 'list' | 'sign' | 'lending';
    modalOpen: boolean;
    isLoading: boolean;
    isPageLoading: boolean;
    pageInfo : PageInfo;
}
type FilterType = FilterList<ParameterSummary[ParameterName.getContractItems]>;

export class ContractList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let _obj = getIntervalDate(new Date(), 1),
            _data: ContractParameter = {
                Token: sessionData.getData('Token'),
                Status: props.Status,
                //StartTime: _obj.startTime,
                PageIndex: '1',
                PageSize: '10',
                BorrowerName: '',
                EmployeeId: '',
                //EndTime: _obj.endTime,
                Mobile: ''
            };
        if(!props.Time){
            _data.StartTime = _obj.startTime;
            _data.EndTime = _obj.endTime;
        }
        this.state = {
            data: _data,
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
        this.changePage = load.isLoading.call(this, this.changePage);
        this.selectList =  this.selectListFunction();
        this.search = this.search.bind(this);
    }
    componentDidMount(){
        this.getList();
    }
    getListFail = (e:Callback) =>{
        alert(e.ErrMsg)
    }
    getListSuccess = (e:Callback)=>{
        this.setState({
            isLoading: false,
            isPageLoading: false,
            callbackData: e.Value.PagedList,
            pageInfo : e.Value.PageInfo
        })
    }
    getList(){
        let _option: ReqOption<ParameterName.getContractItems> = {
            data: this.state.data,
            fail: logOut(this.getListFail),
            succeed: this.getListSuccess
        }
        if(this.props.Time){
            req(ParameterName.getOverdueContractItems, _option);
        }else{
            req(ParameterName.getContractItems, _option);
        }
        
    }
    
    changePage(num: number){
        let _data = this.state.data;
        _data.PageIndex = num;
        this.setState({
            data: _data
        }, this.getList)
    }
    selectList:FilterType;
    selectListFunction:()=>FilterType = ()=>{
        let filterSetting: FilterType = [];
        if(!this.props.Time){
            filterSetting.push({
                    name: 'StartTime',
                    text: '开始日',
                    value: this.state.data.StartTime,
                    type: 'date'
                },{
                    name: 'EndTime',
                    text: '结束日',
                    value: this.state.data.EndTime,
                    type: 'date'
            })
        }
        filterSetting.push(
            {
                name: 'BorrowerName',
                text: '借款人',
                value: this.state.data.BorrowerName,
                type: 'input'
            },{
                name: 'Mobile',
                text: '手机号',
                value: this.state.data.Mobile,
                type: 'input'
            }
        );
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
                        value: '8',
                        text:'放款中'
                    },{
                        value: '10',
                        text: '放款失败'
                    },{
                        value: '13',
                        text: '还款失败'
                    },{
                        value: '14',
                        text: '结清中'
                    }
                ]
            })
        }
        if(sessionData.getData('MerchantItem')){
            filterSetting = addMerchantItem(filterSetting, this.state.data.MerchantNo)
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
    modalOperate: ContractModal.ObjectShowModal = {
        showModal: ()=>{}
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
                <div style={{flex:'auto',position:'relative',overflow: 'auto'}}>
                    <PageLoading show={this.state.isPageLoading} />
                    <ContractTable showModal={this.modalOperate.showModal} 
                        parameterData={this.state.data}
                        data={this.state.callbackData} />
                </div>   
            </div>
            <ModalContract getList={()=>this.changePage(1)} contractModal={this.modalOperate} />
        </View>
    }
}

type ContractTableProps = {
    data: any;
    parameterData: any;
    showModal: ContractModal.ObjectShowModal['showModal']
}
class ContractTable extends React.Component<ContractTableProps , any> {
    constructor(props: any){
        super(props);
        this.state = {}
        //console.log(this.props.parameterData);
        if(this.props.parameterData.Status.toString() === '4'){
            this.setting.splice(8, 0, {
                attr: 'OverdueDate',
                head: '逾期天数',
            });
            //console.log(this.setting)
        }
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
                    return '每月'
                }
                case  2 :
                case '2': {
                    return '每周'
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
        format: (data: any)=>{
            let _data: ContractModal.dataState = {
                remark: data.Remark,
                contractId: data.Id
            }
            return <HrefButton style={{width: 'auto'}} 
                onClick={()=>this.props.showModal('remark', _data)}>
                点击查看</HrefButton>
        }
    },{
        attr: 'Remark',
        head: '贷后',
        format: (data: any)=>{
            let _data: ContractModal.dataState = {
                remark: data.Remark,
                contractId: data.Id
            }
            return <HrefButton style={{width: 'auto'}} 
                onClick={()=>this.props.showModal('postLoan', _data)}>
                填写贷后</HrefButton>
        }
    },{
        attr: 'State',
        head: '状态',
        format: (data: any, attr: any) =>{
            switch(data.State.toString()){
                case '1':
                    let _data:ContractModal.dataState = {};
                    _data.borrowId = data.BorrowPersonBaseInfoId;
                    _data.contractId = data.Id;
                    _data.name = data.BorrowerName;
                    _data.cardNo = data.IdCardNo;
                    _data.period = data.Period;
                    _data.serviceMoney = data.ServiceMoney;
                    return <HrefButton style={{width: 'auto'}} onClick={()=>{this.props.showModal('list', _data)}}>等待签约</HrefButton>;
                case '10':
                case '2':
                    let _lending:ContractModal.dataState = {},
                        word = '';
                    _lending.contractId = data.Id;
                    if(data.State === '10'){
                        word = '购买失败，再购买'
                    }else{
                        word = '等待购买'
                    }
                    return (sessionData.getData('UserInfo').RoleId.toString() === '10001' 
                            || sessionData.getData('UserInfo').RoleId.toString() === '10005') ?
                            <HrefButton style={{width: 'auto'}} onClick={()=>{this.props.showModal('lending', _lending)}}>
                                {word}
                            </HrefButton>
                            : word;
                case '3':
                    return '履约中';
                case '4':
                    return '逾期';
                case '5':
                    return '结清';
                case '6':
                    return '取消';
                case '8': 
                    return '购买中';
                case '13' :
                    return '结清失败';
                case '14':
                    return '结清中';
            }
        }
    },{
        attr: 'State',
        head: '操作',
        format: (data: any) =>{
            let _dom = []
            if(data.State.toString() !== '5'){
                _dom.push(<HrefButton key={1}
                    style={{width: 'auto'}} onClick={()=>browserHistory.push('/report', {
                    ApplyId: data.ApplyId,
                    CardNo: data.IdCardNo
                })}>报告</HrefButton>)
            }
            if(data.State.toString() < '3' || data.State.toString() === '10'){
                _dom.push(
                    <HrefButton style={{width: 'auto'}} key={2} onClick={
                        ()=>this.props.showModal('cancel', {contractId: data.Id})
                    }>取消合同</HrefButton>
                )
            }else if(data.State >= 3 && data.State <= 5){
                _dom.push(
                    <HrefButton style={{width: 'auto'}} key={3} onClick={
                        ()=>this.props.showModal('repayment', {contractId: data.Id})
                    }>还款表</HrefButton>
                )
                if(data.State >=3 && data.State < 5 ){
                    _dom.push(
                        <HrefButton style={{width: 'auto'}} key={4} onClick={
                            ()=>this.props.showModal('localSettle', {contractId: data.Id})
                        }>线下结清</HrefButton>,
                        <HrefButton style={{width: 'auto'}} key={5} onClick={
                            ()=>this.props.showModal('onlineSettle', {contractId: data.Id})
                        }>线上结清</HrefButton>
                    )
                } 
            }
            return <div style={{display: 'flex', justifyContent:'space-between'}}>{_dom}</div>
            
        }
    }];
    render(){
        let Tab = Table.CommonTable;

        return <Tab list={this.props.data || []} setting={this.setting} />
    }
}