import * as React from 'react';
import { Table } from '../../components/table/commonTable';
import { RequestCallback, ParameterName, CallbackSummary, Parameter, PageInfo, Callback } from '../../components/request/setting';
import { HrefButton, PrimaryButton, PagingButton, CancelButton } from '../../components/button';
import { Icon } from '../../components/icon/icon';
import { ReqOption, req } from '../../components/request';
import { ApplyModal } from '../../components/modal/applyModal';
import { Paging } from '../../components/paging/paging';
import { View } from '../../module/pageModule/view';
import { sessionData } from '../../components/sessionData/sessionData';
import { PageLoading, InnerProgress } from '../../components/progress/progress';
import { load } from '../../components/loading/loading';
import { logOut } from '../../components/fail/logOut';
import { SearchInput, CalendarInput } from '../../components/input';
import { SearchSelect } from '../../components/select';
import { FilterList, Filter } from '../../module/filter/filter';
import { getIntervalDate } from '../../components/calendar/dateFunction';

interface Props {
    location:any;
}

interface State {
    callbackData: RequestCallback<ParameterName.getApplyItems>[];
    data : Parameter<ParameterName.getApplyItems>;
    pageInfo ?: PageInfo;
    isLoading : boolean;
    isPageLoading: boolean;
}
class Watcher{
    getData: any;
    setData: any;
}
export class Application extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let _date = new Date(),
            _intervalObj: {endTime: string, startTime: string};
         _intervalObj = getIntervalDate(_date, 1);
        this.state = {
            callbackData: [],
            data: {
                BorrowerName: '',
                EmployeeId: '',
                StartTime: _intervalObj.startTime,
                EndTime: _intervalObj.endTime,
                MerchantNo: '',
                Mobile: '',
                PageIndex: '1',
                PageSize: '10',               
                Status: '-1',
                Token: sessionData.getData('Token')
            },
            pageInfo: {
                PageCount: '',
                PageIndex: '',
                PageSize: 0,
                TotalCount: 0
            },
            isLoading: true,
            isPageLoading: false
        };
        this.setShowModal = this.setShowModal.bind(this);
        this.getList = load.run.call(this, this.getList, 'isPageLoading');
        this.changePage = this.changePage.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.searchList = this.searchListFunc.call(this);
        this.search  = this.search.bind(this);
    }
    searchList: FilterList;
    componentDidMount(){
        this.getList();
    }
    search(data: any){
        if(this.state.isPageLoading){
            return;
        }
        let _data = this.state.data,
            newParameterData,
            searchData = data;
        _data.PageIndex = 1;
        newParameterData = Object.assign({}, _data, searchData);
        this.setState({
            data: newParameterData
        }, this.getList)
    }
    getList(){
        let _options: ReqOption<ParameterName.getApplyItems>;
        _options = {
            data: this.state.data,
            fail: logOut((e:Callback)=>{
                alert(e.ErrMsg);
            }, this.props.location.pathname),
            succeed: (e)=>{
                this.setState({
                    callbackData: e.Value.PagedList,
                    pageInfo: e.Value.PageInfo,
                    isLoading: false,
                    isPageLoading: false
                })
            }
        }
        req(ParameterName.getApplyItems, _options);
    }
    setShowModal(){
        if(this.changeModal.show){
            this.changeModal.show(true);
        }
    }
    changeModal: any = {}
    changePage(num: number){
        if(this.state.isPageLoading){
            return;
        }
        let _data =this.state.data;
        _data.PageIndex = num;
        this.setState({
            data: _data
        }, this.getList)
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        if(this.state.isPageLoading){
            return;
        }
        let value = e.target.value,
            name = e.target.name,
            _data = this.state.data;
        _data[name as 'EmployeeId'] = value;
        this.setState({
            data: _data
        })
    }
    applyStatus = {
        '1': '通过',
        '2': '拒绝',
        '3': '审核中'
    }
    searchListFunc: ()=>FilterList = ()=>[{
        name : 'BorrowerName',
        text : '借款人',
        type : 'input',
        value: this.state.data.BorrowerName
    }, {
        name : 'Status',
        text : '状态',
        type : 'select',
        value: this.state.data.Status,
        list : [
            {
                value: '-1',
                text : '全部'
            },
            {
                value: '1',
                text : '通过'
            },{
                value: '2',
                text : '拒绝'
            },{
                value: '3',
                text : '审核中'
            }]
    }, {
        name : 'StartTime',
        text : '开始日',
        type : 'date',
        value: this.state.data.StartTime
    }, {
        name : 'EndTime',
        text : '结束日',
        type : 'date',
        value: this.state.data.EndTime
    }, {
        name : 'Mobile',
        text : '手机号',
        type : 'input',
        value: this.state.data.Mobile
    }]
    render() {
        return <View>
            <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
                <div style={{position: 'relative',display: 'flex', marginBottom: '30px'}}>
                    <PrimaryButton style={{width: '150px',
                        marginRight: '20px',
                        fontSize: '14px',
                        borderRadius: '0'}} onClick={this.setShowModal}>
                        添加申请
                    </PrimaryButton>
                    <Filter filterList={this.searchList} filter={this.search} />
                    <Paging 
                        lastPage ={this.state.pageInfo.PageCount}
                        totalSize={this.state.pageInfo.TotalCount}
                        changePage={this.changePage}
                        index={this.state.pageInfo.PageIndex}  />
                    <PageLoading show={this.state.isLoading} hideContent={true} />
                </div>
                <div style={{flex:'auto', position: 'relative'}}>
                    <PageLoading show={this.state.isPageLoading} />
                    <ApplicationTable data={this.state.callbackData} />
                </div>
            </div>
            <ApplyModal getList={this.getList} changeModal={this.changeModal} />
        </View>
    }
}

type ApplicationTableProps = {
    data: RequestCallback<ParameterName.getAuditItems>[];
}

class ApplicationTable extends React.Component<ApplicationTableProps, any>{
    setting: {
        attr: CallbackSummary[ParameterName.getApplyItems],
        head: string,
        format ?: (data: any, attr: any)=>void;
    }[] = [{
        attr: 'ApplyTime',
        head: '申请时间'
    },{
        attr: 'BorrowerRealName',
        head: '姓名'
    },{
        attr: 'BorrowerMobile',
        head: '手机号'
    },{
        attr: 'MerchantName',
        head: '商户'
    },{
        attr: 'ApplyMoney',
        head: '申请金额'
    }, {
        attr: 'Period',
        head: '申请期数'
    }, {
        attr: 'AuditMoney',
        head: '审核金额'
    }, {
        attr: 'AuditPeriod',
        head: '审核期数'
    }, {
        attr: 'ConfirmPersonName',
        head: '业务员'
    }, {
        attr: 'Status',
        head: '状态',
        format: (data, attr)=>{
            switch(data[attr]){
                case  1 :
                case '1':{
                    return '通过'
                }
                case  2 :
                case '2': {
                    return '拒绝'
                }
                case  3 :
                case '3': {
                    return '审核中'
                }
            }
        }
    }]
    render(){
        let Tab = Table.CommonTable;
        return <Tab list={this.props.data} setting={this.setting} />
    }
}