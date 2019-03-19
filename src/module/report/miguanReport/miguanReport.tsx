import * as React from 'react';
import {
    blacklist_details_config,
    consumer_label_config,
    contacts_closest_config,
    contacts_gray_score_config,
    contacts_number_statistic_config,
    contacts_query_config,
    contacts_rfm_config,
    idcard_applied_in_orgs_config,
    idcard_with_other_names_config,
    idcard_with_other_phones_config,
    iou_statistic_config,
    phone_applied_in_orgs_config,
    phone_with_other_idcards_config,
    phone_with_other_names_config,
    register_orgs_statistics_config,
    user_basic_config,
    user_batch_searched_history_by_orgs_config,
    user_blacklist_config,
    user_gray_config,
    user_register_orgs_config,
    user_searched_history_by_day_array_config,
    user_searched_history_by_day_config, user_searched_history_by_day_percent_array_config,
    user_searched_history_by_orgs_config,
} from "./config";
import './css/miGuanReport.css'
import {user_info_check_config} from "../juXinLiReport/config";
import {Table, AbeamTable, SeemTable} from "../../../components/table/commonTable";

export const MiReport = (props: any) => (<MiguanReport {...props} />);

export class MiguanReport extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            data: props.data,
            dateValue: ''
        };
        this.getTimeCalendar = this.getTimeCalendar.bind(this);
    }

    getTimeCalendar(name: string, value: string){
        console.log(name, value);
        this.setState({
            dateValue: value
        })
    }

    render(){
        let _data = this.state.data;
        let _search = _data.user_searched_history_by_day;
        let _searchArray = ['7天内', '15天内', '30天内', '60天内', '90天内', '120天内', '150天内', '180天内', '270天内', '360天内', '540天内', '720天内'];
        let _searchData: any = [];
        let _searchPercentData: any = [];
        Object.keys(_search).map((value, index)=>{
            let _searchPerData: any = {};
            _search[value]['day'] = _searchArray[index];
            _searchPerData['day'] = _search[value]['day'];
            _searchPerData['pct_cnt_all'] = _search[value]['pct_cnt_all'];
            _searchPerData['pct_cnt_cash'] = _search[value]['pct_cnt_cash'];
            _searchPerData['pct_cnt_cc'] = _search[value]['pct_cnt_cc'];
            _searchPerData['pct_cnt_cf'] = _search[value]['pct_cnt_cf'];
            _searchPerData['pct_cnt_org_all'] = _search[value]['pct_cnt_org_all'];
            _searchPerData['pct_cnt_org_cash'] = _search[value]['pct_cnt_org_cash'];
            _searchPerData['pct_cnt_org_cc'] = _search[value]['pct_cnt_org_cc'];
            _searchPerData['pct_cnt_org_cf'] = _search[value]['pct_cnt_org_cf'];
            _searchData.push(_search[value]);
            _searchPercentData.push(_searchPerData);
        });

        let Tab = Table.CommonTable;

        return <div style={{height: '800px'}}>
            <div style={{margin: 'auto', minWidth: '640px', width: '100%', backgroundColor: '#fefefe', minHeight: '969px', padding: '0 40px'}}>
                <div className='display-flex-center' style={{padding: '40px 0 20px 0'}}>
                    <h1>蜜罐互联网资信报告</h1>
                </div>
                {/*用户申请表检测*/}
                <div className='user-application'>
                    <div className='display-flex-center' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16' style={{fontWeight: 'bold', letterSpacing: '1px'}}>用户申请表检测</p>
                    </div>
                    {
                        this.state.data.user_basic.user_name && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                            <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                姓名
                            </p>
                            <p style={{marginLeft: '18px'}}>{this.state.data.user_basic.user_name}</p>
                        </div>
                    }
                    {
                        this.state.data.user_basic.user_idcard && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                            <div className='flex-3 display-flex-start'>
                                <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                    身份证
                                </p>
                                <p style={{marginLeft: '18px'}}>{this.state.data.user_basic.user_idcard}</p>
                                {
                                    (this.state.data.user_basic.user_idcard_valid) ? <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}>
                                        身份证有效
                                    </p> : <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#db3951', borderRadius: '4px', marginLeft: '8px'}}>
                                        身份证无效
                                    </p>
                                }

                            </div>
                            <div className='flex-2 display-flex-start'>
                                <p>{this.state.data.user_basic.user_gender}</p><p style={{margin: '0 8px'}}>|</p><p>{this.state.data.user_basic.user_age}</p><p style={{margin: '0 8px'}}>|</p><p>{this.state.data.user_basic.user_province + this.state.data.user_basic.user_city}</p>
                            </div>
                        </div>
                    }
                    {
                        this.state.data.user_basic && <div className='display-flex-start font-14' style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                            <div className='flex-3 display-flex-start'>
                                <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                    手机号
                                </p>
                                <p style={{marginLeft: '18px', color: '#0e9577'}}>{this.state.data.user_basic.user_phone_operator}</p>
                                <p style={{marginLeft: '18px', color: '#0e9577', fontWeight: 'bold'}}>{this.state.data.user_basic.user_phone}</p>
                            </div>
                            <div className='flex-2 display-flex-start'>
                                <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px'}}><span style={{color: '#ffffff'}}>被机构查询数量：</span>{this.state.data.user_searched_statistic.searched_org_cnt}</p>
                                <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}>
                                    {this.state.data.user_basic.user_phone_province + this.state.data.user_basic.user_phone_city + this.state.data.user_basic.user_region}
                                </p>
                            </div>
                        </div>
                    }
                    <div className='display-flex-start font-14' style={{padding: '16px 0'}}>
                        <div className='flex-3 display-flex-start'>
                            <p className='display-flex-end color-666' style={{backgroundColor: '#eeeeee', padding: '10px', width: '100px'}}>
                                灰度信息
                            </p>
                            <p style={{marginLeft: '18px', color: '#0e9577', fontWeight: 'bold'}}>{this.state.data.user_gray.user_phone}</p>
                            <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: this.state.data.user_gray.phone_gray_score>10?'#0e9577': '#e01111', borderRadius: '4px', marginLeft: '18px'}}><span style={{color: '#ffffff'}}>灰度分：</span>{this.state.data.user_gray.phone_gray_score}<span style={{color: '#ffffff'}}>（综合风险评估，分值越高越没有风险）</span></p>

                        </div>
                        <div className='flex-2 display-flex-start'>
                            <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px'}}><span style={{color: '#ffffff'}}>社交活跃度：</span>{this.state.data.user_gray.social_liveness}</p>
                            <p className='font-12 color-fff' style={{padding: '5px 8px', backgroundColor: '#0e9577', borderRadius: '4px', marginLeft: '8px'}}><span style={{color: '#ffffff'}}>社交影响力：</span>{this.state.data.user_gray.social_influence}</p>

                        </div>
                    </div>
                </div>

                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>用户手机号借条信息</p>
                    </div>
                    <AbeamTable list={_data.iou_statistic} setting={iou_statistic_config}/>
                </div>

                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>用户灰度信息</p>
                    </div>
                    {/*<div style={{marginTop: '30px'}}>*/}
                        {/*<AbeamTable list={_data.user_gray} setting={user_gray_config} titleLil={'用户灰度分数信息'}/>*/}
                    {/*</div>*/}

                    <div style={{marginTop: '30px'}}>
                        <AbeamTable list={_data.user_gray.contacts_number_statistic} setting={contacts_number_statistic_config} titleLil={'联系人数信息'}/>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <AbeamTable list={_data.user_gray.contacts_rfm} setting={contacts_rfm_config} titleLil={'联系权重'}/>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <AbeamTable list={_data.user_gray.contacts_closest} setting={contacts_closest_config} titleLil={'与联系人的最大亲密度'}/>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <AbeamTable list={_data.user_gray.contacts_closest} setting={contacts_closest_config} titleLil={'与联系人的最大亲密度'}/>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <AbeamTable list={_data.user_gray.contacts_gray_score} setting={contacts_gray_score_config} titleLil={'联系人灰度分信息'}/>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <AbeamTable list={_data.user_gray.contacts_query} setting={contacts_query_config} titleLil={'联系人的查询历史'}/>
                    </div>
                </div>

                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>用户注册信息情况</p>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <AbeamTable list={_data.user_register_orgs} setting={user_register_orgs_config} titleLil={'用户注册信息情况'}/>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_register_orgs.register_orgs_statistics} setting={register_orgs_statistics_config} title={'用户注册App统计详情'} style={{border: '1px solid #cccccc'}}/>
                    </div>
                </div>

                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>用户黑名单信息情况</p>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <AbeamTable list={_data.user_blacklist} setting={user_blacklist_config} titleLil={'用户黑名单信息情况'}/>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_blacklist.blacklist_details} setting={blacklist_details_config} title={'用户黑名单详细情况'} style={{border: '1px solid #cccccc'}}/>
                    </div>
                </div>

                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>消费标签信息</p>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <AbeamTable list={_data.consumer_label} setting={consumer_label_config} titleLil={'消费标签信息'}/>
                    </div>

                </div>

                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>手机号码存疑情况</p>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_phone_suspicion.phone_with_other_idcards} setting={phone_with_other_idcards_config} title={'用这个手机号码绑定的其他身份证'} style={{border: '1px solid #cccccc'}}/>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_phone_suspicion.phone_with_other_names} setting={phone_with_other_names_config} title={'用这个手机号码绑定的其他姓名'} style={{border: '1px solid #cccccc'}}/>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_phone_suspicion.phone_applied_in_orgs} setting={phone_applied_in_orgs_config} title={'电话号码在那些类型的机构中使用过'} style={{border: '1px solid #cccccc'}}/>
                    </div>
                </div>

                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>身份证号码存疑情况</p>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_idcard_suspicion.idcard_with_other_names} setting={idcard_with_other_names_config} title={'用这个身份证号码绑定的其他姓名'} style={{border: '1px solid #cccccc'}}/>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_idcard_suspicion.idcard_with_other_phones} setting={idcard_with_other_phones_config} title={'用这个身份证绑定的其他手机号码'} style={{border: '1px solid #cccccc'}}/>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_idcard_suspicion.idcard_applied_in_orgs} setting={idcard_applied_in_orgs_config} title={'身份证在那些类型的机构中使用过'} style={{border: '1px solid #cccccc'}}/>
                    </div>
                </div>

                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>用户被机构查询历史</p>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_searched_history_by_orgs} setting={user_searched_history_by_orgs_config} style={{border: '1px solid #cccccc'}}/>
                    </div>

                </div>

                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>用户被机构批量查询历史</p>
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <SeemTable list={_data.user_batch_searched_history_by_orgs} setting={user_batch_searched_history_by_orgs_config} style={{border: '1px solid #cccccc'}}/>
                    </div>

                </div>

                {

                }
                <div className='user-application'>
                    <div className='display-flex-center title-report-title' style={{backgroundColor: '#0e5d95', height: '56px'}}>
                        <p className='color-fff font-16'>历史查询记录</p>
                    </div>
                    <div style={{marginTop: '30px'}}>
                        <SeemTable title={'历史查询记录'} list={_searchData} setting={user_searched_history_by_day_array_config} style={{border: '1px solid #cccccc'}}/>
                    </div>
                    {/*<div style={{marginTop: '30px'}}>*/}
                        {/*<AbeamTable titleLil={'7天内历史查询'} list={_data.user_searched_history_by_day.d_7} setting={user_searched_history_by_day_config} style={{border: '1px solid #cccccc'}}/>*/}
                    {/*</div>*/}
                    {/*<div style={{marginTop: '30px'}}>*/}
                        {/*<AbeamTable titleLil={'540天内历史查询'} list={_data.user_searched_history_by_day.m_18} setting={user_searched_history_by_day_config} style={{border: '1px solid #cccccc'}}/>*/}
                    {/*</div>*/}

                </div>
            </div>
        </div>
    }
}