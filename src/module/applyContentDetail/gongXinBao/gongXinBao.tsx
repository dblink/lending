import * as React from 'react';
import { View } from '../../pageModule/view';
import { ReqOption, req } from '../../../components/request';
import { ParameterName } from '../../../components/request/setting';
import { sessionData } from '../../../components/sessionData/sessionData';
import { load } from '../../../components/loading/loading';
import { PageLoading, InnerProgress } from '../../../components/progress/progress';
import { CancelButton, PrimaryButton } from '../../../components/button';
import { ErrorMessage } from '../../../components/error/errorMessage';

interface Props {
    applyId: string;
    idCardNo: string;
    changePage: any;
    changeState: any;
    type: any;
    state: any;
}

interface State {
    gxb: string;
    pageLoading: boolean;
    isLoading: boolean;
    error: any;
}

export class Gongxinbao extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            gxb: '',
            pageLoading: false,
            isLoading: false,
            error: '',
        };
        this.getGXBToken = load.run.call(this, this.getGXBToken, 'pageLoading');
        this.confirm = load.run.call(this, this.confirm, 'pageLoading');
    }
    componentDidMount () {
        if(this.props.state === '2'){
            this.setState({
                isLoading: true,
                error: <span style={{color: 'orange'}}>支付宝拉去中，请稍等。。。</span>
            }, this.confirm);
        }else{
            this.getGXBToken();
        }
        
    }
    getGXBToken(){
        let _getGXB: ReqOption<ParameterName.getGxbToken>;
        _getGXB = {
            data: {
                ApplyId: this.props.applyId,
                IdCardNo: this.props.idCardNo,
                Token: sessionData.getData('Token')
            },
            fail: (e)=>{
                console.log(e.ErrMsg);
            },
            succeed: (e)=>{
                this.setState({
                    gxb: e.Value,
                    pageLoading: false
                })
            }
        }
        req(ParameterName.getGxbToken, _getGXB);
    }
    confirm(){
        let _getReportState: ReqOption<ParameterName.getReportState>;
        _getReportState = {
            data: {
                ApplyId: this.props.applyId,
                ReportType: '3',
                Token: sessionData.getData('Token')
            },
            fail:(e)=>{
                alert(e.ErrMsg);
            },
            succeed: (e)=>{
                if(e.Value.toString() === '1'){
                    this.setState({
                        pageLoading: false,
                        error: '请获取支付宝信息!'
                    })
                }
                if(e.Value.toString() === '2'){
                    this.setState({
                        pageLoading: true,
                        error: <span style={{color: 'orange'}}>支付宝拉去中，请稍等。。。</span>
                    }, ()=>setTimeout(this.confirm, 3000));
                }
                if(e.Value.toString() === '3'){
                    this.props.changePage('applyList');
                    this.props.changeState(this.props.type, '3');
                }
                if(e.Value.toString() === '4'){
                    this.setState({
                        pageLoading: true,
                        error: <span style={{color: 'red'}}>获取失败，正在为您重新加载。。。</span>
                    }, this.getGXBToken)
                }
            }
        }
        req(ParameterName.getReportState, _getReportState)
    }
    render() {
        let _gxb = `https://prod.gxb.io/v2/auth?token=${this.state.gxb}&returnUrl=http://lotus.hehuadata.com/contract/success&title=电商认证&style=pc`
        return <View>
            <div style={{height: '100%', position:'relative', display: 'flex', flexDirection: 'column'}}>
                <PageLoading show={this.state.pageLoading} >
                    {this.state.error}
                </PageLoading>
                <ErrorMessage>{this.state.error}</ErrorMessage>
                {
                    this.state.gxb ? <iframe 
                        style={{width: '100%', height: '100%', border: '0'}}
                        src={_gxb}
                    >
                    </iframe> : ''
                }
                <div style={{height: '40px',display: 'flex'}}>
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