import * as React from 'react';
import { BankCard } from '../../components/bankCard/bankCard';
import { cardNumberToCode } from '../../components/bankCard/card';

type CardProperty =  {
    Id ?: string;
    Mobile ?: string;
    BankCode ?: string;
    BankCardNo ?: string;
    [index: string]: string;
}
interface Props {
    list: CardProperty[];
    choiceCard: (value: CardProperty)=>any;
    editorCard ?: (value: CardProperty)=>any;
}

interface State {}

export class BankCardList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    render() {
        return this.props.list.map((value, key)=>{
            let bankCode = value.BankCode;
            bankCode = /^\d*$/.test(bankCode) ? cardNumberToCode[bankCode as '01020000'] : bankCode;
            return <div key={key} onClick={()=>this.props.choiceCard(value)} style={{display: 'flex', alignItems:'center', margin: '15px'}}>
                <input type='radio' name='card' id={`card${key}`} 
                    style={{width: '24px', height: '24px'}} />
                <label htmlFor={`card${key}`}>
                    <BankCard mobile={value.Mobile} 
                        bankCode={bankCode} cardNo={value.BankCardNo} />
                </label>
                {this.props.editorCard ? <span style={{color: '#1B8DEF', cursor: 'pointer'}} onClick={(e)=>{
                    e.stopPropagation();
                    this.props.editorCard(value)
                }}>编辑</span> : ''}
            </div>
        })
    }
}