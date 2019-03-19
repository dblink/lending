import * as React from 'react';
import { cardList } from './card';
import { ApplyInput } from '../input';

export type BankMessage = {
    BankCardNo: string;
    BankCode: string;
    BankName: string;
}
interface Props extends React.InputHTMLAttributes<any> {
    isLoading: boolean;
    onSuccess : (data: BankMessage)=>void;
    onWaring : (error: string) => void;
    error: string;
}

interface State {
    bankcard: ''
}

export class BankInput extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            bankcard: ''
        };
        let _req:any = require;
        _req.ensure([], ()=>{
            this.BIN = require(/* webpackChunkName: 'bankcardinfo' */ '../bankInfo/index')
        });
        this.inputChange = this.inputChange.call(this);
        this.getBankInfo = this.getBankInfo.bind(this);
    }
    inputChange(){
        let timer: any;
        return (e: React.ChangeEvent<any>)=>{
            if(this.props.isLoading){
                return;
            }
            let _value = e.target.value;
            _value = _value.match(/\d{4}|\d{1,3}$/g);
            _value = _value ? _value.join(' ') : '';
            this.setState({
                bankcard: _value,
            },()=>{
                timer && clearTimeout(timer);
                timer = setTimeout(this.getBankInfo, 1000);
            });
        }
    }
    getBankInfo(){
        let _bankcard = this.state.bankcard.replace(/\s/g, '');
        if(this.BIN && _bankcard.length >= 15 && _bankcard.length <= 19){
            this.BIN.getBankBin(_bankcard,(err: any,data:any)=>{
                if(data){
                    if(!cardList[data.bankCode] || data.cardType === 'CC'){
                        err = '不支持该银行卡！';
                    }
                }
                if(!err){
                    this.props.onSuccess({
                        BankCardNo:_bankcard,
                        BankCode: data.bankCode,
                        BankName: cardList[data.bankCode]
                    });
                }else{
                    this.props.onWaring(err.replace(/^\d*:|,.*/g,''))
                }
            })
        }
    }
    // timer: any;
    BIN: any;
    render() {
        let {onSuccess, isLoading, onWaring, ...other} = this.props;
        return <ApplyInput text='银行卡：' name={'bankcard'}
            value={this.state.bankcard}
            {...other} onChange={this.inputChange} />
    }
}