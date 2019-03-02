import { Parameter } from './setting';
//import { Index } from './../../page/index';
import {OptionType} from "./main";

export enum ParameterName {
    login = 'login',
    getBorrowerStatus = '获取用户状态',
    addLoanApplyRecord = '添加借款信息',
    uploadBorrowerImage = 'uploadBorrowerImage',
    updateBorrowPersonInfo = 'updateBorrowPersonInfo',
    getBorrowerBaseInfo = 'getBorrowerBaseInfo',
    addBorrowerDetailInfo = 'addBorrowerDetailInfo',
    getBorrowerDetailInfo = '获取借款人详细信息',
    getAuditItems = '审核列表',
    getApplyItems = '申请列表',
    confirmApply = '确认申请',
    getUserAllInfo = '员工列表',
    getContractItems = '合同列表',
    auditLoanApply = '提交审核',
    bindBankCard = '绑定银行卡',
    getBankCardInfo = '银行卡列表',
    getGxbToken = '获取公信宝',
    getJxlUrl = '获取聚信立',
    getMiGuan = '获取蜜罐',
}
type PagingParamter = 'PageIndex' | 'PageSize';
type TimeSelectParamter = 'StartTime' | 'EndTime';

type RequestListParameter = PagingParamter | 'MerchantNo' 
| 'EmployeeId' | TimeSelectParamter | 'BorrowerName' | 'Mobile'
| 'Status' | 'Token';
/**
 * 请求参数汇总
 */
export interface ParameterSummary{
    [ParameterName.login]: 'LoginName' | 'Password'| 'MerchantNo';
    [ParameterName.getBorrowerStatus]: 'IDCardNo' | 'Token';
    [ParameterName.addLoanApplyRecord]: 'BorrowerId' 
        | 'ApplyMoney' | 'Period' | 'Purpose' | 'Token';
    [ParameterName.uploadBorrowerImage]: 'IDCard' |'Token' | 'zheng.jpg' | 'fan.jpg' | 'shou.jpg';
    [ParameterName.updateBorrowPersonInfo]: 'Id' | 'RealName' 
        | 'IDCardNo' | 'Mobile' | 'Birthday' | 'Sex' | 'HouseholdAddress'
        | 'Email' | 'Token';
    [ParameterName.getBorrowerBaseInfo]: 'BorrowerId' | 'Token';
    [ParameterName.addBorrowerDetailInfo]: 'BorrowerId' | 'BorrowerRelation' 
        | 'BorrowerCompany' | 'Remark' | 'Token' | 'MaritalStatus';
    [ParameterName.getBorrowerDetailInfo]: 'BorrowerId' | 'Token';
    [ParameterName.getAuditItems] : RequestListParameter;
    [ParameterName.getApplyItems] : RequestListParameter;
    [ParameterName.confirmApply] : 'BorrowerId' | 'Token';
    [ParameterName.getUserAllInfo] : PagingParamter | 'MerchantNo' | 'Mobile'
        | 'Status' | 'Token' | 'EmpName' | 'StoreId';
    [ParameterName.getContractItems] : RequestListParameter;
    [ParameterName.auditLoanApply] : 'AuditApplyId' | 'Status' | 'ApplyMoney' 
        | 'Period' | 'Remark' | 'Token';
    [ParameterName.bindBankCard] : 'BankCardNo' | 'Mobile' | 'BankCode'
        | 'BankName' | 'BorrowerBaseInfoId' | 'ReturnUrl' | 'Token';
    [ParameterName.getBankCardInfo] : 'BorrowerId' | 'Token'; 
    [ParameterName.getGxbToken] : 'ApplyId' | 'IdCardNo' | 'Token';
    [ParameterName.getJxlUrl] : 'ApplyId' | 'IdCardNo' | 'Token';
    [ParameterName.getMiGuan] : 'ApplyId' | 'IdCardNo' | 'Token';
}
export type Parameter<T extends ParameterName> = {
    [i in ParameterSummary[T]] ?: any;
}

