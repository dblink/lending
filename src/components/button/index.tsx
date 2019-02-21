import * as React from 'react';
import { config } from './config';
import {BaseButton } from './base/button';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    width: string
}
interface PrimaryButtonProps extends React.HTMLAttributes<HTMLSpanElement>{
    
}
export class PrimaryButton extends React.Component<PrimaryButtonProps, any>{
    render(){
        return <BaseButton {...config.windPrimaryButton} {...this.props} >
            {this.props.children}
        </BaseButton>
    }
}
export class Icon extends React.Component<IconProps, any>{
    render(){
        let _style: React.CSSProperties = config.icon.style;
        _style.width = this.props.width;
        _style.height = this.props.width;
        _style.lineHeight = this.props.width;
        config.icon.style = _style;
        return <BaseButton {...config.icon} {...this.props} >
            {this.props.children}
        </BaseButton>
    }
}