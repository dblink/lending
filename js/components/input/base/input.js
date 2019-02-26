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
var BaseInput = /** @class */ (function (_super) {
    __extends(BaseInput, _super);
    function BaseInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            shouldUpdate: true,
            className: _this.props.className,
            style: _this.props.style,
        };
        _this.getMouseEvent = _this.getMouseEvent.bind(_this);
        _this.mouseEvent = _this.getMouseEvent();
        return _this;
    }
    BaseInput.prototype.getMouseEvent = function () {
        var mouseEvent = {};
        if (this.props.mouseHover) {
            Object.assign(mouseEvent, this.isHover());
        }
        if (this.props.mouseDown) {
            Object.assign(mouseEvent, this.isDown());
        }
        if (this.props.mouseFocus) {
            mouseEvent.onFocus = this.onFocusHandler.bind(this);
            mouseEvent.onBlur = this._onMouseRestoreHandler.bind(this);
        }
        return mouseEvent;
    };
    BaseInput.prototype.onFocusHandler = function (e) {
        if (typeof this.props.mouseFocus === 'string') {
            this.updateClassName(this.props.mouseFocus);
        }
        else {
            this.updateStyle(this.props.mouseFocus);
        }
    };
    BaseInput.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return nextState.shouldUpdate || this.props.value !== nextProps.value;
    };
    BaseInput.prototype.componentDidUpdate = function () {
        this.setState({
            shouldUpdate: false
        });
    };
    BaseInput.prototype.render = function () {
        var _a = this.props, className = _a.className, mouseDown = _a.mouseDown, mouseHover = _a.mouseHover, mouseFocus = _a.mouseFocus, style = _a.style, type = _a.type, other = __rest(_a, ["className", "mouseDown", "mouseHover", "mouseFocus", "style", "type"]);
        return React.createElement("input", __assign({ style: this.state.style }, this.mouseEvent, { className: this.state.className, type: this.props.type || 'text' }, other));
    };
    return BaseInput;
}(OperateTemp));
export { BaseInput };
//# sourceMappingURL=input.js.map