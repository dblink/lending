import * as React from 'react';
import {config} from "../config";

export class CommonLimitList extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            data: props.data,
            show: true
        };
        this.showBlock = this.showBlock.bind(this);
        this.format = this.format.bind(this);
    }
    componentDidMount(){
        if(this.props.data){
            let new_data: any[] = [];
            this.props.data.map((value: any)=>{
                let _formatData = this.format(value);
                new_data = new_data.concat(_formatData);
                this.setState({
                    data: new_data
                })
            });
        }
    }
    format(value: any){
        let _value = Object.assign({}, value);
        (_value.Relation===0 || _value.Relation) ? _value.Relation = config.RelationState[_value.Relation as '0']:'';
        _value.defaultStatus = config.isState[_value.defaultStatus as '0'];
        _value.isDelete = config.isState[_value.isDelete as '0'];
        _value.cardType = config.cardTypeStatus[_value.cardType as '1'];
        _value.isExpress ? _value.isExpress = '是':'否';
        _value.virtualSign = _value.virtualSign ? "是" : "否";
        _value.mobileTradeStatus = config.isState[_value.mobileTradeStatus as '1'];
        _value.repayAccountType ? _value.repayAccountType = config.repayAccountTypeState[_value.repayAccountType] : '';
        _value.weBankRepayAccountType ? _value.weBankRepayAccountType = config.repayAccountTypeState[_value.weBankRepayAccountType] : '';
        _value.url ? _value.url = <a href="">{_value.url}</a> : '';
        (_value.sex===0 || _value.sex) ? _value.sex = config.sex[_value.sex as '0']:'';
        (_value.verifyFlag===0 || _value.verifyFlag)?_value.verifyFlag = config.verifyFlag[_value.verifyFlag as '0']:'';
        (_value.starFriend===0 || _value.starFriend)?_value.starFriend = config.isState[_value.starFriend as '0']:'';
        (_value.isGroup===0 || _value.isGroup)?_value.isGroup = config.isState[_value.isGroup as '0']:'';
        (_value.isOwner===0 || _value.isOwner)?_value.isOwner = config.isState[_value.isOwner as '0']:'';
        (_value.isCollection===0 || _value.isCollection)?_value.isCollection = config.isState[_value.isCollection as '0']:'';
        (_value.statues===0 || _value.statues)?_value.statues = config.isState[_value.statues as '0']:'';
        (_value.isBlack===0 || _value.isBlack)?_value.isBlack = config.isState[_value.isBlack as '0']:'';
        (_value.isTopContact===0 || _value.isTopContact)?_value.isTopContact = config.isState[_value.isTopContact as '0']:'';
        (_value.isMuted===0 || _value.isMuted)?_value.isMuted = config.isState[_value.isMuted as '0']:'';
        (_value.isContact===0 || _value.isContact)?_value.isContact = config.isState[_value.isContact as '0']:'';
        (_value.hasContacted===0 || _value.hasContacted)?_value.hasContacted = config.isState[_value.hasContacted as '0']:'';
        (_value.snsNotLookOther===0 || _value.snsNotLookOther)?_value.snsNotLookOther = config.isState[_value.snsNotLookOther as '0']:'';
        (_value.snsOtherNotLook===0 || _value.snsOtherNotLook)?_value.snsOtherNotLook = config.isState[_value.snsOtherNotLook as '0']:'';
        (_value.isDue===0||_value.isDue)?_value.isDue = config.isState[_value.isDue as '0']:'';
        (_value.isPaid===0||_value.isPaid)?_value.isPaid = config.isState[_value.isPaid as '0']:'';
        (_value.payOffFlag===0||_value.payOffFlag)?_value.payOffFlag = config.isState[_value.payOffFlag as '0']:'';
        (_value.overDueFlag===0||_value.overDueFlag)?_value.overDueFlag = config.isState[_value.overDueFlag as '0']:'';
        (_value.pmtInd===0||_value.pmtInd)?_value.pmtInd = config.isState[_value.pmtInd as '0']:'';
        (_value.bankaccType)?_value.bankaccType = config.bankaccTypeStatus[_value.bankaccType as '1']:'';
        return _value
    }
    showBlock(){
        this.setState({
            show: !this.state.show
        })
    }
    render(){
        let _data = this.state.data || this.props.data;
        let _style = this.props.style;
        let _height = window.innerHeight;
        let overWidth = Object.keys(this.props.config).length*200;
        return <div className='report-info-block'>
            <div onClick={this.showBlock} className='report-info-block-title'>
                <p>
                    {this.props.title}
                    {/*{this.state.show ?'': <i style={{color: '#666666', fontSize: '12px', fontWeight: 'normal', fontStyle: 'normal', paddingLeft: '8px'}}>（无信息）</i>}*/}
                </p>
            </div>
            {
                _data ? this.state.show && <div className='report-column' style={{maxHeight: (_height-370 + 'px')}}>
                    <ul style={{minWidth: (overWidth + 'px')}}>
                        <li style={{backgroundColor: '#eeeeee', borderBottom: '1px solid #dddddd', minHeight: '55px'}}>
                            {
                                Object.keys(this.props.config).map((value, index)=>{
                                    return <p key={index} className='report-item-value'>
                                        {this.props.config[value]}
                                    </p>
                                })
                            }
                        </li>
                    </ul>
                    <ul style={{minWidth: (overWidth + 'px'), maxHeight: (_height-370 + 'px'), overflowX: 'auto'}}>
                        {
                            _data.map((value: any, index: any)=>{
                                return <li key={index}>
                                    {
                                        Object.keys(this.props.config).map((_value, _index)=>{
                                            return <p style={_style} key={_index} className='report-item-value'>
                                        <span className='wrap' title={value[_value] || value[_value] ? value[_value]:'0'}>
                                            {value[_value]}
                                        </span>
                                            </p>
                                        })
                                    }
                                </li>
                            })
                        }
                    </ul>

                </div> : this.state.show && <div style={{marginTop: '8px', border: '1px solid #dddddd' ,width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px', backgroundColor: '#f8f8f8'}}>
                    <p>无信息</p>
                </div>
            }
        </div>
    }
}