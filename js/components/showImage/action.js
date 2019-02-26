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
var OnChangeImage = /** @class */ (function (_super) {
    __extends(OnChangeImage, _super);
    function OnChangeImage(props) {
        var _this_1 = _super.call(this, props) || this;
        _this_1.fileOnchange = _this_1.fileOnchange.bind(_this_1);
        return _this_1;
    }
    OnChangeImage.prototype.fileOnchange = function (e) {
        var _this_1 = this;
        if (this.props.loading) {
            e.preventDefault();
            return;
        }
        var file = e.target.files[0];
        if (!file)
            return;
        var reader = new FileReader();
        var _this = this;
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            var result = event.target.result; // base64格式图片地址
            var image = new Image();
            var _this = _this_1;
            //image.setAttribute('style', 'width: 500px');
            image.src = result; // 设置image的地址为base64的地址
            image.onload = function () {
                var imageWidth = image.width;
                var imageHeight = image.height;
                var _marginX;
                imageWidth = 250 * imageWidth / imageHeight;
                imageHeight = 250;
                _marginX = (500 - imageWidth) / 2;
                //let canvas = document.createElement('canvas');
                //let canvas = document.querySelector(`#${_this.props.canvasId}`) as HTMLCanvasElement;
                var canvas = _this.dom;
                var context = canvas.getContext("2d");
                canvas.width = 500; // 设置canvas的画布宽度为图片宽度
                canvas.height = 250;
                canvas.setAttribute('class', 'z-index-1');
                context.drawImage(image, _marginX, 0, imageWidth, imageHeight); // 在canvas上绘制图片
                //let dataUrl = canvas.toDataURL('image/jpeg', 0.92);// 0.92为压缩比，可根据需要设置，设置过小会影响图片质量
                // dataUrl 为压缩后的图片资源，可将其上传到服务器
                //_this.props.getData(_this.props.name, file);
                _this.props.getData(_this.props.name, canvas);
            };
        };
    };
    return OnChangeImage;
}(React.Component));
export { OnChangeImage };
//# sourceMappingURL=action.js.map