import * as React from 'react';
import {config} from "../config";
import {CommonTwoList} from "../commonCol/commonTwoList";
import {CommonLimitList} from "../commonCol/commonLimitList";

export class AlipayReportPage extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            dataAlipay: props.data
        }
    }
    render(){
        return <div className='basic-info-block' style={{paddingBottom: '30px'}}>
            <CommonTwoList config={config.ecReport.ecommerceBaseInfo} data={this.state.dataAlipay.ecommerceBaseInfo} title={'支付宝用户基本信息'}/>
            <CommonLimitList config={config.ecReport.ecommerceTrades} data={this.state.dataAlipay.ecommerceTrades} title={'交易记录'} />
            <CommonLimitList config={config.ecReport.ecommerceConsigneeAddresses} data={this.state.dataAlipay.ecommerceConsigneeAddresses} title={'收货地址'} />
            <CommonLimitList config={config.ecReport.ecommerceBindedBankCards} data={this.state.dataAlipay.ecommerceBindedBankCards} title={'绑卡信息'} />
            <CommonLimitList config={config.ecReport.ecommercePaymentAccounts} data={this.state.dataAlipay.ecommercePaymentAccounts} title={'水电煤缴费账户'} />
            <CommonLimitList config={config.ecReport.taobaoOrders} data={this.state.dataAlipay.taobaoOrders} title={'淘宝订单'} />
            <CommonLimitList config={config.ecReport.alipayBillDetailList} data={this.state.dataAlipay.alipayBillDetailList} title={'支付宝近六个月消费账单'} />
            {/*<CommonTwoList config={config.ecReport.jiebeiInfo} data={this.state.dataAlipay.jiebeiInfo} title={'借呗信息'} />*/}
            <CommonTwoList config={config.ecReport.huabeiInfo} data={this.state.dataAlipay.huabeiInfo} title={'花呗信息'} />
            <CommonLimitList config={config.ecReport.transferBankCards} data={this.state.dataAlipay.transferBankCards} title={'历史转账银行储蓄卡'} />
            {/*<CommonLimitList config={config.ecReport.huabeiBills} data={this.state.dataAlipay.huabeiBills} title={'花呗月账单'} />*/}
            {/*<CommonTwoList config={config.ecReport.myBankBindInfo} data={this.state.dataAlipay.myBankBindInfo} title={'网商贷绑定信息'} />*/}
            {/*<CommonLimitList config={config.ecReport.myBankLoanDetails} data={this.state.dataAlipay.myBankLoanDetails} title={'网商贷近一年借款明细'} />*/}
            {/*<CommonLimitList config={config.ecReport.myBankRepayPlanList} data={this.state.dataAlipay.myBankRepayPlanList} title={'网商贷近一年还款明细'} />*/}
            {/*<CommonLimitList config={config.ecReport.myBankAssetDetails} data={this.state.dataAlipay.myBankAssetDetails} title={'网商贷近三个月资金明细'} />*/}
            {/*<CommonLimitList config={config.ecReport.huabeiConsumeList} data={this.state.dataAlipay.huabeiConsumeList} title={'花呗支付记录'} />*/}
            {/*<CommonLimitList config={config.ecReport.huabeiConsumeList} data={this.state.dataAlipay.soldOrders} title={'卖家淘宝订单'} />*/}
        </div>
    }
}