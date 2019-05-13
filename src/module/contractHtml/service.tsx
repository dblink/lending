import * as React from 'react';
import {ChangeEvent} from "react";
import {matchTest} from "./MatchTest";
import {lowerToUpper} from "./lowerToUpper";
import {Sign} from "./sign";

interface Props {
    postServiceMessage ?: (money: any)=> void;
    ContractNo: any;
    BorrowName: any;
    CompanyName: any;
    IDCardNo: any;
    Period: any;
    StartTime: any;
    match:{
        params: {
            idCard: any;
            name: any;
            serviceFee: any;
            period: any;
        }
    }
    
}

export default class ServiceAgreement extends React.Component <Props, any>{
    constructor(props: any){
        super(props);
        this.state = {
            data:{},
        };
        //console.log(this.props.params.);
        this.inputChange = this.inputChange.bind(this);
        this.termChange = this.termChange.bind(this);
        this.serviceMoney = this.delayChange.call(this, this.props.postServiceMessage)
    }
    serviceMoney: any;
    termChange(e: any){
        let data = this.state.data;
        data[e.target.name] = e.target.value;
        localStorage.setItem('isServiceItem', 'true')
        this.setState({
            data: data
        })
    }
    delayChange(func ?: any){
        let setTimeFunc:any;
        return (e: ChangeEvent<HTMLInputElement>)=>{
            this.inputChange(e, () => {
                if(!func){
                    return;
                }
                setTimeFunc && clearTimeout(setTimeFunc);
                setTimeFunc = setTimeout(()=>func(this.state.data.money),1000);
            });
        };
    }
    inputChange(e: ChangeEvent<HTMLInputElement>, func: any){
        let _value = e.target.value;
        let _testValue = _value;
        if(_value[_value.length -1] === '.'){
            _testValue += '0';
        }
        //console.log(_value,matchTest(_value).isNumber());
        if(matchTest(_testValue).isNumber()){
            let _data = this.state.data;
            _data[e.target.name] = _value;
            this.setState({
                data: _data,
                big: lowerToUpper(parseFloat(_value)).big
            }, ()=>{
                localStorage.setItem('isServiceMoney', 'true');
                func()
            });
        }
        if(_value === ''){
            let _data = this.state.data;
            _data[e.target.name] = _value;
            this.setState({
                data: _data,
                big: ''
            }, ()=>{
                if(localStorage['isServiceMoney']){
                    //localStorage.removeItem
                    localStorage.removeItem('isServiceMoney');
                }
            });
        }
    }
    render(){
        return <div className="image-protocol">
            <div
                className="block-center text-left testclassName"
                id="serviceP"
            >
                <p className="print"></p>
                <p className="print"></p>
                <h1 className="text-center print">双方服务协议</h1>
                <p className="print"></p>
                <p className="print"></p>
                <p className="print text-right">编号：
                    <span className="text-under-line">
                        {this.props.ContractNo 
                            || <input placeholder='请填写编号' 
                                value={(Math.random()).toString().replace('.','').substring(0,12)}
                            style={{background: '#FFF',border: 'none', width: '260px'}} />}
                    </span>
                </p>
                <p className="print"></p>
                <div className="print">
                    <p style={{display: 'inline-block', width: '50%'}} >甲方：{this.props.CompanyName 
                        || <input placeholder='请填写甲方' style={{background: '#FFF',border: 'none', width:'80%'}} />}</p>
                    <p style={{display: 'inline-block', width: '50%'}}>乙方：
                        <span className="text-under-line">
                                {this.props.BorrowName || this.props.match.params.name
                                    || <input placeholder='请填写乙方' style={{background: '#FFF',border: 'none'}} />}
                        </span>
                    </p>

                </div>
                <p className="print"></p>
                <div className="print">
                    <p style={{display: 'inline-block', width: '50%'}}></p>
                    <p style={{display: 'inline-block', width: '50%'}}>身份证号：
                        <span className="text-under-line">
                                {this.props.IDCardNo || this.props.match.params.idCard
                                    || <input placeholder='请填写身份证号' style={{background: '#FFF',border: 'none', width:'80%'}} />}
                            </span>
                    </p>
                </div>
                <p className="print"></p>
                <p className="print">甲乙双方在平等，自愿的前提下签订本服务协议，双方保证将共同严格遵守，协议项如下：</p>
                <h3 className="print">第一条 贷款用途</h3>
                <p className="print">此款只能按国家法律规定使用，且该笔贷款仅用于乙方家庭消费，不得挪为它用；</p>
                <h3 className="print">第二条 关于相关材料的约定：</h3>
                <p className="print">1、乙方保证如实说明个人的资产负债情况，积极配合甲方对相关情况的调查，考察和核实工作。</p>
                <p className="print">2、乙方有义务积极配合甲方，并按甲方的要求提供办理贷款所必须的所有资料，并填报甲方所需资料。</p>
                <h3 className="print">第三条 服务费</h3>
                <p className="print">1、乙方愿意由借款之日起每期向甲方支付服务费（信息咨询费、贷后服务及管理费）<span className="text-under-line">
                        {/*
                            <input type={'text'} value={this.state.data.money || ''}
                               name={'money'}
                               style={{background: '#FFF',border: 'none', verticalAlign:'top'}}
                               onChange={this.serviceMoney} />
                            <span style={{color: 'red'}} className={'print-none'}>&lowast;</span>
                        */}
                        
                        <span>{this.props.match.params.serviceFee}</span>
                        </span>元（大写：<span className="text-under-line">
                            {lowerToUpper(parseFloat(this.props.match.params.serviceFee)).big|| <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                        </span>），一共支付<span className="text-under-line">
                            {this.props.match.params.period || 
                                <input type={'text'} 
                                    style={{background: '#FFF',border: 'none', fontSize: '14px',
                                     width: '30px', textAlign: 'center'}} ></input>
                            }
                                    
                        </span>期。</p>

                <p className={'print'}>支付方式
                    ：每期支付</p>
                <h3 className="print">第四条 信用承诺</h3>
                <p className="print">1、乙方提前还款，且已还款周期不满
                    <input type={'text'} value ={this.state.data.term || ''} name={'term'} 
                        style={{background: '#FFF',border: 'none', width: '30px', textAlign: 'center'}} onChange={this.termChange} ></input>
                    <span style={{color: 'red'}} className={'print-none'}>&lowast;</span>
                    期，乙方愿意支付前{this.state.data.term || <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}期服务费；</p>
                <p className="print">2、乙方出现违约情况，需支付甲方违约金，违约金=每期服务费*10%*逾期期数；例：每期服务费100元，逾期3期，违约金为：100*10%*3=30元；</p>
                <p className="print">3、乙方承诺，甲方可根据法律法规的规定或本协议的约定，采取合法途径（包括但不限于协商、请求调解、诉讼等）维护自身的合法权益，对于甲方由此所产生的一切费用（包括但不限于交通费、通信费、住宿费、行政事业性收费、诉讼费、律师费等），均应由乙方承担。</p>
                <h3 className="print">第五条 保密条款</h3>
                <p className="print">甲、乙双方应对在履行本合同过程中所获得的对方的保密信息等保密。如违约应赔偿对方的损失。</p>
                <h3 className="print">第六条 争议的解决</h3>
                <p className="print">凡因执行本协议所发生的或者与本协议有关的一切争议，首先应争取各方之间友好协商解决。如果未能协商解决，双方应向公司所在地法院提出诉讼。</p>
                <h3 className="print">第七条 其他</h3>
                <p className='print'>1、在甲乙双方同意下，且乙方无法偿还债权人债务时，该笔服务费可用来支付债权人债务；</p>
                <p className="print">2、未尽事宜，双方友好协商解决；</p>
                <p className="print">3、双方签字盖章后生效。</p>
                <p className="print"></p>
                <div className="print">
                    <p style={{display: 'inline-block', width: '50%'}}>甲方：

                    </p>
                    <p style={{display: 'inline-block', width: '50%'}}>乙方：
                        <span className="text-under-line inline-block width-percent-70" style={{verticalAlign: 'middle'}} >
                            {/*<img src="" className="serviceSignImage print-none" />*/}
                            {/*<img src='' className="serviceSignImage" />*/}
                            <Sign success={()=>{localStorage.setItem('isServiceSign', 'true')}} />
                        </span>
                    </p>
                </div>
                <p className="print"></p>
                <div className="width-full print" >
                    <p style={{display: 'inline-block', width: '50%'}}>日期：{this.props.StartTime ? new Date(this.props.StartTime).toLocaleDateString() 
                        : <input placeholder='请填写时间' style={{background: '#FFF',border: 'none'}} />}</p>
                    <p style={{display: 'inline-block', width: '50%'}}>日期：{this.props.StartTime ? new Date(this.props.StartTime).toLocaleDateString() 
                        : <input placeholder='请填写时间' style={{background: '#FFF',border: 'none'}} />}</p>
                </div>
            </div>
        </div>
    }
}