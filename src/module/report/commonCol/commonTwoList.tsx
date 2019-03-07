import * as React from 'react';
import {config} from "../config";

export class CommonTwoList extends React.Component<any, any>{
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
            let _formatData = this.format(this.props.data);
            this.setState({
                data: _formatData
            })
        }
    }
    format(value: any){
        let _value = Object.assign({}, value);
        // if(_value.call110Cnt > 0){
        //     _value.call110Cnt = <span style={{padding: '5px 10px', backgroundColor: '#ff0000'}}>{_value.call110Cnt}</span>
        // }
        // if(_value.call110Duration > 0){
        //     _value.call110Duration = <span style={{padding: '5px 10px', backgroundColor: '#ff0000'}}>{_value.call110Duration}</span>
        // }
        // if(_value.macaoCallCnt > 0){
        //     _value.macaoCallCnt = <span style={{padding: '5px 10px', backgroundColor: '#ff0000'}}>{_value.macaoCallCnt}</span>
        // }
        // if(_value.macaoCallDuration > 0){
        //     _value.macaoCallDuration = <span style={{padding: '5px 10px', backgroundColor: '#ff0000'}}>{_value.macaoCallDuration}</span>
        // }
        _value.MaritalStatus = config.marriageStatus[_value.MaritalStatus as '1'];
        (_value.idCardMatchStatus === 0 || _value.idCardMatchStatus) ? _value.idCardMatchStatus = <i style={{fontStyle: 'normal', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><span className='state-word' style={{color: config.reportColorState[_value.idCardMatchStatus as '0'] }}>{config.reportStateWord[_value.idCardMatchStatus as '0']}</span></i> : '';
        (_value.nameMatchStatus === 0 || _value.nameMatchStatus) ? _value.nameMatchStatus = <i style={{fontStyle: 'normal', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><span className='state-word' style={{color: config.reportColorState[_value.nameMatchStatus as '0'] }}>{config.reportStateWord[_value.nameMatchStatus as '0']}</span></i> : '';
        (_value.familiarityStatus === 0 || _value.familiarityStatus) ? _value.familiarityStatus = <i style={{fontStyle: 'normal', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><span className='state-word' style={{color: config.reportColorState[_value.familiarityStatus as '0'] }}>{config.reportStateWord[_value.familiarityStatus as '0']}</span></i> : '';
        (_value.familiarityHolderStatus === 0 || _value.familiarityHolderStatus) ? _value.familiarityHolderStatus = <i style={{fontStyle: 'normal', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><span className='state-word' style={{color: config.reportColorState[_value.familiarityHolderStatus as '0'] }}>{config.reportStateWord[_value.familiarityHolderStatus as '0']}</span></i> : '';
        (_value.mobileMatchIdCardStatus === 0 || _value.mobileMatchIdCardStatus) ? _value.mobileMatchIdCardStatus = <i style={{fontStyle: 'normal', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <span className='state-word' style={{color: config.reportColorState[_value.mobileMatchIdCardStatus as '0'] }}>{config.reportStateWord[_value.mobileMatchIdCardStatus as '0']}</span></i>: '';
        (_value.huabeiStatus === 0 || _value.huabeiStatus) ? _value.huabeiStatus = config.HuaBeiStatus[_value.huabeiStatus as '0'] : '';
        _value.status ? _value.status = config.statusStatus[_value.status as '1'] : '';
        (_value.balancePaymentEnable === 0 || _value.balancePaymentEnable) ? _value.balancePaymentEnable = config.isState[_value.balancePaymentEnable as '0'] : '';
        _value.isVerified ? (_value.isVerified = _value.isVerified ? "是": "否") : '';
        _value.repayAccountType ? _value.repayAccountType = config.repayAccountTypeState[_value.repayAccountType] : '';
        _value.weBankRepayAccountType ? _value.weBankRepayAccountType = config.repayAccountTypeState[_value.weBankRepayAccountType] : '';
        (_value.sex === 0 || _value.sex) ? _value.sex = config.sex[_value.sex as '0'] : '';
        (_value.verifyFlag === 0 || _value.verifyFlag) ? _value.verifyFlag = config.verifyFlag[_value.verifyFlag as '0'] : '';
        (_value.active===0||_value.active)?_value.active = config.isState[_value.active as '0']:'';
        (_value.isOverdue===0||_value.isOverdue)?_value.isOverdue = config.isState[_value.isOverdue as '0']:'';
        (_value.isFirstLoan===0||_value.isFirstLoan)?_value.isFirstLoan = config.isState[_value.isFirstLoan as '0']:'';
        (_value.isActivated===0||_value.isActivated)?_value.isActivated = config.isState[_value.isOverdue as '0']:'';
        (_value.loanStatus)?_value.loanStatus = config.loanStatus[_value.loanStatus as '1']:'';
        return _value;
    }
    showBlock(){
        this.setState({
            show: !this.state.show
        })
    }

    render(){
        let _height = window.innerHeight;
        return <div className='report-info-block'>
            <div onClick={this.showBlock} className='report-info-block-title'>
                <p>
                    {this.props.title}
                </p>
            </div>
            {
                ( (this.props.data && Object.keys(this.props.data).length!==0)) ? this.state.show && <ul className='report-column-fix' style={{maxHeight: (_height-400 + 'px')}}>
                    {
                        Object.keys(this.props.config).map((value, index) => {
                            return <li key={index}>
                                <p className='report-item-name'>
                                    {this.props.config[value]}
                                </p>
                                <p className='report-item-value'>
                                    {this.state.data[value] || this.props.data[value]}
                                </p>
                            </li>
                        })
                    }
                </ul> : this.state.show && <div style={{marginTop: '8px', border: '1px solid #dddddd' ,width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px', backgroundColor: '#f8f8f8'}}>
                    <p>无信息</p>
                </div>
            }
        </div>
    }
}