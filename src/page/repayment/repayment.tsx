import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Table } from '../../components/table/commonTable';
import { RequestCallback, ParameterName, CallbackSummary, Parameter, PageInfo, ParameterSummary } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { PageLoading } from '../../components/progress/progress';
import { ReqOption, req } from '../../components/request';
import { logOut } from '../../components/fail/logOut';
import { Paging } from '../../components/paging/paging';
import { load } from '../../components/loading/loading';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { Filter, FilterList } from '../../module/filter/filter';
import { RepaymentModal, RepaymentModalFunc } from '../../components/modal/repayment';
import { HrefButton, PrimaryButton } from '../../components/button';
import { addMerchantItem } from '../../module/filter/addMerchantItem';

interface Props {
    location ?: any;
    state ?: string;
    time ?: {
        endTime: string;
        startTime: string;
    };
}

interface State {
    data: Parameter<ParameterName.selectRepayPlanDetail>;
    callbackData: RequestCallback<ParameterName.selectRepayPlanDetail>[];
    pageInfo: PageInfo;
    isPageLoading: boolean;
    isLoading: boolean;
}

export class Repayment extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let _date = this.props.time || getIntervalDate(new Date(), 1);
            //_state = this.props.location.state;
        /*if(_state && _state.time){
            _date = {
                endTime:  new Date().toLocaleDateString(),
                startTime: new Date().toLocaleDateString()
            }
        }*/
        this.state = {
            data: {
                BorrowerName: '',
                EmployeeId: '',
                Token: sessionData.getData('Token'),
                EndTime: _date.endTime,
                MerchantNo: '',
                Mobile: '',
                State: this.props.state || '-1',
                PageIndex: '1',
                PageSize: '10',
                StartTime: _date.startTime
            },
            callbackData:[],
            pageInfo:{},
            isPageLoading: false,
            isLoading: true,
        };
        this.getList = load.run.call(this, this.getList, 'isPageLoading');
        this.changePage = load.isLoading.call(this, this.changePage, 'isPageLoading');
        this.search = load.isLoading.call(this, this.search,'isPageLoading')
    }
    componentDidMount(){
        this.getList();
    }
    getList(){
        let _req:ReqOption<ParameterName.selectRepayPlanDetail>;
        _req = {
            data: this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false,
                    isPageLoading: false
                })
            }),
            succeed: (e)=>{
                this.setState({
                    callbackData: e.Value.PagedList,
                    pageInfo: e.Value.PageInfo,
                    isLoading: false,
                    isPageLoading: false
                })
            }
        }
        req(ParameterName.selectRepayPlanDetail, _req);
    }
    changePage(num: number){
        let _data = this.state.data;
        _data.PageIndex = num;
        this.setState({
            data: _data
        },this.getList)
    }
    search(data: Parameter<ParameterName.selectRepayPlanDetail>){
        let _data = Object.assign({}, this.state.data, data);
        _data.PageIndex = 1;
        this.setState({
            data: _data
        }, this.getList)
    }
    modal: RepaymentModalFunc = {
        cancel: ()=>{},
        show: ()=>{}
    }
    render() {
        return <View>
            <div style={{height: '100%', display:'flex',
                flexDirection: 'column', justifyContent: 'space-between',
                }}>
                <div style={{marginBottom: '30px', position: 'relative',
                    display: 'flex', justifyContent: 'space-between',
                    background: '#FFF'}}>
                    {
                        <PrimaryButton style={{width: '200px'}}
                            onClick={()=>{this.modal.show('IsFormRepayAll', {RepayPlanDetailId: this.state.data.EndTime})}}>
                            一键还款
                        </PrimaryButton>
                    }
                   
                    <RepaymentFilter filter={this.search} data={this.state.data} />
                    <Paging changePage={this.changePage}
                            index={this.state.data.PageIndex}
                            lastPage={this.state.pageInfo.PageCount}
                            totalSize={this.state.pageInfo.TotalCount}
                        />
                    <PageLoading show={this.state.isLoading} hideContent={true} />
                </div>
                <div style={{flex: 'auto', position: 'relative', background: '#FFF'}}>
                    <PageLoading show={this.state.isPageLoading} />
                    <RepaymentTable list={this.state.callbackData} showModal={this.modal.show} />
                </div>
            </div>
            <RepaymentModal modal={this.modal} getList={this.getList} />
        </View>
    }
}

