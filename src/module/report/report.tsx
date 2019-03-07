import * as React from 'react';

import {CommonTwoList} from "./commonCol/commonTwoList";
import {config} from "./config";
import {CommonLimitList} from "./commonCol/commonLimitList";
import './report.css'
import {AlipayReportPage} from "./alipayReport/alipayReport";
import {MiguanReport} from "./miguanReport/miguanReport";
import {ReportMainPage} from "./juXinLiReport/juXinLiReport";
import { sessionData } from '../../components/sessionData/sessionData';
import { ParameterName } from '../../components/request/setting';
import { ReqOption, req } from '../../components/request';
type ReportProps = {
    ApplyId: string;
    IDCardNo: string;
}

type ReportState = {
    name: string;
    idCard: string;
    [index: string]: any;
}

export class Report extends React.Component<ReportProps, ReportState> {
    constructor(props: ReportProps){
        super(props);
        this.state = {
            ApplyInfoData: '',
            AliInfoData: '',
            MiGuanInfoData: '',
            MiFengInfoData: '',
            name: '',
            idCard: '',
            RelationShip: '',
            IdCardImage: '',
            Remark: '',
            isLoading: false,
            view: false,
            reportState: 'basicReport',
            tabClass1: '',
            tabClass2: '',
            tabClass3: '',
            tabClass4: '',
            tabClass5: '',
            tabClass6: '',
            tabClass7: ''
        };
        this.progressView = this.progressView.bind(this);
        this.progressOff = this.progressOff.bind(this);
        this.showBasicReport = this.showBasicReport.bind(this);
        this.showPhoneReport = this.showPhoneReport.bind(this);
        this.showAlipayReport = this.showAlipayReport.bind(this);
        this.showWechatReport = this.showWechatReport.bind(this);
        this.showJXLReport = this.showJXLReport.bind(this);
        this.showMiGuanReport = this.showMiGuanReport.bind(this);
        this.showIdCardReport = this.showIdCardReport.bind(this);
    }

    componentDidMount() {
        this.progressView();
        let _options: ReqOption<ParameterName.getMongoApplyInfoData> = {
            data: {
                ApplyId: this.props.ApplyId,
                Token: sessionData.getData('Token'),
            },
            fail: (data)=>{
                alert(data.ErrMsg);
            },
            succeed: (data: any)=>{
                let _relationShip = JSON.parse(data.Value.BorrowerRelation);
                let _otherInfo = JSON.parse(data.Value.Remark);
                this.setState({
                    ApplyInfoData: data.Value,
                    RelationShip: _relationShip,
                    Remark: _otherInfo,
                    view: true,
                    tabClass1: 'tab-on',
                },()=>console.log(this.state.Remark))
            }
        };
        req(ParameterName.getMongoApplyInfoData, _options);
    }

    progressView(){
        this.setState({
            isLoading: true
        })
    }

    progressOff(){
        this.setState({
            isLoading: false
        })
    }

    showBasicReport(){
        if (this.state.ApplyInfoData === ''){
            let _options: ReqOption<ParameterName.getMongoApplyInfoData> = {
                data: {
                    ApplyId: this.props.ApplyId,
                    Token: sessionData.getData('Token'),
                },
                fail: (data)=>{
                    alert(data.ErrMsg);
                },
                succeed: (data: any)=>{
                    let _relationShip = JSON.parse(data.Value.BorrowerRelation);
                    let _otherInfo = JSON.parse(data.Value.Remark);
                    this.setState({
                        ApplyInfoData: data.Value,
                        RelationShip: _relationShip,
                        Remark: _otherInfo,
                        reportState: 'basicReport',
                        tabClass1: 'tab-on',
                        tabClass2: '',
                        tabClass3: '',
                        tabClass4: '',
                        tabClass5: '',
                        tabClass6: '',
                        tabClass7: '',
                        tabClassIn: {}
                    },()=>console.log(this.state.Remark))
                }
            };
            req(ParameterName.getMongoApplyInfoData, _options);
        } else {
            this.setState({
                reportState: 'basicReport',
                tabClass1: 'tab-on',
                tabClass2: '',
                tabClass3: '',
                tabClass4: '',
                tabClass5: '',
                tabClass6: '',
                tabClass7: '',
                tabClassIn: {}
            },()=>console.log(this.state.ApplyInfoData))
        }

    }

    showPhoneReport(){
        this.setState({
            reportState: 'phoneReport',
            tabClass1: '',
            tabClass2: 'tab-on',
            tabClass3: '',
            tabClass4: '',
            tabClass5: '',
            tabClass6: '',
            tabClass7: '',
            tabClassIn: {}
        })
    }

