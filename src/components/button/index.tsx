import * as React from 'react';
import { config } from './config';
import './button.scss';
import {BaseButton } from './base/button';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    width: string
}
interface ButtonProps extends React.HTMLAttributes<HTMLSpanElement>{
}
interface TabButtonProps extends React.HtmlHTMLAttributes<HTMLSpanElement>{
    clicked ?: boolean
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