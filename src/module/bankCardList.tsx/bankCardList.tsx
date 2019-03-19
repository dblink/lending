import * as React from 'react';
import { BankCard } from '../../components/bankCard/bankCard';

type CardProperty =  {
    Id ?: string;
    Mobile ?: string;
    BankCode ?: string;
    BankCardNo ?: string;
    [index: string]: string;
}
interface Props {
    list: CardProperty[];
    choiceCard: (value: CardProperty)=>any
}

interface State {}

export class BankCardList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.list, 'list');
        return this.props.list.map((value, key)=>{
            return <div key={key} onClick={()=>this.props.choiceCard(value)} style={{display: 'flex', alignItems:'center', margin: '15px'}}>
                <input type='radio' name='card' id={`card${key}`} 
                    style={{width: '24px', height: '24px'}} />
                <label htmlFor={`card${key}`}>
                    <BankCard mobile={value.Mobile} 
                        bankCode={value.BankCode} cardNo={value.BankCardNo} />
                </label>
            </div>
        })
    }
}