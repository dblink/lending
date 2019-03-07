//基本信息
import * as React from 'react';

export const user_basic_config = [
    {
        attr: 'user_idcard',
        text: '身份证号码'
    },
    {
        attr: 'user_phone',
        text: '手机号码'
    },
    {
        attr: 'user_idcard_valid',
        text: '身份证是否有效',
        format(data: any){
            return data ? '是' : '否'
        }
    },
    {
        attr: 'user_phone_province',
        text: '手机号归属地:省份'
    },
    {
        attr: 'user_city',
        text: '用户出生地:城市'
    },
    {
        attr: 'user_phone_city',
        text: '手机号归属地:城市'
    },
    {
        attr: 'user_region',
        text: '手机号归属地:城市'
    },
    {
        attr: 'user_phone_operator',
        text: '运营商类别'
    },
    {
        attr: 'user_age',
        text: '年龄'
    },
    {
        attr: 'user_gender',
        text: '性别'
    },
    {
        attr: 'user_province',
        text: '用户出生地:省份'
    },
    {
        attr: 'user_name',
        text: '姓名'
    }
];

//用户手机号借条信息
export const iou_statistic_config = [
    {
        attr: 'total_loan_times',
        text: '借条借贷总次数'
    },
    {
        attr: 'total_loan_amount',
        text: '借条借贷总金额'
    },
    {
        attr: 'recent_iou_status',
        text: '借条最近状态'
    },
    {
        attr: 'recent_loan_time',
        text: '最近一次借入日期'
    },
    {
        attr: 'recent_pay_back_time',
        text: '最近一次应还款日期'
    },
    {
        attr: 'in_repayment_times',
        text: '还款中借款笔数'
    },
    {
        attr: 'in_repayment_amount',
        text: '还款中本金总额'
    },
    {
        attr: 'in_repayment_interest',
        text: '还款中利息总额'
    },
    {
        attr: 'overdue_payment_times',
        text: '逾期已还借款笔数'
    },
    {
        attr: 'overdue_payment_amount',
        text: '逾期已还本金总额'
    },
    {
        attr: 'overdue_payment_interest',
        text: '逾期已还利息总额'
    },
    {
        attr: 'overdue_times',
        text: '逾期借款笔数'
    },
    {
        attr: 'overdue_amount',
        text: '逾期本金总额'
    },
    {
        attr: 'overdue_interest',
        text: '逾期利息总额'
    },
    {
        attr: 'd360_iou_platform_cnt',
        text: '借条平台数_360天'
    },
    {
        attr: 'd90_iou_platform_cnt',
        text: '借条平台数_90天'
    },
    {
        attr: 'd30_iou_platform_cnt',
        text: '借条平台数_30天'
    },
    {
        attr: 'd360_iou_query_times',
        text: '借条查询次数_360天'
    },
    {
        attr: 'd90_iou_query_times',
        text: '借条查询次数_90天'
    },
    {
        attr: 'd30_iou_query_times',
        text: '借条查询次数_30天'
    }
];

//用户灰度分数信息
export const user_gray_config = [
    {
        attr: 'user_phone',
        text: '手机号码'
    },
    {
        attr: 'phone_gray_score',
        text: '灰度分，基于社交网络的综合风险评估，取值(0,100)',
        format(data: any){
            return data<10 ? <div style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff'}}>{data}</div> : {data}
        }
    },
    {
        attr: 'has_report',
        text: '是否种子号，即是否成功产生过蜜蜂报告，1或0',
        format(data: any){
            return data ? '是' : '否'
        }
    },
    {
        attr: 'social_liveness',
        text: '社交活跃度'
    },
    {
        attr: 'social_influence',
        text: '社交影响力'
    }
];

