import * as React from 'react';

export const user_info_check_config = [
    {
        attr: 'searched_org_cnt',
        head: '查询过该用户的相关企业数量'
    },
    {
        attr: 'searched_org_type',
        head: '查询过该用户的相关企业类型',
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
        head: '身份证组合过的其他姓名',
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
        head: '身份证组合过其他电话',

    },
    {
        attr: 'phone_with_other_names',
        head: '电话号码组合过其他姓名',

    },
    {
        attr: 'phone_with_other_idcards',
        head: '电话号码组合过其他身份证',

    },
    {
        attr: 'register_org_cnt',
        head: '电话号码注册过的相关企业数量'
    },
    {
        attr: 'register_org_type',
        head: '电话号码注册过的相关企业类型',

    },
    {
        attr: 'arised_open_web',
        head: '电话号码出现过的公开网站',

    }
];

export const check_black_info_config = [
    {
        attr: 'phone_gray_score',
        head: '用户号码联系黑中介分数（分数范围0-100，参考分为10，分数越低关系越紧密）',
        format(data: any){
            return data<10 ? <span style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</span> : data
        }
    },
    {
        attr: 'contacts_class1_blacklist_cnt',
        head: '直接联系人中黑名单人数',
        format(data: any){
            return data>0 ? <span style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</span> : data
        }
    },
    {
        attr: 'contacts_class2_blacklist_cnt',
        head: '间接联系人中黑名单人数',
        format(data: any){
            return data>0 ? <span style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</span> : data
        }
    },
    {
        attr: 'contacts_class1_cnt',
        head: '直接联系人人数'
    },
    {
        attr: 'contacts_router_cnt',
        head: '引起间接黑名单人数'
    },
    {
        attr: 'contacts_router_ratio',
        head: '直接联系人中引起间接黑名单占比',
        format(data: any){
            return data.toFixed(2)
        }
    }
];

export const behavior_check_config = [
    {
        attr: 'check_point_cn',
        head: '检查项'
    },
    {
        attr: 'result',
        head: '结果'
    },
    {
        attr: 'evidence',
        head: '依据'
    }
];

export const cell_behavior_config = [
    {
        attr: 'cell_operator_zh',
        head: '运营商'
    },
    {
        attr: 'cell_phone_num',
        head: '号码'
    },
    {
        attr: 'sms_cnt',
        head: '短信数'
    },
    {
        attr: 'net_flow',
        head: '流量',
        format(value: any){
            return value.net_flow.toFixed(2)
        }
    },
    {
        attr: 'total_amount',
        head: '话费消费',
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
        head: '主叫时间',
        format(data: any){
            return data.call_out_time.toFixed(2);
        }
    },
    {
        attr: 'cell_mth',
        head: '月份'
    },
    {
        attr: 'cell_loc',
        head: '归属地'
    },
    {
        attr: 'call_cnt',
        head: '呼叫次数'
    },
    {
        attr: 'call_out_cnt',
        head: '主叫次数'
    },
    {
        attr: 'call_in_time',
        head: '被叫时间',
        format(data: any){
            return data.call_in_time.toFixed(2);
        }
    },
    {
        attr: 'call_in_cnt',
        head: '被叫次数'
    }
];

export const contact_region_config = [
    {
        attr: 'region_loc',
        head: '地区'
    },
    {
        attr: 'region_uniq_num_cnt',
        head: '号码次数'
    },
    {
        attr: 'region_call_out_cnt',
        head: '呼出次数'
    },
    {
        attr: 'region_call_out_time',
        head: '呼出时间',
        format(data: any){
            return data.region_avg_call_in_time.toFixed(2);
        }
    },
    {
        attr: 'region_call_in_cnt',
        head: '呼入次数'
    },
    {
        attr: 'region_call_in_time',
        head: '呼入时间',
        format(data: any){
            return data.region_call_in_time.toFixed(2);
        }
    },
    {
        attr: 'region_avg_call_in_time',
        head: '平均电话呼入时间',
        format(data: any){
            return data.region_avg_call_in_time.toFixed(2);
        }
    },
    {
        attr: 'region_avg_call_out_time',
        head: '平均电话呼出时间',
        format(data: any){
            return data.region_avg_call_out_time.toFixed(2);
        }
    },
    {
        attr: 'region_call_in_cnt_pct',
        head: '呼入次数百分比',
        format(data: any){
            return data.region_call_in_cnt_pct.toFixed(2);
        }
    },
    {
        attr: 'region_call_in_time_pct',
        head: '呼入时间百分比',
        format(data: any){
            return data.region_call_in_time_pct.toFixed(2);
        }
    },
    {
        attr: 'region_call_out_time_pct',
        head: '呼出时间百分比',
        format(data: any){
            return data.region_call_out_time_pct.toFixed(2);
        }
    },
    {
        attr: 'region_call_out_cnt_pct',
        head: '呼出次数百分比',
        format(data: any){
            return data.region_call_out_cnt_pct.toFixed(2);
        }
    }
];

