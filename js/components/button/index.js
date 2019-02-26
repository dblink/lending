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
import './button.scss';
import { BaseButton } from './base/button';
export var PrimaryButton = function (props) {
    return React.createElement(BaseButton, __assign({}, props, { className: 'primary-button' }));
};
export var CancelButton = function (props) {
    return React.createElement(BaseButton, __assign({}, props, { className: 'cancel-button' }));
};
export var TabButton = function (props) {
    var clicked = props.clicked, other = __rest(props, ["clicked"]);
    return React.createElement("div", { className: "" + (clicked ? 'tab-clicked' : 'tab') },
        React.createElement(BaseButton, __assign({}, other, { className: "tab-button" })));
};
export var HrefButton = function (props) {
    return React.createElement(BaseButton, __assign({ className: 'href-button' }, props));
};
//# sourceMappingURL=index.js.map