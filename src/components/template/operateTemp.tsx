import * as React from 'react';
export interface OperateTempState{
    shouldUpdate ?: boolean;
    style ?: React.CSSProperties;
    className ?: string;
}
export interface BaseOperateProps {
    style ?: React.CSSProperties;
    className ?: string;
    mouseHover ?: React.CSSProperties | string;
    mouseDown ?: React.CSSProperties | string;
}
export class OperateTemp <P, S extends OperateTempState> extends React.Component<BaseOperateProps & P , OperateTempState & S, any> {
    constructor(props: P){
        super(props);
    }
    //重置鼠标样式
    _onMouseRestoreHandler(e:any){
        this.setState({
            shouldUpdate: true,
            style: this.props.style,
            className: this.props.className
        });
    }
    _onMouseEnterHandler(e: any){
        //如果是string类型（className）更新className
        if(typeof this.props.mouseHover === 'string'){
            this.updateClassName.call(this,this.props.mouseHover);
            
        }else{
            this.updateStyle(this.props.mouseHover as React.CSSProperties );
        }
        
    }
    updateClassName(className: string){
        this.setState({
            shouldUpdate: true,
            style: this.props.style,
            className: `${this.state.className} ${className}`
        })
    }
    
    updateStyle(style: React.CSSProperties){
        let _style = this.state.style;
            //初始化 className 并且改变 style
            this.setState({
                shouldUpdate: true,
                style: Object.assign({}, _style, style),
                className: this.props.className
            })
    }

    _onMouseDownHandler(e: any){
        if(typeof this.props.mouseDown === 'string'){
            this.updateClassName(this.props.mouseDown)
        }else{
            this.updateStyle(this.props.mouseDown as React.CSSProperties)
        }
    }
    _onMouseUpHandler(e: any){
        if(this.props.mouseHover){
            this._onMouseEnterHandler(e);
        }else{
            this._onMouseRestoreHandler(e);
        }
    }
    isHover(){
        let _mouseOver: React.HTMLAttributes<any> = {
            onMouseLeave: this._onMouseRestoreHandler.bind(this),
            onMouseEnter: this._onMouseEnterHandler.bind(this)
        }
        return _mouseOver;
    }
    isDown(){
        let _mouseDown: React.HTMLAttributes<any> = {
            onMouseDown : this._onMouseDownHandler.bind(this),
            onMouseUp : this._onMouseUpHandler.bind(this)
        }
        return _mouseDown;
    }
}