type RepaymentTableProps = {
    list: RequestCallback<ParameterName.selectRepayPlanDetail>[];
    showModal: RepaymentModalFunc['show'];
}

class RepaymentTable extends React.Component <RepaymentTableProps, any>{
    constructor(props: RepaymentTableProps){
        super(props);
    }
    setting: {
        head: string;
        attr: CallbackSummary[ParameterName.selectRepayPlanDetail],
        format?: (data: RequestCallback<ParameterName.selectRepayPlanDetail>)=>any;
    }[] = [{
        head: '还款时间',
        attr: 'RepayTime'
    }, {
        head: '还款金额',
        attr: 'RepayMoney'
    }, {
        head: '已还金额',
        attr: 'Money'
    },{
        head: '期数',
        attr: 'Period'
    },{
        head: '借款人',
        attr: 'BorrowerName'
    },{
        head: '借款人手机号',
        attr: 'BorrowerMobile'
    },{
        head: '状态',
        attr: 'State',
        format: (data)=>{
            switch(data.State.toString()){
                case '1': 
                    return <span>待还款</span>
                case '2': return <span>还款中</span>
                case '3': return <span>还款成功</span>
                case '4': return <span>还款失败</span>
                case '5': return <span>逾期</span>
                case '6': return <span>待入账</span>
                case '7': return <span>一键还款处理中</span>
            }
        }
    },{
        head: '操作',
        attr: 'State',
        format: (data)=>{
            if(
                data.State.toString() !== '2'
                && data.State.toString() !== '3'
                && data.State.toString () !== '6'
                && data.State.toString () !== '7' 
                //data.Money < data.RepayMoney || data.State.toString() === '6'
                ){
               return <div style={{display: 'flex', justifyContent: 'space-around'}}>
               <HrefButton style={{width: 'auto'}} onClick={()=>this.props.showModal('online', {RepayPlanDetailId: data.Id})}> 
                    线上
                </HrefButton>
                <HrefButton style={{width: 'auto'}} onClick={()=>this.props.showModal('local', {RepayPlanDetailId: data.Id})}> 
                    线下
                </HrefButton>
            </div>
            }
        }
    }]
    render(){
        let Tab = Table.CommonTable;
        return <Tab list={this.props.list} setting={this.setting} />
    }
}
type RepaymentFilterProps = {
    data: Parameter<ParameterName.selectRepayPlanDetail>;
    filter: (data: Parameter<ParameterName.selectRepayPlanDetail>)=>void;
}
type RepaymentFilterState = {
    data: FilterList<ParameterSummary[ParameterName.selectRepayPlanDetail]>;
}
class RepaymentFilter extends React.Component <RepaymentFilterProps, RepaymentFilterState>{
    constructor(props: any){
        super(props);
        let _data:any = [
            {
                name: 'Mobile',
                type: 'input',
                text: '手机号',
                value: this.props.data.Mobile
            },
            {
                name: 'BorrowerName',
                type: 'input',
                text: '借款人',
                value: this.props.data.BorrowerName
            },
            {
                name: 'StartTime',
                type: 'date',
                text: '开始日',
                value: this.props.data.StartTime
            },
            {
                name: 'EndTime',
                type: 'date',
                text: '结束日',
                value: this.props.data.EndTime
            },{
                name: 'State',
                type: 'select',
                text: '状态',
                value: this.props.data.State,
                list: [{
                    text: '全部',
                    value: '-1'
                },{
                    text: '待还款',
                    value: '1'
                },{
                    text: '还款中',
                    value: '2'
                },{
                    text: '还款成功',
                    value: '3'
                },{
                    text: '还款失败',
                    value: '4'
                },{
                    text: '逾期',
                    value: '5'
                },{
                    text: '待入账',
                    value: '6'
                }]
            }
        ];
        if(sessionData.getData('MerchantItem')){
            _data = addMerchantItem(_data, this.props.data.MerchantNo)
        }
        this.state = {
            data: _data
        }
    }
    render(){
        return <Filter filterList={this.state.data} filter={this.props.filter}  />
    }
}