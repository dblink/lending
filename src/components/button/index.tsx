import * as React from 'react';
import { config } from './config';
import './button.scss';
import {BaseButton } from './base/button';
import { Icon } from '../icon/icon';

type Button = React.HTMLAttributes<HTMLSpanElement>;
interface ButtonProps extends Button{
    type ?: 'button'
}
interface TabButtonProps extends Button{
    clicked ?: boolean
}
interface PagingButtonProps extends Button{
    intro : string;
}
interface TimerButtonProps extends Button{
    time ?: number | string;
    onClick : any;
}

export const PrimaryButton = (props: ButtonProps) =>{
    return <BaseButton {...props} className='primary-button'/>
}

export const CancelButton = (props: ButtonProps) =>{
    return <BaseButton {...props} className='cancel-button' />
}

export const TabButton = (props: TabButtonProps) => {
    let {clicked, ...other} = props;
    return <div className={`${clicked ? 'tab-clicked' : 'tab'}`}>
        <BaseButton {...other} className={`tab-button`} />
    </div>
}
export const HrefButton = (props: ButtonProps) => {
    return <BaseButton className='href-button' {...props} />
}

export const PagingButton = (props: PagingButtonProps) =>{
    let {intro, children, ...other} = props;
    return <BaseButton className='paging-button' {...other}
            data-content={intro}>
        <Icon>
            {props.children}
        </Icon>
    </BaseButton>
        
}
export class TimerButton extends React.Component <TimerButtonProps, any>{
    constructor(props: TimerButtonProps){
        super(props);
        this.state = {
            time: props.time || 60,
            isLock: false,
            initTime: props.time || 60
        }
        this.click = this.isTimeDirect.call(this, 
            ()=>{
                this.setState({
                    isLock: true
                }, ()=>{
                    this.timer();
                    this.props.onClick(this.stopTimer.bind(this))
                })
            });
    }
    isTimeDirect(func: any){
        return (...args: any)=>{
            if(this.state.isLock){
                return;
            }
            func(...args)
        }
    }
    stopTimer(){
        this.setState({
            time: 0
        })
    }
    timer(){
        setTimeout(()=>{
            this.setState({
                time: this.state.time - 1
            },()=>{
                if(this.state.time <= 0){
                    this.setState({
                        time: this.state.initTime,
                        isLock: false
                    })
                }else{
                    this.timer()
                }
            })
        }, 1000)
    }
    click: any
    render(){
        let {onClick, children, ...other} = this.props;
        return <PrimaryButton onClick={this.click} {...other}>
            {
                this.state.time !== this.state.initTime ? this.state.time :this.props.children
            }
        </PrimaryButton>
    }
}