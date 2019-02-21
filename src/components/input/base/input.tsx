import * as React from 'react';
import { OperateTemp, OperateTempState, BaseOperateProps } from '../../template/operateTemp';

export interface BaseInputProps extends BaseOperateProps { 
    type: React.HTMLAttributes<'HTMLInputElement'>['itemType'];
    mouseFocus ?: string | React.CSSProperties;
    [index: string]: any;
}

interface State extends OperateTempState{

}

export class BaseInput extends OperateTemp<BaseInputProps, State> {
    constructor(props: BaseInputProps) {
        super(props);
        this.state = {
            shouldUpdate: true,
            className: this.props.className,
            style: this.props.style,
        };
        this.getMouseEvent = this.getMouseEvent.bind(this);
        this.mouseEvent = this.getMouseEvent();
    }
    mouseEvent: React.DOMAttributes<HTMLInputElement>
    getMouseEvent(): React.DOMAttributes<HTMLInputElement>{
        let mouseEvent: React.DOMAttributes<HTMLInputElement> = {};
        if(this.props.mouseHover){
            Object.assign(mouseEvent, this.isHover());
        }
        if(this.props.mouseDown){
            Object.assign(mouseEvent, this.isDown());
        }
        if(this.props.mouseFocus){
            mouseEvent.onFocus = this.onFocusHandler.bind(this);
            mouseEvent.onBlur = this._onMouseRestoreHandler.bind(this);
        }
        return mouseEvent
    }
    onFocusHandler(e: any){
        if(typeof this.props.mouseFocus === 'string'){
            this.updateClassName(this.props.mouseFocus);
        }else{
            this.updateStyle(this.props.mouseFocus);
        }
    }
    shouldComponentUpdate(nextProps: any, nextState: State){
        return nextState.shouldUpdate || this.props.value !== nextProps.value
    }
    componentDidUpdate(){
        this.setState({
            shouldUpdate: false
        })
    }
    
    render() {
        let {
            className: className,
            mouseDown: mouseDown,
            mouseHover: mouseHover,
            mouseFocus: mouseFocus,
            style: style,
            type: type,
            ...other
        } = this.props;
        return <input style={this.state.style} {...this.mouseEvent}
        className={this.state.className} type={this.props.type || 'text'}  
        {...other} />
    }
}