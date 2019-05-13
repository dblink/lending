import * as React from 'react';
require('./css/sign.css');
/**
 * 签名转图片
 * @param {Object} e 默认event
 * @param {Function} success 成功之后
 */
const config = {
    appVersion: window.navigator.appVersion
}
function createSign(e: any, success: (img: any)=>void){
    let reader = new FileReader();
    let _file;
    if(!e.clipboardData){
        console.error('找不到剪切版内容!');
        return;
    }

    //剪切板数据列表获取
    let _items = e.clipboardData.items[0];

    //判断是否为图片
    if (!_items || _items.type.indexOf("image") === -1) {
        //_file = _items.getAsString();
        console.error("剪贴版内不是图片");
        //console.log(_file);
        return;
    }

    //生成文件
    _file = _items.getAsFile();

    reader.readAsDataURL(_file);

    //读取
    reader.onload = function (ev:any) {
        success(ev.target.result)
    }
}

export class Sign extends React.Component <{success?: any, [index:string]: any}, any> {
    constructor(props:any){
        super(props);
        this.paste = this.paste.bind(this);
        this.state = {
            isTablet: false,
            inputState: true,
            imageState: false
        };
        this.touch = this.touch.bind(this);
        this.signFinish = this.signFinish.bind(this);
        this.closeSign = this.closeSign.bind(this);
    }
    dom: HTMLImageElement;
    input: HTMLElement;
    componentDidMount(){
        if(config.appVersion.indexOf('Mobile') !== -1){
            this.input.addEventListener('touchstart', this.touch, {passive: false})
            this.input.setAttribute('disabled','disabled')
        }else{
            this.input.addEventListener('paste', this.paste);
        }
    }
    paste(e: any){
        createSign(e, (res) => {
            //this.input.setAttribute('class', 'hidden');
            this.dom.setAttribute('src', res);
            this.setState({
                inputState: false,
                imageState: true
            });
            this.props.success && this.props.success(res);
        })
    }
    touch(e:TouchEvent){
        e.preventDefault();
        //alert(1);
        this.setState({
            isTablet: true
        })
    }
    signFinish(canvas: HTMLCanvasElement){
        let _sign = canvas.toDataURL();
        this.dom.src = _sign;
        this.setState({
            imageState: true,
            inputState: false,
        },this.closeSign)
    }
    closeSign(){
        this.setState({
            isTablet: false
        })
    }
    render(){
        return [
            <input className='print-none' ref={input=>this.input = input} key={1} style={{
                borderWidth: '0 0 1px 0', display: this.state.inputState ? '' : 'none'}}
                   placeholder={'点击开始签名'} />,
            <img ref={dom=>this.dom = dom} key={2} style={{
                maxWidth: '200px',
                width: '100%',
                display: this.state.imageState ? '' : 'none'}} />,
            this.state.isTablet && <SignDom confirm={this.signFinish} closeSign={this.closeSign} />
            ]
    }
}

interface Props {
    confirm: (cxt:HTMLCanvasElement) => void;
    closeSign: () => void;
}

interface State {
    type ?: string;
    state : boolean;
    funcName : 'orientationchange' | 'resize';
    mobileState: 'portrait' | 'landscape';
    margin ?: number;
    width: number;
    height: number;
}

