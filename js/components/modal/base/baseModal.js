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
import './baseModal.scss';
var BaseModal = /** @class */ (function (_super) {
    __extends(BaseModal, _super);
    function BaseModal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    BaseModal.prototype.render = function () {
        var _a = this.props, isOpen = _a.isOpen, other = __rest(_a, ["isOpen"]);
        return isOpen ? React.createElement("div", { className: 'curtain' }, this.props.children) : '';
    };
    return BaseModal;
}(React.Component));
export { BaseModal };
//# sourceMappingURL=baseModal.js.map