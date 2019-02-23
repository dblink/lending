import * as React from 'react';
import { config } from './config';
import './button.scss';
import {BaseButton } from './base/button';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    width: string
}
interface ButtonProps extends React.HTMLAttributes<HTMLSpanElement>{
}


export const PrimaryButton = (props: ButtonProps) =>{
    return <BaseButton {...props} className='primary-button'/>
}

export const CancelButton = (props: ButtonProps) =>{
    return <BaseButton {...props} className='cancel-button' />
}
