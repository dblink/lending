import * as React from 'react';
import { Table } from '../../components/table/commonTable';
import { ReqOption, req } from '../../components/request';
import { ParameterName, Parameter, Callback, RequestCallback, PageInfo, CallbackSummary } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { logOut } from '../../components/fail/logOut';
import { View } from '../../module/pageModule/view';
import { Paging } from '../../components/paging/paging';
import { PageLoading } from '../../components/progress/progress';
import { load } from '../../components/loading/loading';
import { HrefButton } from '../../components/button';
import { LocalConfirm } from '../../components/modal/localConfirm';

namespace RepayConfirmSpace {
    type InterfaceName = ParameterName.selectRepayDetail;
    const interfaceName = ParameterName.selectRepayDetail;
    type GetListParameter = Parameter<InterfaceName>;
    type InterfaceCallback = RequestCallback<InterfaceName>;
    type InterfaceSummary = CallbackSummary[InterfaceName];
    interface Props {}
    interface State {
        data: GetListParameter;
        callbackData: InterfaceCallback[];
        pageInfo: PageInfo;
        isLoading: boolean;
        isPageLoading: boolean;
    }
    
    export class RepayConfirm extends React.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            let _obj = getIntervalDate(new Date(), 1)
            this.state = {
                data: {
                    Token: sessionData.getData('Token'),
                    StartTime: _obj.startTime,
                    EndTime: _obj.endTime,
                    BorrowerName: '',
                    EmployeeId: '',
                    MerchantNo: '',
                    Mobile: '',
                    PageIndex: '1',
                    PageSize: '10'
                },
                isPageLoading: false,
                callbackData: [],
                pageInfo: {},
                isLoading: true
            };
            this.getList = load.run.call(this, this.getList, 'isPageLoading');
            this.changePage = load.isLoading.call(this, this.changePage);
        }
        componentDidMount(){
            this.getList();
        }
        changePage(num:any){
            let _data = this.state.data;
            _data.PageIndex = num;
            this.setState({
                data: _data
            })
        }
        modal: any = {
            showModal: ()=>{}
        }
        getList(){
            let _req: ReqOption<InterfaceName>;
            _req = {
                data: this.state.data,
                fail: logOut((e)=>{
                    alert(e.ErrMsg);
                }),
                succeed: (e)=>{
                    this.setState({
                        callbackData: e.Value.PagedList,
                        pageInfo: e.Value.PageInfo,
                        isPageLoading: false,
                        isLoading: false
                    })
                }
            }
            req(interfaceName, _req)
        }
        render() {
            return <View>
                <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
                    <div style={{position: 'relative', marginBottom: '30px'}}>
                        <PageLoading show={this.state.isLoading} hideContent={true} />
                        <Paging index={this.state.data.PageIndex} totalSize={this.state.pageInfo.TotalCount}
                            lastPage={this.state.pageInfo.PageCount} changePage={this.changePage} />
                    </div>
                    <div style={{flex: 'auto', position: 'relative'}}>
                        <PageLoading show={this.state.isPageLoading} />
                        <LocalRepayConfirmTable showModal={this.modal.showModal} 
                            data={this.state.callbackData} />
                    </div>
                </div>
                <LocalConfirm getList={this.getList} modal={this.modal} />
            </View>
        }
    }
    type LocalRepayConfirmTableProps = {
        data: InterfaceCallback[];
        showModal: (...props:any)=>void;
    }
    class LocalRepayConfirmTable extends React.Component<LocalRepayConfirmTableProps, any> {
        setting:Table.settingProps<InterfaceSummary, InterfaceCallback> = [
            {
                attr: 'CreateTime',
                head: '还款时间'
            },{
                attr: 'BorrowerName',
                head: '借款人'
            },{
                attr: 'Period',
                head: '期数'
            },{
                attr: 'Type',
                head: '还款类型'
            },{
                attr: 'RepayMoney',
                head: '还款金额'
            },{
                attr: 'Id',
                head: '操作',
                format: (data)=>{
                    let _id = data.Id;
                    if(data.Type.toString() === '2'){
                        return <HrefButton style={{width: 'auto'}} 
                            onClick={()=>this.props.showModal('repay', {id: _id})}>
                            确认还款
                        </HrefButton>
                    }else{
                        return <HrefButton style={{width: 'auto'}} onClick={()=>this.props.showModal('settle', {id: _id})}>
                            确认结清
                        </HrefButton>
                    }
                    
                }
            }]
        render(){
            let Tab = Table.CommonTable;
            return <Tab setting={this.setting} list={this.props.data} />
        }
    }
}
export const LocalRepayConfirm = RepayConfirmSpace.RepayConfirm