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
interface ApplyInputProps extends React.InputHTMLAttributes<any>{
    text: string;
    error ?: string;
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

export class ApplyInput extends React.Component <ApplyInputProps, any>{
    updateStyle: any = {
        run: ''
    }
    render(){
        let {text, type, error, style = {}, ...other} = this.props;
        if(error){
            style.border = '1px solid red';
        }else{
            style.border = '1px solid #ccc';
        }
        if(this.updateStyle.run){
            this.updateStyle.run(style);
        }
        
        return <div>
            <div style={{fontSize: '14px', marginBottom: '10px', color: '#777'}}>
                {text}
            </div>
            {
                type === 'textarea' 
                ? <textarea className='apply-input textarea' {...other} style={style}>
                  </textarea>
                : <BaseInput type={type} updateStyle={this.updateStyle} className='apply-input' {...other} />
            }
            {
                error && <div style={{color: 'red'}}>
                    {error}
                </div>
            }
        </div>
    }
}