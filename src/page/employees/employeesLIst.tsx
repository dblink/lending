import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Paging } from '../../components/paging/paging';
import { Table } from '../../components/table/commonTable';
import { ParameterName, Parameter, Callback, PageInfo, CallbackSummary, RequestCallback, ParameterSummary } from '../../components/request/setting';
import { ReqOption, req } from '../../components/request';
import { sessionData } from '../../components/sessionData/sessionData';
import { logOut } from '../../components/fail/logOut';
import { PageLoading } from '../../components/progress/progress';
import { load } from '../../components/loading/loading';
import { PrimaryButton, HrefButton } from '../../components/button';
import { EmployeesModal, EmployeesModalOperate } from '../../components/modal/employeesModal';
import { FilterList, Filter } from '../../module/filter/filter';
import { addMerchantItem } from '../../module/filter/addMerchantItem';

interface Props {}

interface State {
    data: Parameter<ParameterName.getUserAllInfo>;
    callbackData: RequestCallback<ParameterName.getUserAllInfo>[];
    pageInfo: PageInfo;
    isLoading: boolean;
    isPageLoading: boolean;
}

export class EmployeesList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                PageIndex: '1',
                EmpName: '',
                Mobile: '',
                MerchantNo: '',
                Status: '-1',
                StoreId: '',
                PageSize: '10'
            },
            callbackData:[],
            pageInfo: {},
            isLoading: true,
            isPageLoading: false
        };
        this.getEmployeesList = load.run.call(this, this.getEmployeesList, 'isPageLoading');
        this.changePage = load.isLoading.call(this, this.changePage, 'isPageLoading');
        this.search = load.isLoading.call(this, this.search, 'isPageLoading');
    }
    componentDidMount(){
        this.getEmployeesList();
    }
    getEmployeesList(){
        let _getEmployees: ReqOption<ParameterName.getUserAllInfo>;
        _getEmployees = {
            data : this.state.data,
            fail : logOut((e:Callback)=>{
                alert(e.ErrMsg)
            }),
            succeed: (e)=>{
                this.setState({
                    callbackData: e.Value.PagedList,
                    pageInfo: e.Value.PageInfo,
                    isLoading: false,
                    isPageLoading: false,
                })
            }
        };
        req(ParameterName.getUserAllInfo, _getEmployees)
    }
    changePage(num: number){
        let _data = this.state.data;
        //console.log(num);
        _data.PageIndex = num;
        this.setState({
            data: _data
        }, this.getEmployeesList)
    }
    search(data: any){
        //console.log(data);
        let _data = Object.assign({}, this.state.data, data);
        this.setState({
            data: _data
        }, this.getEmployeesList)
    }
    modalOperate:EmployeesModalOperate = {
        closeModal: ()=>{},
        showModal : ()=>{}
    }
    render() {
        return <View>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div style={{width: '100%', marginBottom: '30px', display:' flex',
                    position: 'relative'}}>
                    {
                        !sessionData.getData('MerchantItem')
                            ? <PrimaryButton onClick={()=>{this.modalOperate.showModal('add')}}>添加员工</PrimaryButton> 
                            : ''
                    }
                    <EmployeesFilter data={this.state.data} getList={this.search} />
                    <Paging changePage={this.changePage} lastPage={this.state.pageInfo.PageCount}
                        totalSize={this.state.pageInfo.TotalCount}
                        index={this.state.data.PageIndex}>
                    </Paging>
                    <PageLoading show={this.state.isLoading} hideContent={true} />
                </div>
                <div style={{position: 'relative', flex: 'auto'}}>
                    <PageLoading  show={this.state.isPageLoading}/>
                    <EmployeesTable showModal={this.modalOperate.showModal} data={this.state.callbackData} />
                </div>
            </div>
            <EmployeesModal getList={()=>this.changePage(1)} modalOperate={this.modalOperate} />
        </View>
    }
}
type EmployeesTableProps = {
    data: RequestCallback<ParameterName.getUserAllInfo>[];
    showModal: EmployeesModalOperate['showModal'];
}
class EmployeesTable extends React.Component <EmployeesTableProps, any>{
    setting: {
        head: string;
        attr: CallbackSummary[ParameterName.getUserAllInfo];
        format ?: (data: RequestCallback<ParameterName.getUserAllInfo>) => any;
    }[] = [{
            head: '姓名',
            attr: 'Name',
        }, {
            head: '上级',
            attr: 'Superior',
        }, {
            head: '手机号',
            attr: 'SecureMobile'
        }, {
            head: '职位',
            attr: 'RoleName'
        }, {
            head: '门店',
            attr: 'StoreName'
        }, {
            head: '创建时间',
            attr: 'CreateTime'
        }, {
            head: '状态',
            attr: 'State',
            format: (data)=>{
                switch(data.State){
                    case 0: return <span style={{color: 'red'}}>
                        未激活
                    </span>
                    case 1: return <span style={{color: 'green'}}>
                        正常
                    </span>
                    case 2: return <span style={{color: 'orange'}}>
                        注销
                    </span>
                    case 3: return <span style={{color: 'deepskyblue'}}>
                        冻结
                    </span>
                }
            }
        },
        {
            head: '操作',
            attr: 'State',
            format: (data)=>{
                return <span style={{display: 'flex', justifyContent: 'space-between'}}>
                    <HrefButton style={{width: 'auto'}} onClick={()=>this.props.showModal('edit', {employeeId: data.Id})}>
                        编辑
                    </HrefButton>
                    <HrefButton style={{width: 'auto'}} onClick={()=>this.props.showModal('editPassword', {employeeId: data.Id})}>
                        修改密码
                    </HrefButton>
                </span>
            }
        },
    ];
    render(){
        let Tab = Table.CommonTable;
        return <Tab list={this.props.data} setting={this.setting} />
    }
}

type EmployeesFilterState = {
    data: FilterList<ParameterSummary[ParameterName.getUserAllInfo]>
}

type EmployeesFilterProps = {
    data: Parameter<ParameterName.getUserAllInfo>;
    getList: (data: EmployeesFilterProps['data'])=>void;
}

export class EmployeesFilter extends React.Component<EmployeesFilterProps, EmployeesFilterState> {
    constructor(props: EmployeesFilterProps) {
        super(props);
        let _data: any = [{
            name: 'EmpName',
            text: '员工',
            type: 'input',
            value: this.props.data.EmpName
        },{
            name: 'Mobile',
            text: '手机号',
            type: 'input',
            value: this.props.data.Mobile
        }];
        if(sessionData.getData('MerchantItem')){
            _data = addMerchantItem(_data, this.props.data.MerchantNo)
        }
        this.state = {
            data: _data
        };
    }

    render() {
        return <Filter filter={this.props.getList} filterList={this.state.data}/>
    }
}