//联系人数信息
export const contacts_number_statistic_config = [
    {
        attr: 'cnt_to_all',
        text: '主动联系人数'
    },
    {
        attr: 'cnt_be_all',
        text: '被动联系人数'
    },
    {
        attr: 'cnt_all',
        text: '一阶联系人总数，前两项合并去重'
    },
    {
        attr: 'cnt_router',
        text: '引起黑名单的一阶联系人数（一阶联系人中与黑号有联系的人数）'
    },
    {
        attr: 'router_ratio',
        text: '引起黑名单的一阶联系人占比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'cnt_to_black',
        text: '主动联系的黑号数',
        format(data: any){

            return data>0 ? <div style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</div> : data
        }
    },
    {
        attr: 'cnt_be_black',
        text: '被动联系的黑号数',
        format(data: any){
            return data>0 ? <div style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</div> : data
        }
    },
    {
        attr: 'cnt_black',
        text: '一阶联系(直接联系)黑号总数，前两项合并去重',
        format(data: any){
            return data>0 ? <div style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</div> : data
        }
    },
    {
        attr: 'cnt_black2',
        text: '二阶联系(间接联系)黑号总数，联系人的黑号联系人',
        format(data: any){
            return data>0 ? <div style={{padding: '5px 10px', backgroundColor: '#e01111', color: '#ffffff', borderRadius: '4px'}}>{data}</div> : data
        }
    },
    {
        attr: 'black_ratio',
        text: '黑号率',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'cnt_to_applied',
        text: '主动联系人中曾为申请人的人数'
    },
    {
        attr: 'cnt_applied',
        text: '联系人曾为申请人的人数，前两项合并去重'
    },
    {
        attr: 'pct_cnt_to_all',
        text: '主动联系人数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_be_all',
        text: '被动联系人数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_all',
        text: '一阶联系人总数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_router',
        text: '引起黑名单的一阶联系人数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_router_ratio',
        text: '引起黑名单的一阶联系人占比在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_to_black',
        text: '主动联系的黑号数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_be_black',
        text: '被动联系的黑号数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_black',
        text: '一阶联系(直接联系)黑号总数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_black_ratio',
        text: '黑号率在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_black2',
        text: '二阶联系(间接联系)黑号总数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_to_applied',
        text: '主动联系人中曾为申请人的人数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_applied',
        text: '联系人曾为申请人的人数在群体中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    }
];

//联系权重
export const contacts_rfm_config = [
    {
        attr: 'recent_time_to_all',
        text: '与所有联系人的最近主动通话时间',
        format(data: any){
            let timestamp = new Date(data);
            return (timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8))
        }
    },
    {
        attr: 'recent_time_be_all',
        text: '与所有联系人的最近被动通话时间',
        format(data: any){
            let timestamp = new Date(data);
            return (timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8))
        }
    },
    {
        attr: 'recent_time_to_black',
        text: '与黑号的最近主动通话时间',
        format(data: any){
            let timestamp = new Date(data);
            return (timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8))
        }
    },
    {
        attr: 'recent_time_be_black',
        text: '与黑号的最近被动通话时间',
        format(data: any){
            console.log(data);
            if (!data){
                return "无"
            } else {
                let timestamp = new Date(data);
                return (timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8))
            }

        }
    },
    {
        attr: 'recent_time_to_applied',
        text: '与申请人的最近主动通话时间',
        format(data: any){
            let timestamp = new Date(data);
            return (timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8))
        }
    },
    {
        attr: 'recent_time_be_applied',
        text: '与申请人的最近被动通话时间',
        format(data: any){
            let timestamp = new Date(data);
            return (timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8))
        }
    },
    {
        attr: 'call_cnt_to_all',
        text: '与所有联系人的主动总通话次数'
    },
    {
        attr: 'call_cnt_be_all',
        text: '与所有联系人的被动总通话次数'
    },
    {
        attr: 'call_cnt_to_black',
        text: '与黑号的主动总通话次数'
    },
    {
        attr: 'call_cnt_be_black',
        text: '与黑号的被动总通话次数'
    },
    {
        attr: 'call_cnt_to_applied',
        text: '与申请人的主动通话次数'
    },
    {
        attr: 'call_cnt_be_applied',
        text: '与申请人的被动通话次数'
    },
    {
        attr: 'time_spent_to_all',
        text: '与所有联系人的主动总通话时长',
        format(data: any){
            return (data/60/60).toFixed(2) + '小时'
        }
    },
    {
        attr: 'time_spent_be_all',
        text: '与所有联系人的被动总通话时长',
        format(data: any){
            return (data/60/60).toFixed(2) + '小时'
        }
    },
    {
        attr: 'time_spent_to_black',
        text: '与黑号的主动总通话时长',
        format(data: any){
            return (data/60/60).toFixed(2) + '小时'
        }
    },
    {
        attr: 'time_spent_be_black',
        text: '与黑号的被动总通话时长',
        format(data: any){
            return (data/60/60).toFixed(2) + '小时'
        }
    },
    {
        attr: 'time_spent_to_applied',
        text: '与申请人的主动通话时长',
        format(data: any){
            return (data/60/60).toFixed(2) + '小时'
        }
    },
    {
        attr: 'time_spent_be_applied',
        text: '与申请人的被动通话时长',
        format(data: any){
            return (data/60/60).toFixed(2) + '小时'
        }
    }
];

