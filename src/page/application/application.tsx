import * as React from 'react';
import { Table } from '../../components/table/commonTable';
import { RequestCallback, ParameterName, CallbackSummary, Parameter, PageInfo } from '../../components/request/setting';
import { HrefButton, PrimaryButton, PagingButton } from '../../components/button';
import { Icon } from '../../components/icon/icon';
import { ReqOption, req } from '../../components/request';
import { ApplyModal } from '../../components/modal/applyModal';
import { Paging } from '../../components/paging/paging';
import { View } from '../../module/pageModule/view';
import { sessionData } from '../../components/sessionData/sessionData';

interface Props {}

interface State {
    callbackData: RequestCallback<ParameterName.getApplyItems>[];
    data : Parameter<ParameterName.getApplyItems>;
    pageInfo ?: PageInfo;
}

export class Application extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            callbackData: [],
            data: {
                BorrowerName: '',
                EmployeeId: '',
                EndTime: '',
                MerchantNo: '',
                Mobile: '',
                PageIndex: '1',
                PageSize: '10',
                StartTime: '',
                Status: '',
                Token: sessionData.getData('Token')
            },
            pageInfo: {
                PageCount: '',
                PageIndex: '',
                PageSize: 0,
                TotalCount: 0
            }
        };
        this.setShowModal = this.setShowModal.bind(this);
        this.getList = this.getList.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount(){
        this.getList();
    }
    getList(){
        let _options: ReqOption<ParameterName.getApplyItems> = {
            data: this.state.data,
            fail: (e)=>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                this.setState({
                    callbackData: e.Value.PagedList,
                    pageInfo: e.Value.PageInfo
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
        let _data =this.state.data;
        _data.PageIndex = num;
        this.setState({
            data: _data
        })
    }
    render() {
        return <View>
            <div style={{height: '40px', display: 'flex', marginBottom: '30px'}}>
                <PrimaryButton style={{width: '150px',
                    marginRight: '20px',
                    fontSize: '14px',
                    borderRadius: '0'}} onClick={this.setShowModal}>
                    添加申请
                </PrimaryButton>
                <div style={{background: '#fff', width: '100%'}}>
                    
                </div>
                <Paging 
                    lastPage ={this.state.pageInfo.PageCount}
                    totalSize={this.state.pageInfo.TotalCount}
                    changePage={this.changePage}
                    index={this.state.pageInfo.PageIndex}  />
            </div>
            <ApplicationTable data={this.state.callbackData} />
            <ApplyModal changeModal={this.changeModal} />
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
        head: '申请金额'
    }, {
        attr: 'AuditPeriod',
        head: '申请期数'
    }, {
        attr: 'ConfirmPersonName',
        head: '业务员'
    }, {
        attr: 'Status',
        head: '状态',
        format: (data, attr)=>{
            console.log(data, attr)
            switch(data[attr]){
                case  1 :
                case '1':{
                    return '同意'
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