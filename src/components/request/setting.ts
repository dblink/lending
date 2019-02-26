import { Parameter } from './setting';
import { Index } from './../../page/index';
import {OptionType} from "./main";

export enum ParameterName {
    login = 'login',
    getBorrowerStatus = 'getBorrowerStatus',
    addLoanApplyRecord = 'addLoanApplyRecord',
    uploadBorrowerImage = 'uploadBorrowerImage',
    updateBorrowPersonInfo = 'updateBorrowPersonInfo',
    getBorrowerBaseInfo = 'getBorrowerBaseInfo',
    addBorrowerDetailInfo = 'addBorrowerDetailInfo'
}
//export type Key = 'login' | 'getBorrowerStatus';
//export type InterfaceName = Key;

/**
 * 请求参数
 */
export interface ParameterSummary{
    [ParameterName.login]: 'UserName' | 'Password'|'MerchantNo';
    [ParameterName.getBorrowerStatus]: 'IDCardNo' | 'Token';
    [ParameterName.addLoanApplyRecord]: 'BorrowerId' 
        | 'ApplyMoney' | 'Period' | 'Remark' | 'Token';
    [ParameterName.uploadBorrowerImage]: 'IDCard' |'Token' | 'zheng.jpg' | 'fan.jpg' | 'shou.jpg';
    [ParameterName.updateBorrowPersonInfo]: 'Id' | 'RealName' 
        | 'IDCardNo' | 'Mobile' | 'Birthday' | 'Sex' | 'HouseholdAddress'
        | 'Email' | 'Token';
    [ParameterName.getBorrowerBaseInfo]: 'BorrowerId' | 'Token';
    [ParameterName.addBorrowerDetailInfo]: 'BorrowerId' | 'BorrowerRelation' 
        | 'BorrowerCompany' | 'Remark' | 'Token';
}
export type Parameter<T extends ParameterName> = {
    [i in ParameterSummary[T]] ?: any;
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
    [index in ParameterName] : OptionType<index>
}

export type RequestOption<key extends ParameterName> = {
    data   : ParameterSummary[key];
    fail   : (error: Callback) => void;
    succeed: (data:Callback)=>void;
}

export const interfaceSetting: interfaceSettingType = {
    [ParameterName.login]: {
        url: "/api/Business/Login/Login",
        type: "post",
        //data: '',
        error: {
            MerchantNo: '商户号不能为空',
            UserName: "用户名不能为空",
            Password: "密码不能为空"
        },
        dataType: "json",
    },
    [ParameterName.getBorrowerStatus]: {
        url: '/api/Borrower/GetBorrowerStatus',
        type: 'get',
        error: {
            IDCardNo: '身份证不能为空'
        }
    },
    [ParameterName.addLoanApplyRecord]: {
        url: '/api/Apply/AddLoanApplyRecord',
        type: 'post',
        error: {
            ApplyMoney: '申请金额不能为空',
            Period: '期数不能为空',
        }
    },
    [ParameterName.uploadBorrowerImage]: {
        url: '/api/Borrower/UploadBorrowerImage',
        type: 'post',
        error: {
            'zheng.jpg': '正面不能为空',
            'fan.jpg': '反面不能为空',
            'shou.jpg': '手持身份证不能为空'
        }
    },
    [ParameterName.updateBorrowPersonInfo]: {
        url: '/api/Borrower/UpdateBorrowPersonInfo',
        type: 'post',
        error: {
            'Email': 'Email不能为空',
            'HouseholdAddress': '住址不能为空',
            'Mobile': '手机号不能为空',
            'RealName': '姓名不能为空',
        }
    },
    [ParameterName.getBorrowerBaseInfo]: {
        url: '/api/Borrower/GetBorrowerBaseInfo',
        type: 'get'
    },
    [ParameterName.addBorrowerDetailInfo]: {
        url: '/api/Borrower/AddBorrowerDetailInfo',
        type: 'post'
    }
};