//与联系人的最大亲密度
export const contacts_closest_config = [
    {
        attr: 'weight_to_all',
        text: '与所有联系人的最大主动联系亲密度'
    },
    {
        attr: 'weight_be_all',
        text: '与所有联系人的最大被动联系亲密度'
    },
    {
        attr: 'weight_all',
        text: '与所有联系人的最大互动联系亲密度'
    },
    {
        attr: 'weight_to_black',
        text: '与黑号的最大主动联系亲密度'
    },
    {
        attr: 'weight_be_black',
        text: '与黑号的最大被动联系亲密度'
    },
    {
        attr: 'weight_black',
        text: '与黑号的最大互动联系亲密度'
    },
    {
        attr: 'weight_to_applied',
        text: '与申请人的最大主动联系亲密度'
    },
    {
        attr: 'weight_be_applied',
        text: '与申请人的最大被动联系亲密度'
    },
    {
        attr: 'weight_applied',
        text: '与申请人的最大互动联系亲密度'
    }
];

//联系人灰度分信息
export const contacts_gray_score_config = [
    {
        attr: 'most_familiar_to_all',
        text: '主动联系最亲密联系人的灰度分'
    },
    {
        attr: 'most_familiar_be_all',
        text: '被动联系最亲密联系人的灰度分'
    },
    {
        attr: 'most_familiar_all',
        text: '互动联系最亲密联系人的灰度分'
    },
    {
        attr: 'most_familiar_to_applied',
        text: '主动联系最亲密申请人的灰度分'
    },
    {
        attr: 'most_familiar_be_applied',
        text: '被动联系最亲密申请人的灰度分'
    },
    {
        attr: 'most_familiar_applied',
        text: '互动联系最亲密申请人的灰度分'
    },
    {
        attr: 'to_max',
        text: '主动联系的联系人的最高灰度分'
    },
    {
        attr: 'to_mean',
        text: '主动联系的联系人的平均灰度分'
    },
    {
        attr: 'to_min',
        text: '主动联系的联系人的最低灰度分'
    },
    {
        attr: 'be_max',
        text: '被动联系的联系人的最高灰度分'
    },
    {
        attr: 'be_mean',
        text: '被动联系的联系人的平均灰度分'
    },
    {
        attr: 'be_min',
        text: '被动联系的联系人的最低灰度分'
    },
    {
        attr: 'max',
        text: '联系人的最高灰度分'
    },
    {
        attr: 'mean',
        text: '联系人的平均灰度分'
    },
    {
        attr: 'min',
        text: '联系人的最低灰度分'
    }
];