    showAlipayReport(){
        if (this.state.AliInfoData === ''){
            let _options: ReqOption<ParameterName.getReportInfo> = {
                data: {
                    ApplyId: this.props.ApplyId,
                    ReportType: 3,
                    Token: sessionData.getData('Token'),
                },
                fail: (data)=>{
                    alert(data.ErrMsg);
                },
                succeed: (data: any)=>{
                    this.setState({
                        AliInfoData: data.baseInfo,
                        reportState: 'alipayReport',
                        tabClass1: '',
                        tabClass2: '',
                        tabClass3: 'tab-on',
                        tabClass4: '',
                        tabClass5: '',
                        tabClass6: '',
                        tabClass7: '',
                        tabClassIn: {}
                    },()=>console.log(data))
                }
            };
            req(ParameterName.getReportInfo, _options);
        }else {
            this.setState({
                reportState: 'alipayReport',
                tabClass1: '',
                tabClass2: '',
                tabClass3: 'tab-on',
                tabClass4: '',
                tabClass5: '',
                tabClass6: '',
                tabClass7: '',
                tabClassIn: {}
            },()=>console.log(this.state.AliInfoData))
        }

    }

    showWechatReport(){
        this.setState({
            reportState: 'wechatReport',
            tabClass1: '',
            tabClass2: '',
            tabClass3: '',
            tabClass4: 'tab-on',
            tabClass5: '',
            tabClass6: '',
            tabClass7: '',
            tabClassIn: {}
        })
    }


    showJXLReport(){
        if (this.state.MiFengInfoData === ''){
            let _options: ReqOption<ParameterName.getReportInfo> = {
                data: {
                    ApplyId: this.props.ApplyId,
                    ReportType: 2,
                    Token: sessionData.getData('Token'),
                },
                fail: (data)=>{
                    alert(data.ErrMsg);
                },
                succeed: (data: any)=>{
                    this.setState({
                        MiFengInfoData: data.basic_version,
                        reportState: 'JXLReport',
                        tabClass1: '',
                        tabClass2: '',
                        tabClass3: '',
                        tabClass4: '',
                        tabClass5: 'tab-on',
                        tabClass6: '',
                        tabClass7: '',
                        tabClassIn: {}
                    },()=>console.log(data))
                }
            };
            req(ParameterName.getReportInfo, _options);
        } else {
            this.setState({
                reportState: 'JXLReport',
                tabClass1: '',
                tabClass2: '',
                tabClass3: '',
                tabClass4: '',
                tabClass5: 'tab-on',
                tabClass6: '',
                tabClass7: '',
                tabClassIn: {}
            },()=>console.log(this.state.MiFengInfoData))
        }

    }

    showMiGuanReport(){
        if (this.state.MiGuanInfoData === ''){
            let _options: ReqOption<ParameterName.getReportInfo> = {
                data: {
                    ApplyId: this.props.ApplyId,
                    ReportType: 1,
                    Token: sessionData.getData('Token'),
                },
                fail: (data)=>{
                    alert(data.ErrMsg);
                },
                succeed: (data: any)=>{
                    this.setState({
                        MiGuanInfoData: data,
                        reportState: 'MiGuanReport',
                        tabClass1: '',
                        tabClass2: '',
                        tabClass3: '',
                        tabClass4: '',
                        tabClass5: '',
                        tabClass6: 'tab-on',
                        tabClass7: '',
                        tabClassIn: {}
                    },()=>console.log(data))
                }
            };
            req(ParameterName.getReportInfo, _options);
        } else {
            this.setState({
                reportState: 'MiGuanReport',
                tabClass1: '',
                tabClass2: '',
                tabClass3: '',
                tabClass4: '',
                tabClass5: '',
                tabClass6: 'tab-on',
                tabClass7: '',
                tabClassIn: {}
            },()=>console.log(this.state.MiGuanInfoData))
        }

    }

    showIdCardReport(){
        if (this.state.IdCardImage === ''){
            let _options: ReqOption<ParameterName.selectBorrowerImage> = {
                data: {
                    IDCardNo: this.props.IDCardNo,
                    Token: sessionData.getData('Token'),
                },
                fail: (data)=>{
                    alert(data.ErrMsg);
                },
                succeed: (data: any)=>{
                    this.setState({
                        IdCardImage: data.Value,
                        reportState: 'IdCardReport',
                        tabClass1: '',
                        tabClass2: '',
                        tabClass3: '',
                        tabClass4: '',
                        tabClass5: '',
                        tabClass6: '',
                        tabClass7: 'tab-on',
                        tabClassIn: {}
                    },()=>console.log(this.state.IdCardImage))
                }
            };
            req(ParameterName.selectBorrowerImage, _options);
        } else {
            this.setState({
                reportState: 'IdCardReport',
                tabClass1: '',
                tabClass2: '',
                tabClass3: '',
                tabClass4: '',
                tabClass5: '',
                tabClass6: '',
                tabClass7: 'tab-on',
                tabClassIn: {}
            },()=>console.log(this.state.IdCardImage))
        }

    }