class SignDom extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let version = config.appVersion;
        //动态加载高度
        let {innerHeight: height, innerWidth: width} = window;
        //let {height, width} = config;
        this.state = {
            type: version.indexOf('Mobile') === -1 ? 'pc' : 'mobile',
            state: false,
            width: !window.orientation ? width : height,
            height: !window.orientation ? height : width,
            funcName: 'onorientationchange' in window ? 'orientationchange' : 'resize',
            mobileState: !window.orientation ? 'portrait' : 'landscape'
        };
        const otherState = {
            //偏移量
            margin: (this.state.height - this.state.width) /2
        } 
        Object.assign(this.state, otherState);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.closeSign = this.closeSign.bind(this);
        this.confirm = this.confirm.bind(this);
    }
    cxt: CanvasRenderingContext2D;
    componentDidMount(){
        //监听旋转
        window.addEventListener(this.state.funcName, (e)=>{
            e.preventDefault();
            if(window.orientation == 0 || window.orientation == 180) {
                this.setState({
                    mobileState: 'portrait'
                })    
            }else {
                this.setState({
                    mobileState: 'landscape'
                });
            }
        });
        document.body.setAttribute('style', 'overflow: hidden');

        this.cxt = this.canvas.getContext("2d");
        this.cxt.lineWidth = 5;
        this.cxt.translate(this.state.width /2, this.state.height /2);
        //开始绘制
        this.canvas.addEventListener('touchstart', function(e: TouchEvent) {
            this.cxt.beginPath();
            //console.log(e);
            let _changeTouch = e.changedTouches[0];
            let {height, width} = this.state;
            //pageX
            let _drawX = _changeTouch.clientX - width /2;
            let _drawY = _changeTouch.clientY - height /2;
            if(this.state.mobileState === 'portrait'){
                this.cxt.moveTo(_drawY + this.state.margin, -(_drawX + this.state.margin));
            }else if(this.state.mobileState === 'landscape'){
                this.cxt.moveTo(_drawX, _drawY);
            }
        }.bind(this), false);
        
        //结束绘制
        this.canvas.addEventListener("touchend", function() {
            this.cxt.closePath();
        }.bind(this), false);

        //绘制中
        this.canvas.addEventListener('touchmove', (e)=>{
            e.preventDefault();
            let changedTouches = e.changedTouches;
            let {height, width} = this.state;
            let _drawX = changedTouches[0].clientX - width /2;
            let _drawY = changedTouches[0].clientY - height /2;
            if(this.state.mobileState === 'portrait'){
                this.cxt.lineTo(_drawY + this.state.margin, -(_drawX + this.state.margin));
            }else if(this.state.mobileState === 'landscape'){
                this.cxt.lineTo(_drawX, _drawY);
            }
            this.cxt.stroke();
        }, {passive: false})
        document.body.addEventListener('touchmove',this.preventDefault, {passive: false})
        
    }
    componentWillUnmount(){
        document.body.removeEventListener('touchmove',this.preventDefault);
    }
    preventDefault(e: TouchEvent){
        e.preventDefault();
    }
    getMaskStyle(): React.CSSProperties{
        if(this.state.mobileState === 'portrait'){
            //偏移量
            const {height, width} = this.state;
            const margin = this.state.margin;
            return {
                left: `${-margin}px`,
                top: `${margin}px`,
                height: `${width}px`,
                width: `${height}px`,
                transform: 'rotate(90deg)'
            }
        }else{
            return {
                left: 0,
                top: 0,
                height: '100%',
                width: '100%'
            }
        }
    }
    clearCanvas(){
        this.cxt.clearRect(-this.state.width / 2,-this.state.height /2, this.state.height, this.state.width);
    }
    closeSign(){
        document.body.setAttribute('style', 'overflow: auto');
        this.props.closeSign();
    }
    confirm(){
        document.body.setAttribute('style', 'overflow: auto');
        this.props.confirm(this.canvas);
    }
    canvas : HTMLCanvasElement;
    render() {
        return ( 
            <div className='masks' style={this.getMaskStyle()}>
                <canvas width={this.state.height} height={this.state.width} ref={e => {this.canvas = e} } ></canvas>
                <div 
                    style={{position: 'absolute',bottom: 0,width: '100%'}}>
                    <button className='mdc-button width-percent-33' onTouchStart={this.confirm} >确认</button>
                    <button className='mdc-button width-percent-33' onTouchStart={this.clearCanvas}>重制</button>
                    <button className='mdc-button width-percent-33' onTouchStart={this.closeSign}>取消</button>
                </div>
            </div>)
    }
}