//联系人的查询历史
export const contacts_query_config = [
    {
        attr: 'to_recent_query_time',
        text: '前半年内主动联系的人的最近一次查询时间',
        format(data: any){
            let timestamp = new Date(data);
            return (timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8))
        }
    },
    {
        attr: 'be_recent_query_time',
        text: '前半年内被动联系的人的最近一次查询时间',
        format(data: any){
            let timestamp = new Date(data);
            return (timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8))
        }
    },
    {
        attr: 'to_query_cnt_05',
        text: '前半月内主动联系的人的查询次数'
    },
    {
        attr: 'be_query_cnt_05',
        text: '前半月内被动联系的人的查询次数'
    },
    {
        attr: 'query_cnt_05',
        text: '前半月内联系人的查询次数'
    },
    {
        attr: 'to_query_cnt_1',
        text: '前1月内主动联系的人的查询次数'
    },
    {
        attr: 'be_query_cnt_1',
        text: '前1月内被动联系的人的查询次数'
    },
    {
        attr: 'query_cnt_1',
        text: '前1月内联系人的查询次数'
    },
    {
        attr: 'to_query_cnt_2',
        text: '前2月内主动联系的人的查询次数'
    },
    {
        attr: 'be_query_cnt_2',
        text: '前2月内被动联系的人的查询次数'
    },
    {
        attr: 'query_cnt_2',
        text: '前2月内联系人的查询次数'
    },
    {
        attr: 'to_query_cnt_3',
        text: '前3月内主动联系的人的查询次数'
    },
    {
        attr: 'be_query_cnt_3',
        text: '前3月内被动联系的人的查询次数'
    },
    {
        attr: 'query_cnt_3',
        text: '前3月内联系人的查询次数'
    },
    {
        attr: 'to_query_cnt_6',
        text: '前6月内主动联系的人的查询次数'
    },
    {
        attr: 'be_query_cnt_6',
        text: '前6月内被动联系的人的查询次数'
    },
    {
        attr: 'query_cnt_6',
        text: '前6月内联系人的查询次数'
    },
    {
        attr: 'to_query_cnt_9',
        text: '前9月内主动联系的人的查询次数'
    },
    {
        attr: 'be_query_cnt_9',
        text: '前9月内被动联系的人的查询次数'
    },
    {
        attr: 'query_cnt_9',
        text: '前9月内联系人的查询次数'
    },
    {
        attr: 'to_query_cnt_12',
        text: '前12月内主动联系的人的查询次数'
    },
    {
        attr: 'be_query_cnt_12',
        text: '前12月内被动联系的人的查询次数'
    },
    {
        attr: 'query_cnt_12',
        text: '前12月内联系人的查询次数'
    },
    {
        attr: 'to_org_cnt_05',
        text: '前半月内主动联系的人的查询机构数'
    },
    {
        attr: 'be_org_cnt_05',
        text: '前半月内被动联系的人的查询机构数'
    },
    {
        attr: 'org_cnt_05',
        text: '前半月内联系人的查询机构数'
    },
    {
        attr: 'to_org_cnt_1',
        text: '前1月内主动联系的人的查询机构数'
    },
    {
        attr: 'be_org_cnt_1',
        text: '前1月内被动联系的人的查询机构数'
    },
    {
        attr: 'org_cnt_1',
        text: '前1月内联系人的查询机构数'
    },
    {
        attr: 'to_org_cnt_2',
        text: '前2月内主动联系的人的查询机构数'
    },
    {
        attr: 'be_org_cnt_2',
        text: '前2月内被动联系的人的查询机构数'
    },
    {
        attr: 'org_cnt_2',
        text: '前2月内联系人的查询机构数'
    },
    {
        attr: 'to_org_cnt_3',
        text: '前3月内主动联系的人的查询机构数'
    },
    {
        attr: 'be_org_cnt_3',
        text: '前3月内被动联系的人的查询机构数'
    },
    {
        attr: 'org_cnt_3',
        text: '前3月内联系人的查询机构数'
    },
    {
        attr: 'to_org_cnt_6',
        text: '前6月内主动联系的人的查询机构数'
    },
    {
        attr: 'be_org_cnt_6',
        text: '前6月内被动联系的人的查询机构数'
    },
    {
        attr: 'org_cnt_6',
        text: '前6月内联系人的查询机构数'
    },
    {
        attr: 'to_org_cnt_9',
        text: '前9月内主动联系的人的查询机构数'
    },
    {
        attr: 'be_org_cnt_9',
        text: '前9月内被动联系的人的查询机构数'
    },
    {
        attr: 'org_cnt_9',
        text: '前9月内联系人的查询机构数'
    },
    {
        attr: 'to_org_cnt_12',
        text: '前12月内主动联系的人的查询机构数'
    },
    {
        attr: 'be_org_cnt_12',
        text: '前12月内被动联系的人的查询机构数'
    },
    {
        attr: 'org_cnt_12',
        text: '前12月内联系人的查询机构数'
    }
];

