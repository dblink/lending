import * as React from 'react';
import * as Loadable from "react-loadable";
export var lazyLoad = function (success) {
    return Loadable({
        loader: success,
        loading: loading,
        delay: 1000
    });
};
function loading(_a) {
    var error = _a.error, pastDelay = _a.pastDelay;
    var _string = null;
    if (error) {
        _string = '未加载成功请刷新';
    }
    else if (pastDelay) {
        _string = '加载中。。。请稍后。。。';
    }
    return React.createElement("div", null, _string);
}
//# sourceMappingURL=loadable.js.map