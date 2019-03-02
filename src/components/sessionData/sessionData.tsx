import * as React from 'react';

interface UserInfo {
    MerchantNo: string;
    MerchantStatus: string;
    Name: string;
    RoleId: string;
    RoleName: string;
    StoreId: string;
    StoreName: string;
    UserId: string;
    UserStatus: string;
};
class SessionData{
    private data:string;
    constructor(str: string){
        this.data = str;
    }
    setData(data: any){
        let _str = JSON.stringify(data);
        console.log(sessionStorage.setItem(this.data, _str));
    }
    addData(key: any, data: any){
        let _data = JSON.parse(sessionStorage.getItem(this.data));
        _data[key] = data;
        this.setData(_data)
    }
    getData(str: 'Token' | 'UserInfo' | 'UserMenuItems'){
        let _data = sessionStorage.getItem(this.data),
            session: {
                Token ?: any;
                UserInfo ?: UserInfo;
                UserMenuItems ?: any;
            } = {};
        if(_data){
            session = JSON.parse(_data);
        }
        return session[str];
    }
}
export const sessionData = new SessionData('lending');
export const sessionInfo = new SessionData('info');