//用户注册信息情况
export const register_orgs_statistics_config = [
    {
        attr: 'count',
        text: '每种类型注册的数量'
    },
    {
        attr: 'label',
        text: '注册App的类型'
    }
];

//用户注册信息情况
export const user_register_orgs_config = [
    {
        attr: 'register_cnt',
        text: '注册总数量'
    },
    {
        attr: 'phone_num',
        text: '查询手机号码'
    }
];

//用户黑名单详细情况
export const blacklist_details_config = [
    {
        attr: 'details_key',
        text: '详情名称'
    },
    {
        attr: 'details_value',
        text: '详情内容'
    }
];

//用户黑名单信息情况
export const user_blacklist_config = [
    {
        attr: 'blacklist_name_with_phone',
        text: '姓名和手机是否在黑名单',
        format(data: any){
            return data? '是':'否'
        }
    },
    {
        attr: 'blacklist_name_with_idcard',
        text: '身份证和姓名是否在黑名单',
        format(data: any){
            return data? '是':'否'
        }
    },
    {
        attr: 'blacklist_category',
        text: '黑名单分类',
        format(data: any){
            return <div><p>{data}</p></div>
        }
    },
    {
        attr: 'blacklist_update_time_name_phone',
        text: '姓名和手机黑名单信息更新时间'
    },
    {
        attr: 'blacklist_update_time_name_idcard',
        text: '身份证和姓名黑名单信息更新时间'
    }
];

//用这个手机号码绑定的其他身份证
export const phone_with_other_idcards_config = [
    {
        attr: 'susp_idcard',
        text: '绑定的身份证'
    },
    {
        attr: 'susp_updt',
        text: '绑定时间'
    }
];

//用这个手机号码绑定的其他姓名
export const phone_with_other_names_config = [
    {
        attr: 'susp_name',
        text: '绑定姓名'
    },
    {
        attr: 'susp_updt',
        text: '绑定时间'
    }
];

//电话号码在那些类型的机构中使用过
export const phone_applied_in_orgs_config = [
    {
        attr: 'susp_org_type',
        text: '机构所属分类'
    },
    {
        attr: 'susp_updt',
        text: '查询时间'
    }
];

//用这个身份证号码绑定的其他姓名
export const idcard_with_other_names_config = [
    {
        attr: 'susp_name',
        text: '绑定姓名'
    },
    {
        attr: 'susp_updt',
        text: '绑定时间'
    }
];

//用这个身份证绑定的其他手机号码
export const idcard_with_other_phones_config = [
    {
        attr: 'susp_phone_province',
        text: '该号码所属省份'
    },
    {
        attr: 'susp_phone_operator',
        text: '该号码所属运营商'
    },
    {
        attr: 'susp_updt',
        text: '该号码最后一次绑定时间'
    },
    {
        attr: 'susp_phone',
        text: '存疑手机号码'
    },
    {
        attr: 'susp_phone_city',
        text: '该号码所在地区'
    },
    {
        attr: 'times',
        text: '该号码出现的次数'
    }
];

//电话号码在那些类型的机构中使用过
export const idcard_applied_in_orgs_config = [
    {
        attr: 'susp_org_type',
        text: '机构所属分类'
    },
    {
        attr: 'susp_updt',
        text: '查询时间'
    }
];

//用户被机构查询历史
export const user_searched_history_by_orgs_config = [
    {
        attr: 'searched_org',
        text: '主动查询用户信息的机构类型'
    },
    {
        attr: 'searched_date',
        text: '查询时间'
    },
    {
        attr: 'org_self',
        text: '是否是本机构查询',
        format(data: any){
            return data.org_self ? '是': '否'
        }
    }
];

//用户被机构批量查询历史
export const user_batch_searched_history_by_orgs_config = [
    {
        attr: 'searched_org',
        text: '主动查询用户信息的机构类型'
    },
    {
        attr: 'searched_date',
        text: '查询时间'
    },
    {
        attr: 'org_self',
        text: '是否是本机构查询',
        format(data: any){
            return data.org_self ? '是': '否'
        }
    }
];

