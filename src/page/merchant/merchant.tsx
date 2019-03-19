import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Parameter, ParameterName, RequestCallback, CallbackSummary } from '../../components/request/setting';
import { ReqOption, req } from '../../components/request';
import { sessionData } from '../../components/sessionData/sessionData';
import { logOut } from '../../components/fail/logOut';
import { load } from '../../components/loading/loading';
import { PageLoading } from '../../components/progress/progress';
import './merchant.css';
import { PrimaryButton, HrefButton } from '../../components/button';
import { Withdrawal } from '../../components/modal/withdrawal';
type InterfaceName = ParameterName.getMerchantChargeDetail;
const interfaceName =  ParameterName.getMerchantChargeDetail;
type MerchantParameter = Parameter<InterfaceName>;
type MerchantCallback = RequestCallback<InterfaceName>;
type MerchantCallbackSummary = CallbackSummary[InterfaceName];
interface Props {}

interface State {
    data: MerchantParameter;
    callbackData: MerchantCallback; 
    isLoading: boolean;
}

export class MerchantDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token')
            },
            callbackData: {},
            isLoading: false
        };
        this.getList = load.run.call(this, this.getList);
    }
    componentDidMount(){
        this.getList()
    }
    getList(){
        let _req: ReqOption<InterfaceName>;
        _req = {
            data: this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                this.setState({
                    callbackData: e.Value,
                    isLoading: false
                })
            }
        }
        req(interfaceName, _req)
    }
    modal: any = {
        show: {},
    }
    list:{text: string, value: MerchantCallbackSummary}[];
    render() {
        return <View>
            <div style={{position: 'relative'}}>
                <div style={{color: '#333', fontSize: '18px',textAlign: 'center', fontWeight: 'bold'}}>
                    {this.state.callbackData.MerchantName}
                </div>
                <div style={{color: '#333', fontSize: '14px',textAlign: 'center', fontWeight: 'bold'}}>
                    商户号：{this.state.callbackData.MerchantNo}
                </div>
                <div style={{width: '100%', display: 'flex', height: '100%',
                    justifyContent: 'space-between',flexWrap: 'wrap'}}>
                    <div className='merchant-module' >
                        <div className='merchant-items'>
                            <span >小贷费率</span>
                            <span>{this.state.callbackData.TinyLoanChannelRate}</span>
                        </div>
                        <div className='merchant-items'>
                            <span >划扣费率</span>
                            <span>{this.state.callbackData.DeductionChannelRate}</span>
                        </div>
                    </div>
                    <div className='merchant-module'>
                        <div className='merchant-items'>
                            <span >债权余额</span>
                            <span>{this.state.callbackData.LoanBalance}</span>
                        </div>
                        <div className='merchant-items'>
                            <span >冻结债权余额</span>
                            <span>{this.state.callbackData.FrozenLoanBalance}</span>
                        </div>
                    </div>
                    <div className='merchant-module'>
                        <div className='merchant-items'>
                            <span >服务费余额</span>
                            <span>{this.state.callbackData.ServiceCharge}</span>
                        </div>
                        <div className='merchant-items'>
                            <span >冻结服务费余额</span>
                            <span>{this.state.callbackData.FrozenServiceCharge}</span>
                        </div>
                    </div>
                    <div className='merchant-module'>
                        <div className='merchant-items'>
                            <span >提现余额 <HrefButton  style={{display:'inline'}} onClick={()=>this.modal.show('detail')}>明细</HrefButton></span>
                            <span>{this.state.callbackData.BalanceAmount}</span>
                        </div>
                        <div className='merchant-items'>
                            <span >冻结提现余额</span>
                            <span>{this.state.callbackData.FrozenAmount}</span>
                        </div>
                        <div className='merchant-items'>
                            <PrimaryButton onClick={()=>this.modal.show() } style={{height:'32px'}}>提现</PrimaryButton>
                        </div>
                    </div>
                    <div className='merchant-module'>
                        <div className='merchant-items'>
                            <span >蜜罐费用</span>
                            <span>{this.state.callbackData.Honeypot}</span>
                        </div>
                        <div className='merchant-items'>
                            <span >蜜蜂费用</span>
                            <span>{this.state.callbackData.HoneyBee}</span>
                        </div>
                        <div className='merchant-items'>
                            <span >阿里费用</span>
                            <span>{this.state.callbackData.Alipay}</span>
                        </div>
                    </div>
                </div>

                <PageLoading show={this.state.isLoading} />
            </div>
            <Withdrawal modal={this.modal} getInfo={this.getList} />
        </View>
    }
}