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
import { interfaceSetting } from "./setting";
var formatParams = function (jsonParams) {
    var array = [];
    Object
        .keys(jsonParams)
        .map(function (e) {
        array.push(e + "=" + jsonParams[e]);
    });
    return array.join("&");
};
var AjaxRequest = /** @class */ (function () {
    function AjaxRequest() {
        this.xhr = new XMLHttpRequest();
    }
    AjaxRequest.prototype.sendMessage = function () {
        if (!this.options.data) {
            console.error("nodata");
            return;
        }
        //let _baseUrl = 0 ? 'http://lotusapi.hehuadata.com' : '';
        var _baseUrl = '	http://192.168.1.121:7000';
        var _url = [_baseUrl, this.options.url].join('');
        var params = formatParams(this.options.data);
        if (this.options.type === "GET" || this.options.type === 'get') {
            this
                .xhr
                .open("GET", _url + "?" + params, true);
            this
                .xhr.setRequestHeader("Control-Allow-Origin", "*");
            this
                .xhr
                .send(null);
        }
        else if (this.options.type === "POST" || this.options.type === 'post') {
            this
                .xhr
                .open("POST", _url, true);
            if (this.options.contentType !== "application/x-www-form-urlencoded") {
                params = this.options.data;
            }
            else {
                this
                    .xhr
                    .setRequestHeader("Content-Type", this.options.contentType);
            }
            this
                .xhr
                .send(params);
        }
        this.xhr.onreadystatechange = this.callBack.bind(this);
    };
    ;
    AjaxRequest.prototype.closeXHR = function () {
        this.xhr.abort();
    };
    AjaxRequest.prototype.callBack = function () {
        var xhr = this.xhr;
        if (xhr.readyState === 4) {
            var status_1 = xhr.status;
            var data = void 0;
            if (status_1 >= 200 && status_1 < 300) {
                try {
                    data = JSON.parse(xhr.response);
                }
                catch (e) {
                    data = xhr.response;
                }
                this.options.succeed(data, xhr.responseXML);
            }
            else {
                var errorObject = {
                    ErrMsg: xhr.responseText,
                    Status: "FAILURE",
                    Value: ""
                };
                this.options.fail(errorObject, xhr.responseXML);
            }
        }
    };
    ;
    return AjaxRequest;
}());
var Ajax = /** @class */ (function (_super) {
    __extends(Ajax, _super);
    function Ajax() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.date = new Date();
        _this.closeArray = [];
        _this.action = function (options) {
            Object.assign(_this.options, {
                type: 'GET',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded"
            }, options);
            //console.log(this.options, 109);
            //测试用例
            var _data = {
                ErrMsg: '',
                Status: 'SUCCESS',
                Value: {}
            };
            _this.succeed(_this.options.succeed)(_data);
            //this.sendMessage();
        };
        _this.timer = '';
        return _this;
    }
    /**
     * 获取options.data数据
     * @param data options.data
     */
    Ajax.prototype.getData = function (data) {
        var isFormData = typeof data.get === "function";
        return function (name) {
            if (isFormData) {
                return data.get(name);
            }
            else {
                return data[name];
            }
        };
    };
    /**
     * 设置options.data数据
     * @param data options.data
     */
    Ajax.prototype.setData = function (data) {
        var isFormData = typeof data.get === "function";
        return function (name, value) {
            if (isFormData) {
                data.set(name, value);
            }
            else {
                data[name] = value;
            }
        };
    };
    //错误检测
    Ajax.prototype.errorDetection = function () {
        return;
    };
    Ajax.prototype._main = function () {
        var type, options, _options, names;
        type = this.type;
        options = this.options;
        //合并
        _options = Object.assign(interfaceSetting[type], options);
        //错误信息
        names = _options.error ? Object.keys(_options.error) : [];
        var _getDataFunc = this.getData(_options.data);
        for (var i = 0; i < names.length; i++) {
            var _name = names[i];
            //错误检测
            if (!_getDataFunc(_name)) {
                var _error = {
                    Status: "FAILURE",
                    ErrMsg: _options.error[_name],
                    Value: ""
                };
                options.fail(_error);
                return;
            }
        }
        this.action(_options);
    };
    Ajax.prototype.main = function () {
        this._main();
    };
    Ajax.prototype.then = function (func) {
        func(this);
    };
    Ajax.prototype.closeFunc = function (json) {
        if (!json.value) {
            return;
        }
        if (typeof json.value === "number") {
            clearTimeout(json.value);
        }
        else {
            json.value.closeXHR();
            //this.closeXHR();
        }
    };
    Ajax.prototype.close = function () {
        this.closeArray.map(this.closeFunc);
        this.closeXHR();
    };
    Ajax.prototype.failure = function (func) {
        var _this = this;
        return function (data) {
            //console.log(data);
            var time = 2;
            var duration = time * 1000 - (new Date().getTime() - _this.startTime);
            var _arr = setTimeout(function () {
                if (data.ErrMsg === '令牌失效！') {
                    alert('登录失效！');
                    //localData.clear();
                    //history.push('/');
                    return false;
                }
                func(data);
            }, duration < 0 ? 0 : duration);
            _this.closeArray.push({ name: 'failTime', value: _arr });
        };
    };
    Ajax.prototype.succeed = function (func) {
        var _this = this;
        //this.timer = '';
        return function (data) {
            if (data.Status === 'FAILURE') {
                _this.options.fail(data);
                return;
            }
            //console.log(data);
            var time = 1;
            var duration = time * 1000 - new Date().getTime() + _this.startTime;
            //console.log(new Date().getTime() , this.startTime);
            var _arr = setTimeout(function () {
                //console.log(this);
                func(data);
            }, duration < 0 ? 0 : duration);
            _this.closeArray.push({ name: 'startTime', value: _arr });
        };
    };
    return Ajax;
}(AjaxRequest));
export function main() {
    var _request = new Ajax();
    return function (type, options) {
        _request.type = type;
        _request.options = options;
        _request.options.fail = _request.failure(options.fail);
        _request.options.succeed = _request.succeed(options.succeed);
        _request.startTime = new Date().getTime();
        _request.main();
        return _request;
    };
}
//# sourceMappingURL=main.js.map