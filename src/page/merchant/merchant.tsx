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
import { MerchantModule } from './merchantModule';
type InterfaceName = ParameterName.getMerchantChargeDetail;
const interfaceName =  ParameterName.getMerchantChargeDetail;
type MerchantParameter = Parameter<InterfaceName>;
type MerchantCallback = RequestCallback<InterfaceName>;
type MerchantCallbackSummary = CallbackSummary[InterfaceName];
interface Props {}

interface State {
    data: MerchantParameter;
    callbackData: MerchantCallback[]; 
    isLoading: boolean;
    type: '1' | '2'
}

export class MerchantDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token')
            },
            type: sessionData.getData('UserInfo').ProductType.toString(),
            callbackData: [{},{}],
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
        let callbackData = this.state.callbackData[this.state.type === '1' ? 0 : 1];
        return <View>
            <div style={{display: 'flex'}}>
                <HrefButton
                    style={{fontSize: '20px'}}
                    onClick={()=>{this.setState({type: '1'})}}>
                        双乾
                </HrefButton>
                <HrefButton 
                    style={{fontSize: '20px'}}
                    onClick={()=>{this.setState({type: '2'})}}>汇付</HrefButton>
                <span style={{fontSize: '20px'}}>
                    当前： {this.state.type === '1' ? '双乾' : '汇付'}
                </span>
            </div>
            <div style={{position: 'relative', height: '100%'}}>
                <div style={{color: '#333', fontSize: '20px'}}>
                    {callbackData.MerchantName}
                </div>
                <div style={{color: '#333', fontSize: '14px'}}>
                    商户号：{callbackData.MerchantNo}
                </div>
                <div style={{width: '100%', display: 'flex',
                    marginTop: '50px',
                    flexWrap: 'wrap'}}>
                    <div>
                        <MerchantModule title='提现'>
                            <div className='merchant-items'>
                                <span >提现余额 <HrefButton  style={{display:'inline'}} onClick={()=>this.modal.show('detail')}>明细</HrefButton></span>
                                <span>{callbackData.BalanceAmount}</span>
                            </div>
                            <div className='merchant-items'>
                                <span >冻结提现余额</span>
                                <span>{callbackData.FrozenAmount}</span>
                            </div>
                            {
                               
                                    <div className='merchant-items'>
                                        <PrimaryButton onClick={()=>this.modal.show('bankList', this.state.type) } 
                                            style={{height:'32px'}}>提现</PrimaryButton>
                                        {this.state.type === sessionData.getData('UserInfo').ProductType.toString() 
                                            ? <PrimaryButton onClick={()=>this.modal.show('transform') } 
                                                style={{height:'32px', marginLeft: '20px'}}>余额转债权</PrimaryButton>
                                            : ''
                                        }
                                    </div>
                                
                            }
                            
                        </MerchantModule>
                    </div>
                    {/* 提现 */}
                    <div style={{marginLeft: '30px'}}>
                        <MerchantModule title='查询费用'>
                        <div className='merchant-items'>
                            <span >蜜罐费用</span>
                            <span>{callbackData.Honeypot}</span>
                        </div>
                        <div className='merchant-items'>
                            <span >蜜蜂费用</span>
                            <span>{callbackData.HoneyBee}</span>
                        </div>
                        <div className='merchant-items'>
                            <span >阿里费用</span>
                            <span>{callbackData.Alipay}</span>
                        </div>
                    </MerchantModule>
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex',
                    marginTop: '50px',
                    flexWrap: 'wrap'}}>
                    <MerchantModule title='费率'>
                        <div className='merchant-items'>
                            <span >小贷费率</span>
                            <span>{callbackData.TinyLoanChannelRate}</span>
                        </div>
                        <div className='merchant-items'>
                            <span >划扣费率</span>
                            <span>{callbackData.DeductionChannelRate}</span>
                        </div>
                    </MerchantModule>
                    <div style={{marginLeft: '30px'}}>
                        <MerchantModule title='债权'>
                            <div className='merchant-items'>
                                <span >债权余额</span>
                                <span>{callbackData.LoanBalance}</span>
                            </div>
                            <div className='merchant-items'>
                                <span >冻结债权余额</span>
                                <span>{callbackData.FrozenLoanBalance}</span>
                            </div>
                        </MerchantModule>
                    </div>
                    <div style={{marginLeft: '30px'}}>
                        <MerchantModule title='服务费'>
                            <div className='merchant-items'>
                                <span >服务费余额</span>
                                <span>{callbackData.ServiceCharge}</span>
                            </div>
                            <div className='merchant-items'>
                                <span >冻结服务费余额</span>
                                <span>{callbackData.FrozenServiceCharge}</span>
                            </div>
                        </MerchantModule>
                    </div>
                </div> 

                <PageLoading show={this.state.isLoading} />
            </div>
            <Withdrawal modal={this.modal} getInfo={this.getList} />
        </View>
    }
}