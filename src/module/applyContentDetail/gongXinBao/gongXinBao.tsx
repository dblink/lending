import * as React from 'react';
import { View } from '../../pageModule/view';
import { ReqOption, req } from '../../../components/request';
import { ParameterName } from '../../../components/request/setting';
import { sessionData } from '../../../components/sessionData/sessionData';

interface Props {
    applyId: string;
    idCardNo: string;
}

interface State {
    gxb: string;
}

export class Gongxinbao extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            gxb: ''
        };
    }
    componentDidMount () {
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
                    gxb: e.Value
                })
            }
        }
        req(ParameterName.getGxbToken, _getGXB);
    }
    
    render() {
        let _gxb = `https://prod.gxb.io/v2/auth?token=${this.state.gxb}&returnUrl=http://lotus.hehuadata.com/contract/success&title=电商认证&style=pc`
        return <View>
            {
                this.state.gxb ? <iframe 
                    style={{width: '100%', height: '100%', border: '0'}}
                    src={_gxb}
                >
                </iframe> : ''
            }
        </View>
    }
}