import * as React from 'react';
import { BaseInfoRow } from './baseRow/baseInfoRow';
import { BaseInfoTitle } from './baseInfotitle';
import { BaseInfoTip } from './baseInfoTip';
interface Props {
    data: any;
}

interface State {
    data: any;
}

export class BaseInfo extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: props.data
        };
    }

    render() {
        return <div className='user-application'>
            <div className='display-flex-center' 
                style={{backgroundColor: '#0e5d95', height: '56px'}}>
                <p className='color-fff font-16' 
                    style={{fontWeight: 'bold', letterSpacing: '1px'}}>
                    用户申请表检测</p>
            </div>
            {
                this.props.data.user_basic.user_name && <div className='display-flex-start font-14' 
                        style={{padding: '16px 0', borderBottom: '1px solid #eeeeee'}}>
                    <BaseInfoTitle text='姓名' />
                    <p style={{marginLeft: '18px'}}>
                        {this.state.data.user_basic.user_name}
                    </p>
                </div>
            }
            {
                this.state.data.user_basic.user_idcard 
                    && <BaseInfoRow>
                    <div className='flex-3 display-flex-start'>
                        <BaseInfoTitle text='身份证' />
                        <p style={{marginLeft: '18px'}}>
                            {this.state.data.user_basic.user_idcard}
                        </p>
                        {
                            <BaseInfoTip style={{marginLeft: '15px'}}
                                valid={this.state.data.user_basic.user_idcard_valid}>
                                {
                                    (this.state.data.user_basic.user_idcard_valid)
                                    ? '身份证有效' : '身份证无效'
                                }
                            </BaseInfoTip>   
                        }
                    </div>
                    <div className='flex-2 display-flex-start' 
                            style={{justifyContent: 'center'}}>
                        <span>{this.state.data.user_basic.user_gender}</span>
                        <span style={{margin: '0 8px'}}>|</span>
                        <span>{this.state.data.user_basic.user_age}</span>
                        <span style={{margin: '0 8px'}}>|</span>
                        <span>
                            {this.state.data.user_basic.user_province}
                            {this.state.data.user_basic.user_city}
                        </span>
                    </div>
                    </BaseInfoRow>
            }
            {
                this.state.data.user_basic && <div className='display-flex-start font-14' 
                    style={{padding: '16px 0', flexWrap: 'wrap',
                        borderBottom: '1px solid #eeeeee'}}>
                    <div className='flex-3 display-flex-start'>
                        <BaseInfoTitle text='手机号' />
                        <p style={{marginLeft: '18px', color: '#0e9577'}}>
                            {this.state.data.user_basic.user_phone_operator}
                        </p>
                        <p style={{marginLeft: '18px', color: '#0e9577', fontWeight: 'bold'}}>
                            {this.state.data.user_basic.user_phone}
                        </p>
                    </div>
                    <div className='flex-2 display-flex-start'
                         style={{justifyContent: 'center'}}
                    >
                        <BaseInfoTip valid={this.state.data.user_searched_statistic.searched_org_cnt === 0}>
                            被机构查询数量：
                            {this.state.data.user_searched_statistic.searched_org_cnt}
                        </BaseInfoTip>
                        <BaseInfoTip valid={true} style={{marginLeft: '15px'}}>
                            {this.state.data.user_basic.user_phone_province} 
                            {this.state.data.user_basic.user_phone_city}
                            {this.state.data.user_basic.user_region}
                        </BaseInfoTip>
                    </div>
                </div>
            }
            <BaseInfoRow>
                <div className='flex-3 display-flex-start'>
                    <BaseInfoTitle text='灰度信息' />
                    <p style={{marginLeft: '18px', color: '#0e9577', fontWeight: 'bold'}}>
                        {this.state.data.user_gray.user_phone}
                    </p>
                    <BaseInfoTip style={{marginLeft: '15px'}}
                         valid={this.state.data.user_gray.phone_gray_score>10} >
                            灰度分：{this.state.data.user_gray.phone_gray_score}
                        （综合风险评估，分值越高越没有风险）
                    </BaseInfoTip>

                </div>
                <div className='flex-2 display-flex-start'
                     style={{justifyContent: 'center'}}
                >
                    <BaseInfoTip valid={true}>
                        社交活跃度：{this.state.data.user_gray.social_liveness}
                    </BaseInfoTip>
                    <BaseInfoTip valid={true} style={{marginLeft: '15px'}}>
                        社交影响力：{this.state.data.user_gray.social_influence}
                    </BaseInfoTip>
                </div>
            </BaseInfoRow>
        </div>

    }
}