import * as React from 'react';
import { config } from './config';
import './button.scss';
import {BaseButton } from './base/button';
import { Icon } from '../icon/icon';

interface ButtonProps extends React.HTMLAttributes<HTMLSpanElement>{
    type ?: 'button'
}
interface TabButtonProps extends React.HtmlHTMLAttributes<HTMLSpanElement>{
    clicked ?: boolean
}
interface PagingButtonProps extends React.HTMLAttributes<HTMLSpanElement>{
    intro : string;
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