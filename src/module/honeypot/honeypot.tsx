import * as React from 'react';
import { View } from '../pageModule/view';
import { PrimaryButton, CancelButton } from '../../components/button';
import { ReqOption, req } from '../../components/request';
import { ParameterName, CallbackSummary } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { ApplyModalState } from '../../components/modal/applyModal';


interface Props {
    applyId: string;
    idCardNo: string;
    skip : (str: ApplyModalState['step'], type ?: string)=>void;
    type : string;
    setDataState: (e: CallbackSummary[ParameterName.getBorrowerStatus], status: boolean)=>void;
}

interface State {}

export class Honeypot extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.getHoneyPot = this.getHoneyPot.bind(this);
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
                console.log(e.ErrMsg);
            },
            succeed: ()=>{
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
                        获取蜜罐
                    </PrimaryButton>
                </div>
            </div>
            
        </View>
    }
}