export const contact_list_config = [
    {
        attr: 'phone_num',
        head: '地区'
    },
    {
        attr: 'needs_type',
        head: '号码次数'
    },
    {
        attr: 'contact_name',
        head: '互联网标识',
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
        head: '平均电话呼入时间'
    },
    {
        attr: 'contact_1m',
        head: '最近一月联系次数'
    },
    {
        attr: 'contact_1w',
        head: '最近一周联系次数'
    },
    {
        attr: 'contact_3m',
        head: '最近三月联系次数'
    },
    {
        attr: 'contact_3m_plus',
        head: '三个月以上联系次数'
    },
    {
        attr: 'contact_early_morning',
        head: '凌晨联系次数'
    }
];

export const contact_details_config = [
    {
        attr: 'contact_name',
        head: '联系人'
    },
    {
        attr: 'phone_num_&_phone_num_loc',
        head: '联系电话',
        format(data: any){
            return <p><span>{data.contact_details[0].phone_num}</span><span style={{paddingLeft: '8px'}}>{data.contact_details[0].phone_num_loc}</span></p>
        }
    },
    {
        attr: 'begin_date',
        head: '最早出现时间'
    },
    {
        attr: 'end_date',
        head: '最晚出现时间'
    },
    {
        attr: 'sms_cnt_&_call_len',
        head: '近半年通话/短信',
        format(data: any){
            return <p><span>通话{data.contact_details[0].call_len}分钟,</span><span>短信{data.contact_details[0].sms_cnt}条</span></p>
        }
    }
];

export const deliver_address_config = [
    {
        attr: 'address',
        head: '地址',
        format(data: any){
            return <div>
                <p>{data.address} <span style={{padding: '0 5px', borderRadius: '4px', backgroundColor: '#666666', color: '#ffffff'}}>{data.predict_addr_type}(推测)</span></p>
            </div>
        }
    },
    {
        attr: 'total_amount',
        head: '总消费额'
    },
    {
        attr: 'name',
        head: '收货人姓名',
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
        head: '收货人手机',
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

export const contact_list_place_config = [
    {
        attr: 'region_loc',
        head: '地区'
    },
    {
        attr: 'region_uniq_num_cnt',
        head: '号码数量'
    },
    {
        attr: 'region_call_out_cnt',
        head: '呼出次数'
    },
    {
        attr: 'region_call_out_time',
        head: '呼出时间',
        format(data: any){
            return data.region_call_out_time.toFixed(2);
        }
    },
    {
        attr: 'region_call_in_cnt',
        head: '呼入次数'
    },
    {
        attr: 'region_call_in_time',
        head: '呼入时间',
        format(data: any){
            return data.region_call_in_time.toFixed(2);
        }
    }
];

export const ebusiness_expense_config = [
    {
        attr: 'trans_mth',
        head: '月份'
    },
    {
        attr: 'all_count',
        head: '全部消费笔数'
    },
    {
        attr: 'all_amount',
        head: '全部消费金额（元）'
    },
    {
        attr: 'all_category',
        head: '品类分析',
        format(data: any){
            return data.all_category.map((value: any)=>{
                return value
            })

        }
    }
];

export const trip_info_config = [
    {
        attr: 'trip_type',
        head: '时间段'
    },
    {
        attr: 'trip_start_time',
        head: '出发时间'
    },
    {
        attr: 'trip_end_time',
        head: '回程时间'
    },
    {
        attr: 'trip_leave',
        head: '出发地'
    },
    {
        attr: 'trip_dest',
        head: '目的地'
    }
];