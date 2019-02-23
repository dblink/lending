import * as React from 'react';
import { BaseInput } from "./base/input";
import { config } from "./config";
import './input.scss';
import { Icon } from '../icon/icon';

interface Props extends React.InputHTMLAttributes<any>{
    
}
interface BankCardInput extends React.InputHTMLAttributes<any>{
    borderNone ?: boolean;
}
interface ApplyInput extends React.InputHTMLAttributes<any>{
    text: string;
}

export const BankCardInput = (props: BankCardInput) =>{
    let {borderNone, ...other} = props; 
    return <div className='bank-card' style={{border: borderNone ? 'none' : '1px solid #ccc'}}>
        <Icon className='bank-card-icon' style={{color: '#ccc'}}>
            idCardNo
        </Icon>
        <BaseInput className='bank-card-input' {...other} type='text' />
    </div>
};

export const ApplyInput = (props: ApplyInput)=>{
    let {text, type, ...other} = props;
    return <div>
        <div style={{fontSize: '14px', marginBottom: '10px', color: '#777'}}>
            {text}
        </div>
        <BaseInput type={type} className='apply-input' {...other} />
    </div>
}