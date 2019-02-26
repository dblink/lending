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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { OperateTemp } from '../../template/operateTemp';
var BaseButton = /** @class */ (function (_super) {
    __extends(BaseButton, _super);
    function BaseButton(props) {
        var _this = _super.call(this, props) || this;
        //let _props = this.props.;
        _this.state = {
            showUpdate: false,
            className: _this.props.className,
            style: _this.props.style
        };
        _this.getMouseEvent = _this.getMouseEvent.bind(_this);
        _this.mouseEvent = _this.getMouseEvent();
        return _this;
    }
    //添加鼠标样式
    BaseButton.prototype.getMouseEvent = function () {
        var _mouseEvent = {};
        //是否有鼠标浮动样式
        if (this.props.mouseHover) {
            Object.assign(_mouseEvent, this.isHover());
        }
        //是否有鼠标点击样式
        if (this.props.mouseDown) {
            Object.assign(_mouseEvent, this.isDown());
        }
        return _mouseEvent;
    };
    //允许改变的样式为true才可以改变
    BaseButton.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return nextState.shouldUpdate
            || this.props.className !== nextProps.className
            || this.props.children !== nextProps.children;
    };
    BaseButton.prototype.componentDidUpdate = function () {
        this.setState({
            shouldUpdate: false
        });
    };
    BaseButton.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, other = __rest(_a, ["style", "className"]);
        return React.createElement("span", __assign({ role: 'button' }, this.mouseEvent, { className: this.state.className, style: this.state.style }, other), this.props.children);
    };
    return BaseButton;
}(OperateTemp));
export { BaseButton };
//# sourceMappingURL=button.js.map