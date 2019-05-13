import * as React from 'react';
import { BaseInput } from "./base/input";
import './input.scss';
import { Icon } from '../icon/icon';
import { CalendarScreen } from '../calendar/calendarScreen';
import { PrimaryButton, TimerButton } from '../button';

interface Props extends React.InputHTMLAttributes<any>{
    
}
interface BankCardInput extends React.InputHTMLAttributes<any>{
    borderNone ?: boolean;
}
interface ApplyInputProps extends React.InputHTMLAttributes<any>{
    text: string;
    error ?: string;
    sendMessage ?: any;
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
    constructor(props: ApplyInputProps){
        super(props);
        this.changeInputStyle = this.changeInputStyle.bind(this);
    }
    updatestyle: any = {
        run: ''
    }
    changeInputStyle(style: React.CSSProperties){
        if(this.updatestyle.run){
            this.updatestyle.run(style);
        }
    }
    componentWillUpdate(nextProps: ApplyInputProps){
        let style = nextProps.style || {};
        if(nextProps.error){
            style.border = '1px solid red';
            this.changeInputStyle(style);
        }
        if(this.props.error){
            style.border = '1px solid #ccc';
            this.changeInputStyle(style);
        }
    }
    render(){
        let {text, type, error, style = {}, ...other} = this.props;
        return <div>
            <div style={{fontSize: '14px', marginBottom: '10px', color: '#777'}}>
                {text}
            </div>
            <div style={{display: 'flex'}}>
            {
                type === 'textarea' 
                ? <textarea className='apply-input textarea' {...other} style={style}>
                  </textarea>
                : <BaseInput type={type} updatestyle={this.updatestyle} className='apply-input' {...other} />
            }
            {
                this.props.sendMessage
                ? <TimerButton onClick={this.props.sendMessage}>发送验证码</TimerButton>
                : ''
            }
            </div>
            
            {
                error && <div style={{color: 'red'}}>
                    {error}
                </div>
            }
        </div>
    }
}

interface SearchInputProps extends Props {
    text: string;
}

export const SearchInput = (props: SearchInputProps) =>{
    let {text, type, style, ...other} = props;
    return <span style={{display: 'inline-flex', alignItems:'center', padding: '1px', fontSize: '14px', justifyContent: 'center', ...style}}>
        <span style={{flex: '1'}}>{props.text}:</span> 
        <BaseInput className='search-input' 
            style={{flex: '2', fontSize: '14px', display:'inline-block'}} type={type} {...other} />
    </span>
}

export class CalendarInput extends React.Component<SearchInputProps, any> {
    constructor(props: SearchInputProps){
        super(props);
        this.state ={
            show: false
        }
        
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getCalendar = this.getCalendar.bind(this);
    }
    componentDidMount(){
        document.body.addEventListener('click', this.closeModal);
    }
    closeModal(){
        this.setState({
            show: false
        })
    }
    showModal(e: React.ChangeEvent<HTMLInputElement>){
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            show: true
        });
    }
    componentWillUnmount(){
        document.body.removeEventListener('click', this.closeModal);
    }
    getCalendar(name: string, value: any){
        let data:any = {
            target:{
                name: name,
                value: value
            }
        };
        this.props.onChange(data);
    }
    render(){
        let {value, name,text, onChange, style, ...other} = this.props;
        return <div style={{display: 'flex', 
            alignItems: 'center',...style,}}>
            <span style={{flex: 1,fontSize: '14px'}}>{text}:</span>
            <div  style={{flex: 2}}>
                <BaseInput type='text' readOnly
                    style={{width: '100%', fontSize: '14px', 
                    background: 'none',
                    height: '100%',border: 'none'}} {...other} onClick={this.showModal} value={value} />
                {this.state.show && <CalendarScreen name={name} 
                    date={value} close={this.closeModal}
                    getCalendar={this.getCalendar} />}
            </div>
            
        </div>
    }
    
}