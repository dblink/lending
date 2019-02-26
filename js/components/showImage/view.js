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
import { OnChangeImage } from "./action";
var ImageFileView = /** @class */ (function (_super) {
    __extends(ImageFileView, _super);
    function ImageFileView(props) {
        return _super.call(this, props) || this;
        //this.fileOnchange = this.fileOnchange.bind(this);
    }
    ImageFileView.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { style: { width: '100%', height: "250px", backgroundColor: "#f2f2f2", borderRadius: "4px", border: "1px dashed #666666", position: "relative" } },
            React.createElement("div", { style: {
                    height: "250px", width: "100%", backgroundColor: "transparent", position: "absolute", top: 0, left: 0
                } },
                React.createElement("input", { type: "file", className: "z-index-100", id: 'personFile', onChange: this.fileOnchange, style: { height: "250px", width: "100%",
                        opacity: 0,
                        position: 'absolute', left: '0', top: '0',
                        backgroundColor: "transparent", cursor: "pointer" } }),
                React.createElement("canvas", { ref: function (e) { return _this.dom = e; }, style: { position: 'absolute', left: '0', top: '0' } })),
            React.createElement("div", { style: { width: "20px", height: "20px", position: "absolute", top: "50%", left: "50%", marginLeft: "-12px", marginTop: "-15px" } },
                React.createElement("div", { style: { width: "2px", height: "20px", backgroundColor: "#666666", position: "absolute", top: "0", left: "50%", marginLeft: "-1px" } }),
                React.createElement("div", { style: { width: "20px", height: "2px", backgroundColor: "#666666", position: "absolute", top: "50%", left: "0", marginTop: "-1px" } })),
            React.createElement("div", { style: { fontSize: "14px", fontWeight: "normal", width: "100%", textAlign: "center", position: "absolute", top: "50%", left: "0", marginTop: "15px", letterSpacing: "1px" } }, this.props.children));
    };
    return ImageFileView;
}(OnChangeImage));
export { ImageFileView };
//# sourceMappingURL=view.js.map