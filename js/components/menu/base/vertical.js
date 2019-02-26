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
import { Icon } from '../../icon/icon';
import './vertical.scss';
var Vertical = /** @class */ (function (_super) {
    __extends(Vertical, _super);
    function Vertical(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Vertical.prototype.render = function () {
        return React.createElement("div", { className: 'vertical', style: { fontSize: '14px' }, onClick: this.props.onClick },
            React.createElement("div", null,
                this.props.iconName
                    && React.createElement(Icon, { style: { color: '#1B8DEF' } }, this.props.iconName),
                React.createElement("span", { style: { marginLeft: '20px', color: '#444' } },
                    this.props.text,
                    this.props.isMust && React.createElement("span", { style: { color: 'red' } }, "\u2217"))),
            React.createElement("div", null,
                this.props.default || '',
                React.createElement(Icon, { style: { marginLeft: '15px', color: '#ccc' } }, ">")));
    };
    return Vertical;
}(React.Component));
export { Vertical };
//# sourceMappingURL=vertical.js.map