import * as React from 'react';
import { OperateTemp, BaseOperateProps } from '../../template/operateTemp';
export interface BaseButtonProps extends BaseOperateProps {
    [index : string]: any;
}

export class BaseButton extends OperateTemp<BaseButtonProps, any> {
    constructor(props: BaseButtonProps){
        super(props);
        //let _props = this.props.;
        this.state = {
            showUpdate: false,
            className: this.props.className,
            style: this.props.style
        }
        this.getMouseEvent = this.getMouseEvent.bind(this);
        this.mouseEvent = this.getMouseEvent();
    }
    mouseEvent: React.DOMAttributes<HTMLSpanElement>;
    
    //添加鼠标样式
    getMouseEvent(): React.DOMAttributes<HTMLSpanElement>{
        let _mouseEvent:React.DOMAttributes<HTMLSpanElement> = {};
        
        //是否有鼠标浮动样式
        if(this.props.mouseHover){
            Object.assign(_mouseEvent, this.isHover());  
        }

        //是否有鼠标点击样式
        if(this.props.mouseDown){
           Object.assign(_mouseEvent, this.isDown());
        }

        return _mouseEvent;
    }

    //允许改变的样式为true才可以改变
    shouldComponentUpdate(nextProps: any, nextState: any){
        return nextState.shouldUpdate || this.props.children !== nextProps.children
    }
    componentDidUpdate(){
        this.setState({
            shouldUpdate: false
        })
    }
    render(){
        let {
            style: style,
            className: className,
            ...other
        } = this.props;
        return <span role='button' {...this.mouseEvent} className={this.state.className} style={this.state.style} {...other}>
            {this.props.children}
        </span>
    }
}