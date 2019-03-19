import { sessionData } from "../sessionData/sessionData";
import { overdueToken } from "./failJump";
import { Callback } from "../request/setting";

export const logOut = (func:(e:Callback)=>void, state ?: string)=>{
    return (e:Callback)=>{
        if(e.Value.Token === 'Failures'){
            sessionData.clear();
            overdueToken.skip(state || location.pathname);
            alert('登录失效！');
            return;
        }
        func(e);
    }
}