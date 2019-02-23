import { Table } from './../table/index';
import { Index } from './../../page/index';
import {OptionType} from "./main";

enum ParameterName {
    login = 'login',
    getBorrowerStatus = 'getBorrowerStatus'
}
//export type Key = 'login' | 'getBorrowerStatus';
//export type InterfaceName = Key;

/**
 * 请求参数
 */
interface RequestParameter{
    [ParameterName.login]: 'UserName' | 'Password'|'MerchantNo';
    [ParameterName.getBorrowerStatus]: 'IDCardNo';
} 
export type Parameter<T extends ParameterName> = {
    [i in RequestParameter[T]]: any;
}
/**
 * 分页
 */
export interface PageInfo {
    PageCount: number;
    PageIndex: number;
    PageSize: number;
    TotalCount: number;
}

export interface Callback {
    Status : 'FAILURE' | 'SUCCESS';
    Value ?: any;
    ErrMsg ?: string;
}

type interfaceSettingType = {
    [index in ParameterName] : OptionType<ParameterName>
}

export type RequestOption<key extends Key> = {
    data   : RequestParameter[key];
    fail   : (error: Callback) => void;
    succeed: (data:Callback)=>void;
}

export const interfaceSetting: interfaceSettingType = {
    login: {
        url: "/api/Business/Login/Login",
        type: "post",
        data: '',
        error: {
            MerchantNo: '商户号不能为空',
            UserName: "用户名不能为空",
            Password: "密码不能为空"

        },
        dataType: "json",
    },
    getBorrowerStatus: {
        url: '/api/Borrower/GetBorrowerStatus',
        type: 'get',
        error: {
            IDCardNo: '身份证不能为空'
        }
    }
};