    render() {
        let _height = window.innerHeight;
        return <div style={{overflow: 'auto', width: '100%', position: 'relative'}}>
            {/*<ProgressBar isLoading={this.state.isLoading}/>*/}
            {
                this.state.view &&
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        <div style={{width: '100%'}}>
                            <div>
                                {/*<FixBasicInfo data={this.state.dataBasic} />*/}
                                <ul className='report-tab'>
                                    <li onClick={this.showBasicReport} className={this.state.tabClass1}>
                                        基本信息
                                    </li>
                                    {/*<li onClick={this.showPhoneReport} className={this.state.tabClass2}>*/}
                                        {/*公信宝信息*/}
                                    {/*</li>*/}
                                    <li onClick={this.showMiGuanReport} className={this.state.tabClass6}>
                                        蜜罐报告信息
                                    </li>
                                    <li onClick={this.showJXLReport} className={this.state.tabClass5}>
                                        蜜蜂报告信息
                                    </li>
                                    <li onClick={this.showAlipayReport} className={this.state.tabClass3}>
                                        支付宝信息
                                    </li>
                                    {/*<li onClick={this.showWechatReport} className={this.state.tabClass4}>*/}
                                        {/*微信信息*/}
                                    {/*</li>*/}
                                    <li onClick={this.showIdCardReport} className={this.state.tabClass7}>
                                        身份证信息
                                    </li>
                                </ul>
                            </div>
                            <div style={{height: (_height-98 + 'px'), overflow: 'auto'}}>
                                {
                                    this.state.reportState==='basicReport' &&
                                    <div className='basic-info-block' style={{paddingBottom: '30px'}}>
                                        <CommonTwoList config={config.reportBasicInfo} data={this.state.ApplyInfoData} title={'基础信息'}/>
                                        <CommonLimitList config={config.reportRelationInfo} data={this.state.RelationShip} title={'联系人信息'} />
                                        <CommonLimitList config={{remark: '备注'}} data={this.state.Remark} title={'其他信息'} />
                                    </div>
                                }
                                {/*{*/}
                                    {/*this.state.reportState==='phoneReport' && (this.state.dataPhone ?*/}
                                    {/*<PhoneReportPage data={this.state.dataPhone} />:<div>未拉取到数据</div>)*/}
                                {/*}*/}
                                {
                                    this.state.reportState==='JXLReport' && (this.state.MiFengInfoData ?
                                        <ReportMainPage data={this.state.MiFengInfoData} />:<div>未拉取到数据</div>)
                                }
                                {
                                    this.state.reportState==='MiGuanReport' && (this.state.MiGuanInfoData ?
                                        <MiguanReport data={this.state.MiGuanInfoData} />:<div>未拉取到数据</div>)
                                }
                                {
                                    this.state.reportState==='alipayReport' && (this.state.AliInfoData ?
                                    <AlipayReportPage data={this.state.AliInfoData} />:<div>未拉取到数据</div>)
                                }
                                {/*{*/}
                                    {/*this.state.reportState==='wechatReport' && (this.state.dataWeChat ?*/}
                                    {/*<WechatReportPage data={this.state.dataWeChat} />:<div>未拉取到数据</div>)*/}
                                {/*}*/}
                                {
                                    this.state.reportState==='IdCardReport' && (this.state.IdCardImage.length ?
                                        <div>
                                            {
                                                this.state.IdCardImage.map((value: any, index: any)=>{
                                                    return <img key={index} src={this.state.IdCardImage[index]} width={'50%'} style={{display: 'block', margin: 'auto'}} />
                                                })
                                            }
                                        </div>:<div>未获取到身份证</div>)
                                }
                                {/*{*/}
                                    {/*this.state.dataJXL ? this.state.reportState==='phoneReport' && this.state.dataJXL &&*/}
                                        {/*<ReportMainPage data={this.state.dataJXL} /> :*/}
                                        {/*(this.state.reportState==='phoneReport' && (this.state.dataPhone ? <PhoneReportPage data={this.state.dataPhone} />:<div>未拉取到数据</div>))*/}
                                {/*}*/}
                            </div>
                        </div>
                    </div>

            }
        </div>
    }
}

export class ReportPage extends React.Component{
    render(){
        return <div>
            <Report ApplyId={'4736859888097349506'} IDCardNo={'32050219940714001X'} />
        </div>
    }

}
