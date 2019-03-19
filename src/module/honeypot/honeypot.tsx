import * as React from 'react';
import { View } from '../pageModule/view';
import { PrimaryButton, CancelButton } from '../../components/button';
import { ReqOption, req } from '../../components/request';
import { ParameterName, CallbackSummary, Callback } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { ApplyModalState } from '../../components/modal/applyModal';
import { load } from '../../components/loading/loading';
import { InnerProgress, PageLoading } from '../../components/progress/progress';
import { logOut } from '../../components/fail/logOut';
import { browserHistory } from '../../router';


interface Props {
    applyId: string;
    idCardNo: string;
    skip : (str: ApplyModalState['step'], type ?: string)=>void;
    type : string;
    setDataState: (e: CallbackSummary[ParameterName.getBorrowerStatus], status: boolean)=>void;
}

interface State {
    isLoading: boolean;
    isPageLoading: boolean;
}

export class Honeypot extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
            isPageLoading: false
        };
        this.getHoneyPot = load.run.call(this, this.getHoneyPot);
        this.getState =   load.run.call(this,this.getState.bind(this), 'isPageLoading');
    }
    componentDidMount(){
        this.getState();
    }
    getStateReq:{close: ()=>void};
    getState(){
        let _req: ReqOption<ParameterName.getReportState>;
        _req = {
            data: {
                ApplyId: this.props.applyId,
                ReportType: 1,
                Token: sessionData.getData('Token')
            },
            fail: logOut((e: Callback)=>{
                if(e.Value && e.Value.toString() === '1'){
                    this.setState({
                        isPageLoading: false
                    })
                }else{
                    alert(e.ErrMsg)
                }
            }),
            succeed: (e)=>{
                if(e.Value.toString() === '3'){
                    alert('报告已获取！');
                    this.props.setDataState('HoneypotStatus', true);
                    this.props.skip('applyList');
                }
            }
        }
        this.getStateReq = req(ParameterName.getReportState, _req)
    }
    getHoneyPotReq: {close: ()=>void};
    getHoneyPot(){
        let _getHoneyPot: ReqOption<ParameterName.getMiGuan>;
        _getHoneyPot = {
            data: {
                ApplyId: this.props.applyId,
                IdCardNo: this.props.idCardNo,
                Token: sessionData.getData('Token')
            },
            fail:(e)=>{
                if(e.Value.toString() === '1'){
                    this.setState({
                        isLoading: false,
                    })
                }else{
                    alert(e.ErrMsg);
                }
            },
            succeed: ()=>{
                this.setState({
                    isLoading: false
                })
                this.props.setDataState('HoneypotStatus', true);
                this.props.skip('applyList');
            }
        };
        req(ParameterName.getMiGuan, _getHoneyPot);
    };
    componentWillUnmount(){
        this.getStateReq && this.getStateReq.close();
        this.getHoneyPotReq && this.getHoneyPotReq.close();
    }
    render() {
        return <View>
            <div style={{display: 'flex', height: '100%',
                position: 'relative',
                justifyContent: 'center', alignItems: 'center'}}>
                <PageLoading show={this.state.isPageLoading} />
                <div style={{display: 'inline-flex', height: '40px', width: '100%'}}>
                    <CancelButton onClick={()=>{this.props.skip('applyList')}}>
                        取消
                    </CancelButton>
                    <PrimaryButton onClick={this.getHoneyPot}>
                        {this.state.isLoading ? <InnerProgress height='32px' /> : '获取蜜罐' } 
                    </PrimaryButton>
                </div>
            </div>
            
        </View>
    }
}