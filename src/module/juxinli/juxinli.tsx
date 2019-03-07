import * as React from 'react';
import { View } from '../pageModule/view';
import { ReqOption, req } from '../../components/request';
import { ParameterName } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { Progress, PageLoading } from '../../components/progress/progress';
import { CancelButton, PrimaryButton } from '../../components/button';
import { load } from '../../components/loading/loading';
import { ErrorMessage } from '../../components/error/errorMessage';

interface Props {
    applyId: string;
    borrowerId: string;
    idCardNo: string;
    changePage: any;
    changeState: any;
    type : any;
    state: any;
}

interface State {
    data: {
        id_card_num ?: string;
        phone ?: string;
        name ?: string;
        home_address ?: string;
        contacts ?: string;
    },
    url: string;
    isLoading: boolean;
    pageLoading: boolean;
    error: any;
}

export class Juxinli extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {},
            url : '',
            isLoading: false,
            pageLoading: false,
            error: ''
        };
        this.getInfo = load.run.call(this, this.getInfo, 'pageLoading');
        this.confirm = load.run.call(this, this.confirm, 'pageLoading');
        this.getJxl  = this.getJxl.bind(this);
    }
    list = {
        0: '父母',
        1: '配偶',
        2: '朋友',
        3: '亲戚'
    }
    componentDidMount(){
        if(this.props.state === '2'){
            this.confirm();
        }else{
            this.getInfo();
        }
        
    }
    getInfo(){
        let _getBorrowerBaseInfo: ReqOption<ParameterName.getBorrowerBaseInfo>,
            _getBorrowerDetailInfo: ReqOption<ParameterName.getBorrowerDetailInfo>
        _getBorrowerBaseInfo = {
            data: {
                BorrowerId: this.props.borrowerId,
                Token: sessionData.getData('Token')
            },
            fail: (e)=>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                let _value = e.Value;
                let _data = this.state.data;
                _data.home_address = _value.HouseholdAddress;
                _data.id_card_num =_value.IDCardNo;
                _data.phone = _value.Mobile;
                _data.name = _value.RealName;
                this.setState({
                    data: _data
                })
                req(ParameterName.getBorrowerDetailInfo, _getBorrowerDetailInfo);
            }
        }
        _getBorrowerDetailInfo = {
            data: {
                BorrowerId: this.props.borrowerId,
                Token: sessionData.getData('Token')
            },
            fail: (e)=>{
                alert(e.ErrMsg);
            },
            succeed:(e)=>{
                if(e.Value){
                    let relative = e.Value.BorrowerRelation,
                    _data = '',
                    _info = this.state.data;
                    if(relative){
                        let _relative:{
                            contactMobile:string;
                            contactName: string;
                            contactRelation: number;
                        }[] = JSON.parse(relative);
                        let _array:any[] = [];
                        _relative.map((e)=>{
                            _array.push(e.contactName + ':' + this.list[e.contactRelation as 0] + ':' + e.contactMobile);
                        })
                        _data = _array.join(',');
                    }
                    _info.contacts = _data;
                    this.setState({
                        data: _info
                    });
                }
                this.getJxl();
            }
        }
       
        req(ParameterName.getBorrowerBaseInfo, _getBorrowerBaseInfo)
    }
    getJxl(){
        let _getJxlUrl: ReqOption<ParameterName.getJxlUrl>;
        _getJxlUrl = {
            data: {
                ApplyId: this.props.applyId,
                IdCardNo: this.props.idCardNo,
                Token: sessionData.getData('Token')
            },
            fail: (e) =>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                let k :string;
                let arr: any[] = [];
                for(k in this.state.data){
                    arr.push( k +'='+ this.state.data[k as 'phone']);
                }
                this.setState({
                    url: e.Value + '&' + arr.join('&'),
                    pageLoading: false
                })
            }
        }
        req(ParameterName.getJxlUrl, _getJxlUrl);
    }
    confirm(){
        let _option: ReqOption<ParameterName.getReportState> = {
            data: {
                ApplyId: this.props.applyId,
                ReportType: '2',
                Token: sessionData.getData('Token')
            },
            succeed:(e)=>{
                if(e.Value.toString() === '1'){
                    this.setState({
                        error: '请获取蜜蜂',
                        pageLoading: false
                    })
                }else if(e.Value.toString() === '2'){
                    this.setState({
                        error: <span style={{color: 'orange'}}>
                            正在为您拉取蜜蜂， 请稍后。。。
                        </span>
                    }, ()=>setTimeout(this.confirm, 30000))
                }else if(e.Value.toString() === '3'){
                    this.props.changePage('applyList');
                    this.props.changeState(this.props.type, true);
                }else if(e.Value.toString() === '4'){
                    this.setState({
                        error: <span style={{color: 'orange'}}>
                            拉取失败，正在重新加载，请稍后
                        </span>
                    }, this.getInfo)
                }
            },
            fail: (e)=>{
                alert(e.ErrMsg);
            }
        }
        req(ParameterName.getReportState, _option)
    }
    render() {
        return <View>
            <div style={{height: '100%', display: 'flex', position: 'relative', flexDirection: 'column'}}>
                <PageLoading show={this.state.pageLoading} />
                <ErrorMessage >{this.state.error}</ErrorMessage>
                {
                    this.state.url ? <iframe 
                        style={{width:'100%', height: '100%', border:'none'}}
                        src={this.state.url}>
                    </iframe>:<Progress hidden={true}/>
                }
                <div style={{minHeight: '40px', display: 'flex'}}>
                    <CancelButton onClick={()=>this.props.changePage('applyList')}>
                        取消
                    </CancelButton>
                    <PrimaryButton onClick={this.confirm}>
                        确认
                    </PrimaryButton>
                </div>
            </div>
            
        </View>
    }
}