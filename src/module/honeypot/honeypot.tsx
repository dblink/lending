import * as React from 'react';
import { View } from '../pageModule/view';
import { PrimaryButton, CancelButton } from '../../components/button';
import { ReqOption, req } from '../../components/request';
import { ParameterName, CallbackSummary } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { ApplyModalState } from '../../components/modal/applyModal';
import { load } from '../../components/loading/loading';
import { InnerProgress } from '../../components/progress/progress';


interface Props {
    applyId: string;
    idCardNo: string;
    skip : (str: ApplyModalState['step'], type ?: string)=>void;
    type : string;
    setDataState: (e: CallbackSummary[ParameterName.getBorrowerStatus], status: boolean)=>void;
}

interface State {
    isLoading: boolean;
}

export class Honeypot extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.getHoneyPot = load.run.call(this, this.getHoneyPot);
    }
    getHoneyPot(){
        let _getHoneyPot: ReqOption<ParameterName.getMiGuan>;
        _getHoneyPot = {
            data: {
                ApplyId: this.props.applyId,
                IdCardNo: this.props.idCardNo,
                Token: sessionData.getData('Token')
            },
            fail:(e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
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
    }
    
    render() {
        return <View>
            <div style={{display: 'flex', height: '100%',
                justifyContent: 'center', alignItems: 'center'}}>
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