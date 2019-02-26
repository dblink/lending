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
import { BaseSelect } from './base/select';
import './select.scss';
export var ApplySelect = function (props) {
    var value = props.value, text = props.text, other = __rest(props, ["value", "text"]);
    return React.createElement("div", null,
        React.createElement("div", { style: { fontSize: '14px', marginBottom: '10px', color: '#777' } }, text),
        React.createElement(BaseSelect, __assign({ className: 'apply-select' }, other, { value: value, style: { color: value ? '#777' : '#ccc' } }),
            React.createElement("option", { selected: true, disabled: true }, "\u8BF7\u9009\u62E9\u5A5A\u59FB\u60C5\u51B5"),
            React.createElement("option", { value: '0' }, "\u5DF2\u5A5A"),
            React.createElement("option", { value: '1' }, "\u672A\u5A5A")));
};
//# sourceMappingURL=index.js.map