//消费标签信息
export const consumer_label_config = [
    {
        attr: 'if_own_cc',
        text: '是否有信用卡'
    },
    {
        attr: 'if_own_wg_cc',
        text: '是否有白金卡'
    },
    {
        attr: 'if_own_car',
        text: '是否有车'
    },
    {
        attr: 'if_pay_ins',
        text: '是否购买保险产品'
    },
    {
        attr: 'if_fin_buy_pre6',
        text: '是否购买理财产品'
    },
    {
        attr: 'cst_score_finally',
        text: '消费能力指数'
    }
];

//历史查询记录
export const user_searched_history_by_day_config = [
    {
        attr: 'cnt',
        text: '查询次数'
    },
    {
        attr: 'cnt_cash',
        text: '现金贷查询次数'
    },
    {
        attr: 'cnt_cc',
        text: '信用卡代还查询次数'
    },
    {
        attr: 'cnt_cf',
        text: '消费分期查询次数'
    },
    {
        attr: 'cnt_org',
        text: '查询机构数'
    },
    {
        attr: 'cnt_org_cash',
        text: '现金贷查询机构数'
    },
    {
        attr: 'cnt_org_cc',
        text: '信用卡代还查询机构数'
    },
    {
        attr: 'cnt_org_cf',
        text: '消费分期查询机构数'
    },
    {
        attr: 'pct_cnt_all',
        text: '查询次数在总体查询分布中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_cash',
        text: '查询次数在现金贷查询分布中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_cc',
        text: '查询次数在信用卡代还查询分布中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_cf',
        text: '查询次数在消费分期查询分布中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_all',
        text: '查询机构数在总体查询分布中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_cash',
        text: '查询机构数在现金贷查询分布中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_cc',
        text: '查询机构数在信用卡代还查询分布中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_cf',
        text: '查询机构数在消费分期查询分布中的百分比',
        format(data: any){
            return (data*100).toFixed(2) + '%'
        }
    }
];


//历史查询记录
export const user_searched_history_by_day_array_config = [
    {
        attr: 'day',
        text: '时间跨度'
    },
    {
        attr: 'cnt',
        text: '查询次数'
    },
    {
        attr: 'cnt_cash',
        text: '现金贷查询次数'
    },
    {
        attr: 'cnt_cc',
        text: '信用卡代还查询次数'
    },
    {
        attr: 'cnt_cf',
        text: '消费分期查询次数'
    },
    {
        attr: 'cnt_org',
        text: '查询机构数'
    },
    {
        attr: 'cnt_org_cash',
        text: '现金贷查询机构数'
    },
    {
        attr: 'cnt_org_cc',
        text: '信用卡代还查询机构数'
    },
    {
        attr: 'cnt_org_cf',
        text: '消费分期查询机构数'
    },
    {
        attr: 'pct_cnt_all',
        text: '查询次数在总体查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_all*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_cash',
        text: '查询次数在现金贷查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_cash*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_cc',
        text: '查询次数在信用卡代还查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_cc*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_cf',
        text: '查询次数在消费分期查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_cf*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_all',
        text: '查询机构数在总体查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_org_all*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_cash',
        text: '查询机构数在现金贷查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_org_cash*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_cc',
        text: '查询机构数在信用卡代还查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_org_cc*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_cf',
        text: '查询机构数在消费分期查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_org_cf*100).toFixed(2) + '%'
        }
    }
];

export const user_searched_history_by_day_percent_array_config = [
    {
        attr: 'day',
        text: '时间跨度'
    },
    {
        attr: 'pct_cnt_all',
        text: '查询次数在总体查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_all*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_cash',
        text: '查询次数在现金贷查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_cash*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_cc',
        text: '查询次数在信用卡代还查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_cc*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_cf',
        text: '查询次数在消费分期查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_cf*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_all',
        text: '查询机构数在总体查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_org_all*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_cash',
        text: '查询机构数在现金贷查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_org_cash*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_cc',
        text: '查询机构数在信用卡代还查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_org_cc*100).toFixed(2) + '%'
        }
    },
    {
        attr: 'pct_cnt_org_cf',
        text: '查询机构数在消费分期查询分布中的百分比',
        format(data: any){
            return (data.pct_cnt_org_cf*100).toFixed(2) + '%'
        }
    }
];