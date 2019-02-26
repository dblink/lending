import * as React from 'react';
import './progress.css';
export var Progress = function (props) { return (React.createElement("div", { className: "progress", style: { display: "" + (!props.hidden ? 'block' : 'none') } },
    React.createElement("div", { className: "loading", role: "progressbar" }),
    React.createElement("div", { style: { clear: 'both' } }))); };
export var InnerProgress = function (props) {
    var _arr = new Array(props.num || 4);
    _arr.fill(0);
    return React.createElement("div", { className: 'inner-progress', style: { height: props.height || '100%' } }, _arr.map(function (value, key) {
        return React.createElement("div", { className: 'inner-loading', style: {
                background: props.color || '#fff',
                width: props.width || '3px',
                height: '100%',
                animationDelay: 0 + ("." + key + "s")
            } });
    }));
};
//# sourceMappingURL=progress.js.map