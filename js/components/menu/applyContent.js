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
import { Vertical } from './base/vertical';
var ApplyContent = /** @class */ (function (_super) {
    __extends(ApplyContent, _super);
    function ApplyContent(props) {
        var _this = _super.call(this, props) || this;
        _this.arr = [{
                text: '申请借款信息',
                name: 'ISApply',
                iconName: 'borrowInfo',
                isMust: true,
            }, {
                text: '借款人信息',
                iconName: 'personInfo',
                name: 'ISExsitBorrower',
                isMust: true
            }, {
                text: '实名认证',
                iconName: 'authentication',
                name: 'ISUploadPersonCardState',
                isMust: true
            }, {
                text: '借款人详细信息',
                iconName: 'detailInfo',
                name: 'ISExsitBorrowerDetail'
            }, {
                text: '蜜罐',
                iconName: 'miguanReport',
                name: 'HoneypotStatus'
            }, {
                text: '蜜蜂',
                name: 'HoneyBeeStatus',
                iconName: 'juxinliReport'
            }, {
                text: '支付宝',
                name: 'Alipay',
                iconName: 'zhifubaoReport'
            }];
        _this.state = {};
        _this.stateDom = _this.stateDom.bind(_this);
        return _this;
    }
    ApplyContent.prototype.stateDom = function (name) {
        if (this.props.dataState[name]) {
            return React.createElement("span", { style: { color: 'green' } }, "\u5DF2\u5B8C\u6210");
        }
        else {
            return React.createElement("span", { style: { color: 'red' } }, "\u672A\u586B\u5199");
        }
    };
    ApplyContent.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { style: { borderTop: '10px solid #F6F6F6' } }, this.arr.map(function (value) {
            return React.createElement(Vertical, { onClick: function () { return _this.props.onChangeStep('applyListDetail', value.name); }, isMust: value.isMust, text: value.text, iconName: value.iconName, default: _this.stateDom(value.name) });
        }));
    };
    return ApplyContent;
}(React.Component));
export { ApplyContent };
//# sourceMappingURL=applyContent.js.map