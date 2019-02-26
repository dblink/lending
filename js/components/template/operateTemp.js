var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
var OperateTemp = /** @class */ (function (_super) {
    __extends(OperateTemp, _super);
    function OperateTemp(props) {
        return _super.call(this, props) || this;
    }
    //重置鼠标样式
    OperateTemp.prototype._onMouseRestoreHandler = function (e) {
        this.setState({
            shouldUpdate: true,
            style: this.props.style,
            className: this.props.className
        });
    };
    OperateTemp.prototype._onMouseEnterHandler = function (e) {
        //如果是string类型（className）更新className
        if (typeof this.props.mouseHover === 'string') {
            this.updateClassName.call(this, this.props.mouseHover);
        }
        else {
            this.updateStyle(this.props.mouseHover);
        }
    };
    OperateTemp.prototype.updateClassName = function (className) {
        this.setState({
            shouldUpdate: true,
            style: this.props.style,
            className: this.state.className + " " + className
        });
    };
    OperateTemp.prototype.updateStyle = function (style) {
        var _style = this.state.style;
        //初始化 className 并且改变 style
        this.setState({
            shouldUpdate: true,
            style: Object.assign({}, _style, style),
            className: this.props.className
        });
    };
    OperateTemp.prototype._onMouseDownHandler = function (e) {
        if (typeof this.props.mouseDown === 'string') {
            this.updateClassName(this.props.mouseDown);
        }
        else {
            this.updateStyle(this.props.mouseDown);
        }
    };
    OperateTemp.prototype._onMouseUpHandler = function (e) {
        if (this.props.mouseHover) {
            this._onMouseEnterHandler(e);
        }
        else {
            this._onMouseRestoreHandler(e);
        }
    };
    OperateTemp.prototype.isHover = function () {
        var _mouseOver = {
            onMouseLeave: this._onMouseRestoreHandler.bind(this),
            onMouseEnter: this._onMouseEnterHandler.bind(this)
        };
        return _mouseOver;
    };
    OperateTemp.prototype.isDown = function () {
        var _mouseDown = {
            onMouseDown: this._onMouseDownHandler.bind(this),
            onMouseUp: this._onMouseUpHandler.bind(this)
        };
        return _mouseDown;
    };
    return OperateTemp;
}(React.Component));
export { OperateTemp };
//# sourceMappingURL=operateTemp.js.map