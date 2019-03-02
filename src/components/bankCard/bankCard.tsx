import * as React from 'react';
import { Icon } from '../icon/icon';
import {cardList, cardColor, cardBackgroundColor} from './card';


interface Props {
    cardNo: string;
    mobile: string;
    bankCode: string;
}

interface State {
    cardNo: string;
    cardName: string;
    mobile: string;
}

export class BankCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let _cardNo = props.cardNo.toString(),
            _mobile = props.mobile.toString();
        this.state = {
            cardNo: _cardNo.match(/.{4}|.{1,3}$/g).join(' '),
            cardName: cardList[this.props.bankCode as 'CCB'],
            mobile: _mobile.match(/^.{3}|.{4}$/g).join('****')
        };
    }

    render() {
        return <div className='flex-space-around' style={{
                    background: cardColor[this.props.bankCode as 'CCB'],
                    flexDirection: 'column',
                    borderRadius: '10px',
                    padding: '20px',
                    height: '150px',
                    width: '300px',
                    backgroundImage: `linear-gradient(to right, ${cardBackgroundColor[this.props.bankCode as 'CCB']} )`
                }}>
            <div className='flex-space-between'>
                <div style={{padding: '6px',background: '#FFF',
                    borderRadius:'50%'}}>
                    <Icon style={{color: cardColor[this.props.bankCode as 'CCB']}}>
                        home
                    </Icon>
                </div>
                <div style={{color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center',
                    fontSize: '16px',
                    justifyContent: 'center'}} >
                    {this.state.cardName}
                </div>
                <div style={{display: 'inline-flex', alignItems: 'center'}}>
                    <span style={{color: "#fff", fontSize: '16px'}}>
                        {this.state.mobile}
                    </span>
                </div>   
            </div>   
            <div style={{textAlign: 'center'}}>
                <span style={{color: "#fff", fontSize: '20px'}}>
                    {this.state.cardNo}
                </span>
            </div>  
        </div>
    }
}