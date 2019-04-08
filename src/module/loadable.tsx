import * as React from 'react';
import * as Loadable from "react-loadable";

export const lazyLoad = (success:any)=>{
    return Loadable({
        loader: success,
        loading: loading,
        delay: 1000
    })
};

function loading({error , pastDelay}:any) {
    let _string = null;
    if (error) {
        _string = '未加载成功请刷新';
    } else if (pastDelay) {
        _string = '加载中。。。请稍后。。。';
    }
    return <div>
        {_string}
    </div>
}