type CallbackListParameter = 'Id' | 'BorrowerMobile' 
| 'ApplyMoney' | 'Period' | 'Status' | 'ApplyTime'
| 'BorrowerRealName' | 'MerchantNo' | 'ConfirmPersonName'
| 'Remark' | 'MerchantName';
/**
 * 返回值汇总
 */
export interface CallbackSummary{
    [ParameterName.getBorrowerStatus]: 'BorrowerId' | 'ApplyId'  
        | 'BorrowerDetailInfoId' | 'ISExsitBorrower' | 'ISApply'
        | 'ISExsitBorrowerDetail' | 'ISUploadPersonCardState'
        | 'HoneypotStatus' | 'HoneyBeeStatus' | 'Alipay' ;
    [ParameterName.getAuditItems] : CallbackListParameter ;
    [ParameterName.getApplyItems] : CallbackListParameter | 'AuditMoney' | 'AuditPeriod';
    [ParameterName.getContractItems] : 'Id' | 'BorrowerBankCardId' | 'BorrowPersonBaseInfoId'
        | 'LoanApplyRecordId' | 'Mobile' | 'Purpose' | 'Money' | 'PeriodType' | 'Period'
        | 'State' | 'MerchantNo' | 'StoreId' | 'OrderNo' | 'CreateTime' 
        | 'Remark' | 'BorrowerName';
    [ParameterName.getBankCardInfo] : 'Id' | 'BankCardNo' | 'Mobile'
        | 'BankCode' | 'BankName' | 'BorrowerBaseInfoId' | 'Status' 
        | 'ErrorMessage' | 'MoneymoremoreId';
    [index: string] : any;
}
export type RequestCallback<T extends ParameterName> = {
    [index in CallbackSummary[T]] ?: any;
}
/**
 * 分页
 */
export interface PageInfo {
    PageCount: string;
    PageIndex: string;
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
        url: "/api/Login/Login",
        type: "post",
        //data: '',
        error: {
            MerchantNo: '商户号不能为空',
            LoginName: "用户名不能为空",
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
        contentType: 'multipart/form-data',
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
    },
    [ParameterName.getBorrowerDetailInfo]: {
        url: '/api/Borrower/GetBorrowerDetailInfo',
        type: 'get'
    },
    [ParameterName.getAuditItems]: {
        url: '/api/AuditApply/GetAuditItems',
        type: 'get'
    },
    [ParameterName.confirmApply]: {
        url: '/api/Apply/ConfirmApply',
        type: 'post'
    },
    [ParameterName.getApplyItems]: {
        url: '/api/Apply/GetApplyItems',
        type: 'get'
    },
    [ParameterName.getUserAllInfo]: {
        url: '/api/SysUser/GetUserAllInfo',
        type: 'get'
    },
    [ParameterName.getContractItems]:{
        url: '/api/LoanContract/GetContractItems',
        type: 'get'
    },
    [ParameterName.auditLoanApply]: {
        url: '/api/AuditApply/AuditLoanApply',
        type: 'post',
        error: {
            ApplyMoney: '请输入审核金额',
            Period: '请输入期数'
        }
    },
    [ParameterName.bindBankCard]: {
        url: '/api/BindBankCard/BindBankCard',
        type: 'post',
        error: {
            BankCardNo: '银行卡号不能为空！',
            Mobile: '手机号不能为空'
        }
    },
    [ParameterName.getBankCardInfo]: {
        url: '/api/BindBankCard/GetBankCardInfo',
        type: 'get',
    },
    [ParameterName.getGxbToken]: {
        url: '/api/Report/GetGxbToken',
        type: 'get'
    },
    [ParameterName.getJxlUrl]:{
        url: '/api/Report/GetJxlUrl',
        type: 'get'
    },
    [ParameterName.getMiGuan]: {
        url: '/api/Report/GetMiGuan',
        type: 'post'
    }
};
