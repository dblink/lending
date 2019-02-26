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
import * as React from 'react';
var TableComponent = /** @class */ (function () {
    function TableComponent(type) {
        var _this = this;
        this.height = 48;
        switch (type) {
            case 'commonTable': {
                this.TableCell = function (props) {
                    return React.createElement("td", __assign({}, props), props.children);
                };
                this.TableMain = function (props) {
                    return React.createElement("table", __assign({}, props), props.children);
                };
                this.TableRow = function (props) {
                    return React.createElement("tr", __assign({}, props), props.children);
                };
                this.TableHead = function (props) {
                    var TableRow = _this.TableRow;
                    return React.createElement("thead", null,
                        React.createElement(TableRow, __assign({}, props), props.children));
                };
                this.TableBody = function (props) {
                    return React.createElement("tbody", null, props.children);
                };
            }
        }
    }
    return TableComponent;
}());
export { TableComponent };
//# sourceMappingURL=baseTableElement.js.map