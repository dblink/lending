import * as React from 'react';
import './css/juXinLiReport.css'
import {Table, AbeamTable, SeemTable, SplitTable} from "../../../components/table/commonTable";

export class ReportMainPage extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            data: props.data,
            userData: ''
        };
    }

    componentDidMount(){

    }

    user_info_check_config = [
        {
            attr: 'searched_org_cnt',
            text: '查询过该用户的相关企业数量'
        },
        {
            attr: 'searched_org_type',
            text: '查询过该用户的相关企业类型',
            format(data: any){
                if(data!==''){
                    return data
                }else {
                    return '无'
                }
            }
        },
        {
            attr: 'idcard_with_other_names',
            text: '身份证组合过的其他姓名',
            format(data: any){
                if(data!==''){
                    return data
                }else {
                    return '无'
                }
            }
        },
        {
            attr: 'idcard_with_other_phones',
            text: '身份证组合过其他电话',

        },
        {
            attr: 'phone_with_other_names',
            text: '电话号码组合过其他姓名',

        },
        {
            attr: 'phone_with_other_idcards',
            text: '电话号码组合过其他身份证',

        },
        {
            attr: 'register_org_cnt',
            text: '电话号码注册过的相关企业数量'
        },
        {
            attr: 'register_org_type',
            text: '电话号码注册过的相关企业类型',

        },
        {
            attr: 'arised_open_web',
            text: '电话号码出现过的公开网站',

        }
    ];

    check_black_info_config = [
        {
            attr: 'phone_gray_score',
            text: '用户号码联系黑中介分数（分数范围0-100，参考分为10，分数越低关系越紧密）',
            format(data: any){
                return data<10 ? <span style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</span> : data
            }
        },
        {
            attr: 'contacts_class1_blacklist_cnt',
            text: '直接联系人中黑名单人数',
            format(data: any){
                return data>0 ? <span style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</span> : data
            }
        },
        {
            attr: 'contacts_class2_blacklist_cnt',
            text: '间接联系人中黑名单人数',
            format(data: any){
                return data>0 ? <span style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</span> : data
            }
        },
        {
            attr: 'contacts_class1_cnt',
            text: '直接联系人人数'
        },
        {
            attr: 'contacts_router_cnt',
            text: '引起间接黑名单人数'
        },
        {
            attr: 'contacts_router_ratio',
            text: '直接联系人中引起间接黑名单占比',
            format(data: any){
                return data.toFixed(2)
            }
        }
    ];

    behavior_check_config = [
        {
            attr: 'check_point_cn',
            text: '检查项'
        },
        {
            attr: 'result',
            text: '结果'
        },
        {
            attr: 'evidence',
            text: '依据'
        }
    ];

    cell_behavior_config = [
        {
            attr: 'cell_operator_zh',
            text: '运营商'
        },
        {
            attr: 'cell_phone_num',
            text: '号码'
        },
        {
            attr: 'sms_cnt',
            text: '短信数'
        },
        {
            attr: 'net_flow',
            text: '流量',
            format(value: any){
                return value.net_flow.toFixed(2)
            }
        },
        {
            attr: 'total_amount',
            text: '话费消费',
            format(value: any){
                if (value.total_amount===-1){
                    return '无数据'
                } else {
                    return value.total_amount.toFixed(2)
                }
            }
        },
        {
            attr: 'call_out_time',
            text: '主叫时间',
            format(data: any){
                return data.call_out_time.toFixed(2);
            }
        },
        {
            attr: 'cell_mth',
            text: '月份'
        },
        {
            attr: 'cell_loc',
            text: '归属地'
        },
        {
            attr: 'call_cnt',
            text: '呼叫次数'
        },
        {
            attr: 'call_out_cnt',
            text: '主叫次数'
        },
        {
            attr: 'call_in_time',
            text: '被叫时间',
            format(data: any){
                return data.call_in_time.toFixed(2);
            }
        },
        {
            attr: 'call_in_cnt',
            text: '被叫次数'
        }
    ];

    contact_region_config = [
        {
            attr: 'region_loc',
            text: '地区'
        },
        {
            attr: 'region_uniq_num_cnt',
            text: '号码次数'
        },
        {
            attr: 'region_call_out_cnt',
            text: '呼出次数'
        },
        {
            attr: 'region_call_out_time',
            text: '呼出时间',
            format(data: any){
                return data.region_avg_call_in_time.toFixed(2);
            }
        },
        {
            attr: 'region_call_in_cnt',
            text: '呼入次数'
        },
        {
            attr: 'region_call_in_time',
            text: '呼入时间',
            format(data: any){
                return data.region_call_in_time.toFixed(2);
            }
        },
        {
            attr: 'region_avg_call_in_time',
            text: '平均电话呼入时间',
            format(data: any){
                return data.region_avg_call_in_time.toFixed(2);
            }
        },
        {
            attr: 'region_avg_call_out_time',
            text: '平均电话呼出时间',
            format(data: any){
                return data.region_avg_call_out_time.toFixed(2);
            }
        },
        {
            attr: 'region_call_in_cnt_pct',
            text: '呼入次数百分比',
            format(data: any){
                return data.region_call_in_cnt_pct.toFixed(2);
            }
        },
        {
            attr: 'region_call_in_time_pct',
            text: '呼入时间百分比',
            format(data: any){
                return data.region_call_in_time_pct.toFixed(2);
            }
        },
        {
            attr: 'region_call_out_time_pct',
            text: '呼出时间百分比',
            format(data: any){
                return data.region_call_out_time_pct.toFixed(2);
            }
        },
        {
            attr: 'region_call_out_cnt_pct',
            text: '呼出次数百分比',
            format(data: any){
                return data.region_call_out_cnt_pct.toFixed(2);
            }
        }
    ];

    contact_list_config = [
        {
            attr: 'phone_num',
            text: '地区'
        },
        {
            attr: 'needs_type',
            text: '号码次数'
        },
        {
            attr: 'contact_name',
            text: '互联网标识',
            format(data: any){
                if (data.contact_name==='广告推销') {
                    return <p style={{color: '#cccccc'}}>{data.contact_name}</p>
                } else if (data.contact_name==='未知') {
                    return '未知'
                } else {
                    return <p style={{color: '#3390d2'}}>{data.contact_name}</p>
                }
            }
        },
        {
            attr: 'phone_num_loc',
            text: '平均电话呼入时间'
        },
        {
            attr: 'contact_1m',
            text: '最近一月联系次数'
        },
        {
            attr: 'contact_1w',
            text: '最近一周联系次数'
        },
        {
            attr: 'contact_3m',
            text: '最近三月联系次数'
        },
        {
            attr: 'contact_3m_plus',
            text: '三个月以上联系次数'
        },
        {
            attr: 'contact_early_morning',
            text: '凌晨联系次数'
        }
    ];

    contact_details_config = [
        {
            attr: 'contact_name',
            text: '联系人'
        },
        {
            attr: 'phone_num_&_phone_num_loc',
            text: '联系电话',
            format(data: any){
                return <p><span>{data.contact_details[0].phone_num}</span><span style={{paddingLeft: '8px'}}>{data.contact_details[0].phone_num_loc}</span></p>
            }
        },
        {
            attr: 'begin_date',
            text: '最早出现时间'
        },
        {
            attr: 'end_date',
            text: '最晚出现时间'
        },
        {
            attr: 'sms_cnt_&_call_len',
            text: '近半年通话/短信',
            format(data: any){
                return <p><span>通话{data.contact_details[0].call_len}分钟,</span><span>短信{data.contact_details[0].sms_cnt}条</span></p>
            }
        }
    ];

    deliver_address_config = [
        {
            attr: 'address',
            text: '地址',
            format(data: any){
                return <div>
                    <p>{data.address} <span style={{padding: '0 5px', borderRadius: '4px', backgroundColor: '#666666', color: '#ffffff'}}>{data.predict_addr_type}(推测)</span></p>
                </div>
            }
        },
        {
            attr: 'total_amount',
            text: '总消费额'
        },
        {
            attr: 'name',
            text: '收货人姓名',
            format(data: any){
                return <div>
                    {
                        data.receiver.map((value: any, index: any)=>{
                            return <p style={{textAlign: 'center'}} key={index}>{value.name}</p>
                        })
                    }
                </div>
            }
        },
        {
            attr: 'phone_num_list',
            text: '收货人手机',
            format(data: any){
                return <div>
                    {
                        data.receiver.map((value: any, index: any)=>{
                            return <p style={{textAlign: 'center'}} key={index}>{value.phone_num_list[0]}</p>
                        })
                    }
                </div>
            }
        }
    ];

    contact_list_place_config = [
        {
            attr: 'region_loc',
            text: '地区'
        },
        {
            attr: 'region_uniq_num_cnt',
            text: '号码数量'
        },
        {
            attr: 'region_call_out_cnt',
            text: '呼出次数'
        },
        {
            attr: 'region_call_out_time',
            text: '呼出时间',
            format(data: any){
                return data.region_call_out_time.toFixed(2);
            }
        },
        {
            attr: 'region_call_in_cnt',
            text: '呼入次数'
        },
        {
            attr: 'region_call_in_time',
            text: '呼入时间',
            format(data: any){
                return data.region_call_in_time.toFixed(2);
            }
        }
    ];

    ebusiness_expense_config = [
        {
            attr: 'trans_mth',
            text: '月份'
        },
        {
            attr: 'all_count',
            text: '全部消费笔数'
        },
        {
            attr: 'all_amount',
            text: '全部消费金额（元）'
        },
        {
            attr: 'all_category',
            text: '品类分析',
            format(data: any){
                return data.all_category.map((value: any)=>{
                    return value
                })

            }
        }
    ];

    trip_info_config = [
        {
            attr: 'trip_type',
            text: '时间段'
        },
        {
            attr: 'trip_start_time',
            text: '出发时间'
        },
        {
            attr: 'trip_end_time',
            text: '回程时间'
        },
        {
            attr: 'trip_leave',
            text: '出发地'
        },
        {
            attr: 'trip_dest',
            text: '目的地'
        }
    ];

    render(){
        let Tab = Table.CommonTable;
        // console.log(Object.keys(this.state.data).length);
        return <div style={{margin: 'auto', maxWidth: '1024px',  backgroundColor: '#fefefe', minHeight: '969px'}}>
            {/*title*/}

            {
                this.state.data && Object.keys(this.state.data).length ? <div>{/*NO & TIME*/}
                    <div className='display-flex-center' style={{padding: '40px 0 20px 0'}}>
                        <h1>蜜蜂互联网资信报告</h1>
                    </div>
                    <div className='display-flex' style={{marginBottom: '20px'}}>
                        <div className='display-flex-start flex-1 color-333 font-16'>
                            <p><span style={{marginRight: '8px'}}>报告编号:</span><span>{this.state.data.report.rpt_id}</span></p>
                        </div>
                        {/*<div className='display-flex-end flex-1 color-333 font-16'>*/}
                            {/*<p><span style={{marginRight: '8px'}}>报告时间:</span><span>{this.state.data.update_time}</span></p>*/}
                        {/*</div>*/}
                    </div>
                    {/*用户申请表检测*/}
                    <div className='user-application'>
                        <div className='display-flex-center' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16' style={{fontWeight: 'bold', letterSpacing: '1px'}}>用户申请表检测</p>
                        </div>
                        {
                            this.state.data.application_check && this.state.data.application_check[0] && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                                <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                    姓名
                                </p>
                                <p style={{marginLeft: '18px'}}>{this.state.data.application_check[0].check_points.key_value}</p>
                            </div>
                        }

                        {
                            this.state.data.application_check && this.state.data.application_check[1] 
                                && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee', flexWrap: 'wrap'}}>
                                <div className='flex-3 display-flex-start' style={{width: '100%'}}>
                                    <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                        身份证
                                    </p>
                                    <p style={{marginLeft: '18px'}}>
                                        {this.state.data.application_check[1].check_points.key_value}</p>
                                        {
                                            (this.state.data.application_check[1].check_points.court_blacklist.arised) 
                                            ? <p className='font-12 color-fff' 
                                                style={{padding: '5px 8px', backgroundColor: '#db3951', borderRadius: '4px', marginLeft: '8px'}}>
                                                在法院黑名单
                                            </p> : <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}>
                                                不在法院黑名单
                                            </p>
                                        }
                                        {
                                            (this.state.data.application_check[1].check_points.financial_blacklist.arised)  ? <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#db3951', borderRadius: '4px', marginLeft: '8px'}}>
                                                在金融机构黑名单
                                            </p> : <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}>
                                                不在金融机构黑名单
                                            </p>
                                        }

                                </div>
                                <div className='flex-2 display-flex-start'>
                                    <p>{this.state.data.application_check[1].check_points.gender}</p><p style={{margin: '0 8px'}}>|</p><p>{this.state.data.application_check[1].check_points.age}</p><p style={{margin: '0 8px'}}>|</p><p>{this.state.data.application_check[1].check_points.province + this.state.data.application_check[1].check_points.city + this.state.data.application_check[1].check_points.region}</p>
                                </div>
                            </div>
                        }

                        {
                            this.state.data.application_check && this.state.data.application_check[2] && <div><div className='display-flex-start font-14' style={{padding: '16px 0', flexWrap: 'wrap'}}>
                                <div className='flex-3 display-flex-start'>
                                    <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                        手机号
                                    </p>
                                    <p style={{marginLeft: '18px', color: '#0e9577'}}>{this.state.data.application_check[2].check_points.website}</p>
                                    {
                                        this.state.data.application_check[2].check_points.reliability==='实名认证'?<p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}>
                                            {this.state.data.application_check[2].check_points.reliability}
                                        </p> : <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#db3951', borderRadius: '4px', marginLeft: '8px'}}>
                                            {this.state.data.application_check[2].check_points.reliability}
                                        </p>
                                    }
                                    <p style={{marginLeft: '18px', color: '#0e9577'}}>{this.state.data.application_check[2].check_points.reg_time}</p>
                                </div>
                                <div className='flex-2 display-flex-start'>
                                    <p>{this.state.data.application_check[2].check_points.key_value}</p>
                                    {
                                        (this.state.data.application_check[2].check_points.financial_blacklist.arised && (this.state.data.application_check[2].check_points.financial_blacklist.black_type[1]==='线上信用现金贷' || '线上信用现金贷'))  ? <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#db3951', borderRadius: '4px', marginLeft: '8px'}}>
                                            在金融机构黑名单
                                        </p> : <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}>
                                            不在金融机构黑名单
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className='display-flex-start font-14' style={{padding: '0 0 16px 0', borderBottom: '1px solid #eeeeee', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                            <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                            手机匹配
                            </p>
                            <div>
                            <p style={{marginLeft: '18px', marginBottom: '4px'}}>{this.state.data.application_check[2].check_points.check_name}</p>
                            <p style={{marginLeft: '18px', marginBottom: '4px'}}>{this.state.data.application_check[2].check_points.check_idcard}</p>
                            <p style={{marginLeft: '18px', marginBottom: '4px'}}>{this.state.data.application_check[2].check_points.check_ebusiness}</p>
                            </div>
                            </div>
                            </div>
                        }


                        {
                            this.state.data.application_check && this.state.data.application_check[3] && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                                <div className='flex-3 display-flex-start'>
                                    <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                        居住地址
                                    </p>
                                    <p style={{marginLeft: '18px'}}>{this.state.data.application_check[3].check_points.key_value}</p>
                                </div>
                                <div className='flex-2 display-flex-start' style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                                    <p>{this.state.data.application_check[3].check_points.check_addr}</p>
                                    <p>{this.state.data.application_check[3].check_points.check_ebusiness}</p>
                                </div>
                            </div>
                        }


                        {
                            this.state.data.application_check && this.state.data.application_check[4] && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                                <div className='flex-3 display-flex-start'>
                                    <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                        家庭电话
                                    </p>
                                    <p style={{marginLeft: '18px'}}>{this.state.data.application_check[4].check_points.key_value? this.state.data.application_check[4].check_points.key_value: '无'}</p>
                                </div>
                                <div className='flex-2 display-flex-start'>
                                    <p>{this.state.data.application_check[4].check_points.check_mobile}</p>
                                </div>
                            </div>
                        }

                        {
                            this.state.data.application_check && this.state.data.application_check[5] && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                                <div className='flex-3 display-flex-start'>
                                    <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                        联系人
                                    </p>
                                    <p style={{marginLeft: '18px'}}>{this.state.data.application_check[5].check_points.relationship}</p>
                                    <p style={{margin: '0 8px'}}>|</p>
                                    <p>{this.state.data.application_check[5].check_points.contact_name}</p>
                                    <p style={{margin: '0 8px'}}>|</p>
                                    <p>{this.state.data.application_check[5].check_points.key_value}</p>
                                    {
                                        this.state.data.application_check[5].check_points.check_xiaohao==='该联系人号码非临时小号'?<p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}>
                                            {this.state.data.application_check[5].check_points.check_xiaohao}
                                        </p> :  <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#db3951', borderRadius: '4px', marginLeft: '8px'}}>
                                            {this.state.data.application_check[5].check_points.check_xiaohao}
                                        </p>
                                    }
                                </div>
                                <div className='flex-2 display-flex-start'>
                                    <p>{this.state.data.application_check[5].check_points.check_mobile}</p>
                                </div>
                            </div>
                        }

                        {
                            this.state.data.application_check && this.state.data.application_check[6] && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                                <div className='flex-3 display-flex-start'>
                                    <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                        联系人
                                    </p>
                                    <p style={{marginLeft: '18px'}}>{this.state.data.application_check[6].check_points.relationship}</p>
                                    <p style={{margin: '0 8px'}}>|</p>
                                    <p>{this.state.data.application_check[6].check_points.contact_name}</p>
                                    <p style={{margin: '0 8px'}}>|</p>
                                    <p>{this.state.data.application_check[6].check_points.key_value}</p>
                                    {
                                        this.state.data.application_check[6].check_points.check_xiaohao==='该联系人号码非临时小号'?<p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}>
                                            {this.state.data.application_check[6].check_points.check_xiaohao}
                                        </p> :  <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#db3951', borderRadius: '4px', marginLeft: '8px'}}>
                                            {this.state.data.application_check[6].check_points.check_xiaohao}
                                        </p>
                                    }

                                </div>
                                <div className='flex-2 display-flex-start'>
                                    <p>{this.state.data.application_check[6].check_points.check_mobile}</p>
                                </div>
                            </div>
                        }


                        {
                            this.state.data.application_check && this.state.data.application_check[7] && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                                <div className='flex-3 display-flex-start'>
                                    <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                        京东账号
                                    </p>
                                    <p style={{marginLeft: '18px'}}>{this.state.data.application_check[7].check_points.key_value}</p>
                                    {
                                        this.state.data.application_check[7].check_points.reliability==='实名认证'?<p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}>
                                            {this.state.data.application_check[7].check_points.reliability}
                                        </p>:<p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#db3951', borderRadius: '4px', marginLeft: '8px'}}>
                                            {this.state.data.application_check[7].check_points.reliability}
                                        </p>
                                    }
                                    <p style={{marginLeft: '18px'}}>认证时间：{this.state.data.application_check[7].check_points.reg_time}</p>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='user-application'>
                        <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16'>用户信息检测</p>
                        </div>

                        {
                            this.state.data.user_info_check && <AbeamTable list={this.state.data.user_info_check.check_search_info} setting ={this.user_info_check_config} title={'用户信息检测'} />
                        }
                    </div>

                    <div className='user-application'>
                        <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16'>用户黑名单信息</p>
                        </div>
                        {
                            this.state.data.user_info_check && <AbeamTable list={this.state.data.user_info_check.check_black_info} setting ={this.check_black_info_config} title={'黑名单信息'} />
                        }
                    </div>

                    <div className='user-application'>
                        <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16'>用户行为检测</p>
                        </div>
                        <SeemTable list={this.state.data.behavior_check} setting={this.behavior_check_config} title={'运营商数据'} style={{border: '1px solid #ddd'}}/>
                    </div>

                    运营商数据
                    <div className='user-application'>
                        <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16'>运营商数据</p>
                        </div>
                        {
                            this.state.data.cell_behavior && <SplitTable mainAttr='cell_phone_num' list={this.state.data.cell_behavior[0].behavior} setting={this.cell_behavior_config} title={'运营商数据'} style={{border: '1px solid #ddd'}}/>
                        }
                    </div>

                    <div className='user-application'>
                        <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16'>联系人区域汇总</p>
                        </div>
                        <SeemTable list={this.state.data.contact_region} setting={this.contact_region_config} title={'联系人区域数据'} style={{border: '1px solid #ddd'}}/>
                    </div>

                    <div className='user-application'>
                        <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16'>运营商数据分析</p>
                        </div>
                        <SeemTable list={this.state.data.contact_list} setting={this.contact_list_config} title={'通话数据分析'} style={{border: '1px solid #ddd'}}/>
                    </div>

                    <div className='user-application'>
                        <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16'>联系人信息和地址信息</p>
                        </div>
                        {
                            this.state.data.collection_contact && this.state.data.collection_contact.length ?
                                <div style={{marginBottom: '30px'}}>
                                    {
                                         <SeemTable list={this.state.data.collection_contact} setting={this.contact_details_config} title={'联系人数据(来源于紧急联系人和电商收货人)'} style={{border: '1px solid #ddd'}}/>
                                    }

                                </div>:
                                <div style={{padding: '20px', border: '1px solid #cccccc', textAlign: 'center', marginBottom: '30px'}}>联系人无数据</div>
                        }
                        {
                            this.state.data.deliver_address && this.state.data.deliver_address.length ?
                                <div style={{marginBottom: '30px'}}>
                                    {
                                        <SeemTable list={this.state.data.deliver_address} setting={this.deliver_address_config} title={'地址信息'} style={{border: '1px solid #ddd'}}/>
                                    }

                                </div>:
                                <div style={{padding: '20px', border: '1px solid #cccccc', textAlign: 'center', marginBottom: '30px'}}>地址信息无数据</div>
                        }

                        <div style={{marginBottom: '30px'}}>
                            <SeemTable list={this.state.data.contact_region} setting={this.contact_list_place_config} title={'联系人所在地区分析'} style={{border: '1px solid #ddd'}}/>
                        </div>
                    </div>

                    <div className='user-application'>
                        <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16'>电商数据分析</p>
                        </div>
                        {
                            this.state.data.ebusiness_expense && this.state.data.ebusiness_expense.length ?
                                <SeemTable list={this.state.data.ebusiness_expense} setting={this.ebusiness_expense_config} title={'电商消费记录'} style={{border: '1px solid #ddd'}}/>:
                                <div style={{padding: '20px', border: '1px solid #cccccc', textAlign: 'center'}}>无数据</div>
                        }
                    </div>

                    <div className='user-application'>
                        <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '48px'}}>
                            <p className='color-fff font-16'>出行数据分析</p>
                        </div>
                        {
                            this.state.data.trip_info && this.state.data.trip_info.length ?
                                <SeemTable list={this.state.data.trip_info} setting={this.trip_info_config} title={'出行数据'} style={{border: '1px solid #ddd'}}/>:
                                <div style={{padding: '20px', border: '1px solid #cccccc', textAlign: 'center'}}>无数据</div>
                        }
                    </div>
                    </div>
                    :<div>未拉取到数据</div>
            }

        </div>
    }
}