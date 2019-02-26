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
import { BaseInput } from "./base/input";
import './input.scss';
import { Icon } from '../icon/icon';
export var BankCardInput = function (props) {
    var borderNone = props.borderNone, other = __rest(props, ["borderNone"]);
    return React.createElement("div", { className: 'bank-card', style: { border: borderNone ? 'none' : '1px solid #ccc' } },
        React.createElement(Icon, { className: 'bank-card-icon', style: { color: '#ccc' } }, "idCardNo"),
        React.createElement(BaseInput, __assign({ className: 'bank-card-input' }, other, { type: 'text' })));
};
export var ApplyInput = function (props) {
    var text = props.text, type = props.type, other = __rest(props, ["text", "type"]);
    return React.createElement("div", null,
        React.createElement("div", { style: { fontSize: '14px', marginBottom: '10px', color: '#777' } }, text),
        React.createElement(BaseInput, __assign({ type: type, className: 'apply-input' }, other)));
};
//# sourceMappingURL=index.js.map