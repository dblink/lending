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
import { TableComponent } from './baseTableElement';
//import { TableComponent } from './baseTableElement';
//const TableComponent = require('./baseTableElement');
export var Table;
(function (Table) {
    var CommonTable = /** @class */ (function (_super) {
        __extends(CommonTable, _super);
        function CommonTable(props) {
            return _super.call(this, props) || this;
        }
        CommonTable.prototype.render = function () {
            var _this = this;
            var _a = new TableComponent('commonTable'), TableMain = _a.TableMain, TableHead = _a.TableHead, TableCell = _a.TableCell, TableBody = _a.TableBody, TableRow = _a.TableRow;
            return React.createElement(TableMain, { className: this.props.className, style: { borderCollapse: 'collapse',
                    fontSize: '14px',
                    textAlign: 'center', width: '100%' } },
                this.props.title &&
                    React.createElement("caption", null, this.props.title),
                React.createElement(TableHead, { style: { background: '#eee' } }, Object.keys(this.props.head).map(function (value, index) {
                    return React.createElement(TableCell, { key: index, style: { padding: '10px' } }, _this.props.head[value]);
                })),
                React.createElement(TableBody, null, this.props.list.map(function (listLine, sub) {
                    return React.createElement(TableRow, { key: sub, style: { borderBottom: '1px solid #eee' } }, Object.keys(_this.props.head).map(function (value, index) {
                        var _value = listLine[value];
                        if (value.toLowerCase().indexOf('time') !== -1) {
                            _value = new Date(_value).toLocaleDateString();
                        }
                        return React.createElement(TableCell, { key: index, style: { padding: '10px' } }, _value);
                    }));
                })));
        };
        return CommonTable;
    }(React.Component));
    Table.CommonTable = CommonTable;
})(Table || (Table = {}));
//# sourceMappingURL=commonTable.js.map