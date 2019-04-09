import { Parameter } from './setting';
//import { Index } from './../../page/index';
import {OptionType} from "./main";

export const requestUrl = {
    type: 'production',
    development: '',
    production: 'http://loutsloanapi.hehuadata.com',
    //production|development
}

export enum ParameterName {
    login = 'login',
    regionalManagerLogin = '区域总登录',
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
    getOverdueContractItems = '获取逾期合同表',
    auditLoanApply = '提交审核',
    bindBankCard = '绑定银行卡',
    changeBankCard = '编辑银行卡',
    getBankCardInfo = '银行卡列表',
    getGxbToken = '获取公信宝',
    getJxlUrl = '获取聚信立',
    getMiGuan = '获取蜜罐',
    getReportState = '获取报告状态',
    getApplyInfo = '查询申请借款信息',
    modifyContractCard = '合同关联银行卡',
    signature = '电子签章',
    selectLoanRecord = '放款明细表',
    selectRepayPlanDetail = '还款计划明细列表',
    selectRepayRecord = '回款明细',
    getContractState = '获取合同状态',
    selectRechargeLoanBalance = '商户查询充值放款金额记录',
    applyRechargeLoanBalance  = '商户申请充值放款金额',
    applyWithdrawLoanBalance = '提现余额转债券',
    applyLoan = '放款',
    uploadCertificateImage = '上传凭证',
    getMerchantBalance = '商户查看放款金额',
    getReportChargeItems = '查询报告费用',
    getMongoApplyInfoData = '获取借款人信息',
    getReportInfo = '获取生成的数据报告',
    selectBorrowerImage = '查询实名认证图片',
    getSignatureState = '获取签约状态',
    applyAccount = '添加员工',
    modifyUserInfo = '修改账号',
    getStore = '获取门店',
    getRoleItems = '获取角色',
    getUserInfo = '获取上级',
    modifyPassword = '修改密码',
    selectContractPlan = '根据合同查询还款明细',
    cancelContract = '取消合同',
    applyRepayOfflineClearing = '线下结清',
    applyRepayOnlineClearing = '线上结清',
    applyRepayOnline = '线上还款',
    applyRepayOffline = '线下还款',
    getUserSingleInfo = '查询某个员工信息',
    getMerchantChargeDetail = '获取商户费用详细信息',
    selectRepayDetail = '查询线下还款操作',
    confirmRepayOffline = '线下确认还款',
    confirmRepayOfflineClearing = '线下确认结清',
    getBankCardItems = '获取绑卡列表',
    withdrawBindCard = '提现绑卡',
    applyWithdraw = '申请提现',
    getWithdrawItems = '提现明细',
    getHomePageApplyCount = '一月内每天申请/通过总数',
    getOverdueCount = '7日内每天逾期合同数量',
    getOverdueAmount = '7日内每天逾期金额',
    getPostLoanRecordItems = '获取贷后记录列表',
    uploadPostLoanImage = '上传贷后图片',
    addPostLoanRecord = '新增贷后记录',
    selectRecordBorrowerImage = '查看贷后上传图片'
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
    [ParameterName.getOverdueContractItems]: RequestListParameter;
    [ParameterName.auditLoanApply] : 'AuditApplyId' | 'Status' | 'ApplyMoney' 
        | 'Period' | 'ApplyType' | 'Remark' | 'Token' | 'ServiceMoney';
    [ParameterName.bindBankCard] : 'BankCardNo' | 'Mobile' | 'BankCode'
        | 'BankName' | 'BorrowerBaseInfoId' | 'ReturnUrl' | 'Token';
    [ParameterName.changeBankCard]: 'Id' | 'BankCardNo' | 'Mobile' | 'BankCode'
    | 'BankName' | 'BorrowerBaseInfoId' | 'ReturnUrl' | 'Token';
    [ParameterName.getBankCardInfo] : 'BorrowerId' | 'Token'; 
    [ParameterName.getGxbToken] : 'ApplyId' | 'IdCardNo' | 'Token';
    [ParameterName.getJxlUrl] : 'ApplyId' | 'IdCardNo' | 'Token';
    [ParameterName.getMiGuan] : 'ApplyId' | 'IdCardNo' | 'Token';
    [ParameterName.getReportState] : 'ApplyId' | 'Token' | 'ReportType';
    [ParameterName.getApplyInfo] : 'BorrowerId' | 'Token';
    [ParameterName.modifyContractCard] : 'ContractId' | 'BankCardId' | 'Token';
    [ParameterName.signature] : 'ContractId' | 'ReturnUrl' | 'Token';
    [ParameterName.selectLoanRecord] : PagingParamter | TimeSelectParamter 
        | 'MerchantNo' | 'EmployeeId' | 'BorrowerName' | 'Mobile'
        | 'Token';
    [ParameterName.selectRepayPlanDetail] : PagingParamter | TimeSelectParamter
        | 'MerchantNo' | 'EmployeeId' | 'BorrowerName' | 'Mobile' | 'State'
        | 'Token';
    [ParameterName.selectRepayRecord] : PagingParamter | TimeSelectParamter
        | 'MerchantNo' | 'EmployeeId' | 'BorrowerName' | 'Mobile'
        | 'Token';
    [ParameterName.getContractState] : 'ContractId' | 'Token',
    [ParameterName.selectRechargeLoanBalance] : PagingParamter | TimeSelectParamter
        | 'Status' | 'Token' | 'MerchantNo',
    [ParameterName.applyRechargeLoanBalance] : 'Money' | 'Token',
    [ParameterName.applyLoan] : 'LoanContractId' | 'Token',
    [ParameterName.uploadCertificateImage] : 'RechargeId' | 'Token' | 'certificate.jpg'
    [ParameterName.getMerchantBalance] : 'Token';
    [ParameterName.getReportChargeItems]: PagingParamter | TimeSelectParamter 
        | 'BorrowerName' | 'ReportType' | 'Status' | 'MerchantNo' | 'Token';
    [ParameterName.getMongoApplyInfoData] : 'ApplyId' | 'Token';
    [ParameterName.getReportInfo] : 'ApplyId' | 'ReportType' | 'Token';
    [ParameterName.selectBorrowerImage] : 'IDCardNo' | 'Token';
    [ParameterName.getSignatureState] : 'ContractId' | 'Token';
    [ParameterName.applyAccount] : 'LoginName' | 'ParentId' | 'LoginPassword' | 'SecureMobile'
    | 'UserStatus' | 'RealName' | 'StoreId' | 'RoleId' | 'Token'
    [ParameterName.modifyUserInfo] : ParameterSummary[ParameterName.applyAccount] | 'Id';
    [ParameterName.getStore] : 'Token';
    [ParameterName.getRoleItems] : 'Token';
    [ParameterName.modifyPassword]: 'UserId' | 'Password' | 'Token';
    [ParameterName.getUserInfo] : 'Token';
    [ParameterName.selectContractPlan]: 'LoanContractId' | 'Token';
    [ParameterName.cancelContract]: 'ContractId' | 'Token';
    [ParameterName.applyRepayOfflineClearing]: 'LoanContractId' | 'RepayMoney' | 'Token',
    [ParameterName.applyRepayOnlineClearing]: 'LoanContractId' | 'RepayMoney' | 'Token'
    [ParameterName.getUserSingleInfo]: 'EmployeeId' | 'Token';
    [ParameterName.applyRepayOnline] : 'RepayPlanDetailId' | 'Token';
    [ParameterName.getMerchantChargeDetail]: 'Token';
    [ParameterName.selectRepayDetail]: PagingParamter | TimeSelectParamter | 'MerchantNo' 
        | 'EmployeeId' | 'BorrowerName' | 'Mobile' | 'Token';
    [ParameterName.confirmRepayOffline]: 'RepayPlanDetailId' | 'State' | 'Token';
    [ParameterName.confirmRepayOfflineClearing]: 'RepayPlanDetailId' | 'State' | 'Token';
    [ParameterName.getBankCardItems] : 'Token';
    [ParameterName.withdrawBindCard] : 'BankCardNo' | 'IdCardNo' | 'Mobile' | 'BankCode'
        | 'BankName' | 'Remark' | 'RealName' | 'Token';
    [ParameterName.applyWithdraw] : 'WithdrawBankCardId' | 'WithdrawAmount' 
        | 'Remark' | 'Token';
    [ParameterName.applyRepayOffline] : 'RepayPlanDetailId' | 'Token';
    [ParameterName.getWithdrawItems] : 'Status' | 'PageIndex' | 'PageSize' | 'Token'
    [ParameterName.getHomePageApplyCount] : 'Token' | 'Time';
    [ParameterName.getOverdueCount]: 'Token';
    [ParameterName.getOverdueAmount]: 'Token';
    [ParameterName.regionalManagerLogin]: 'LoginName' | 'Password';
    [ParameterName.getPostLoanRecordItems]: 'ContractId' | 'PageSize' | 'PageIndex' | 'Token';
    [ParameterName.uploadPostLoanImage]: 'ContractId' | 'PostLoanRecordId' | 'Token' | any
    [ParameterName.addPostLoanRecord] : 'ContractId' | 'Remark' | 'Token'
    [ParameterName.selectRecordBorrowerImage]: 'ContractId' | 'PostLoanRecordId' | 'Token'
    [ParameterName.applyWithdrawLoanBalance]: 'Money' | 'Token'
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
    [ParameterName.getAuditItems] : CallbackListParameter | 'AuditId' | 'ApplyId' | 'IdCardNo' ;
    [ParameterName.getApplyItems] : CallbackListParameter | 'AuditMoney' | 'AuditPeriod' | 'IdCardNo' | 'ApplyId';
    [ParameterName.getContractItems] : 'Id' | 'BorrowerBankCardId' | 'BorrowPersonBaseInfoId'
        | 'LoanApplyRecordId' | 'Mobile' | 'Purpose' | 'Money' | 'PeriodType' | 'Period'
        | 'State' | 'MerchantNo' | 'StoreId' | 'OrderNo' | 'CreateTime' 
        | 'Remark' | 'BorrowerName' | 'OverdueDate';
    [ParameterName.getBankCardInfo] : 'Id' | 'BankCardNo' | 'Mobile'
        | 'BankCode' | 'BankName' | 'BorrowerBaseInfoId' | 'Status' 
        | 'ErrorMessage' | 'MoneymoremoreId';
    [ParameterName.getUserAllInfo] : 'Name' | 'RoleName' | 'StoreName' | 'Superior'
        | 'State' | 'SecureMobile' | 'CreateTime' | 'Id';
    [ParameterName.selectLoanRecord] : 'OrderNo' | 'BorrowerMobile' | 'BankCardNo' | 'LoanMoney' | 'Principal' | 'Period'
        | 'Interest' | 'LoanTime' | 'BorrowerName' | 'AvgMoney' | 'MerchantNo' | 'OtherCharge'
        | 'QueryCharge' | 'MerchantName' | 'ConfirmPersonName' | 'LoanChannelCost';
    [ParameterName.selectRepayPlanDetail] : 'OrderNo' | 'Money' | 'RepayMoney' | 'Period' | 'Id'
        | 'RepayTime' | 'State' | 'BorrowerName' | 'BorrowerMobile' | 'OperationEmployeeName';
    [ParameterName.selectRepayRecord] : 'OrderNo' | 'RepayMoney' | 'Period'
        | 'RepayTime' | 'Type' | 'BorrowerName' | 'BorrowerMobile' | 'MerchantName'
        | 'OperationEmployeeName' | 'BankCardNo' | 'RepayChannelCost';
    [ParameterName.selectRechargeLoanBalance] : 'Id' | 'RechargeCode' | 'TradeNo'
        | 'RechargeMoney' | 'State' | 'CreateTime' | 'ConfirmTime';
    [ParameterName.getReportChargeItems] : 'Id' | 'MerchantNo' | 'CreateTime'
        | 'Status' | 'ReportType' | 'BorrowerName' | 'MIGuanCharge' 
        | 'MiFengCharge' | 'AlipayCharge' | 'Total';
    [ParameterName.selectContractPlan] : 'Principal' | 'Interest' | 'Period'
        | 'Money' | 'RepayMoney' | 'Status' | 'RepayTime' | 'ServiceMoney';
    [ParameterName.getMerchantChargeDetail]: 'MerchantNo' | 'MerchantName' 
        | 'TinyLoanChannelRate' | 'DeductionChannelRate' | 'Honeypot' 
        | 'HoneyBee' | 'Alipay' | 'ServiceCharge' | 'FrozenServiceCharge'
        | 'LoanBalance' | 'FrozenLoanBalance' | 'BalanceAmount'
        | 'FrozenAmount';
    [ParameterName.selectRepayDetail]: 'CreateTime' | 'BorrowerName' | 'RepayMoney' | 'Period' 
        | 'Type' | 'Id';
    [index: string] : any;
}
export type RequestCallback<T extends ParameterName> = {
    [index in CallbackSummary[T]] ?: any;
}
/**
 * 分页
 */
export interface PageInfo {
    PageCount ?: string;
    PageIndex ?: string;
    PageSize ?: number;
    TotalCount ?: number;
}

export interface Callback <i = any>{
    Status : 'FAILURE' | 'SUCCESS';
    Value ?: i;
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
    [ParameterName.regionalManagerLogin]: {
        url: '/api/Login/RegionalManagerLogin',
        type: 'post',
        error: {
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
            BankCardNo: '银行卡正在验证！',
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
    },
    [ParameterName.getReportState]: {
        url: '/api/Report/GetReportState',
        type: 'get'
    },
    [ParameterName.getApplyInfo]: {
        url: '/api/Apply/GetApplyInfo',
        type: 'get'
    },
    [ParameterName.modifyContractCard]: {
        url: '/api/LoanContract/ModifyContractCard',
        type: 'post',
        error: {
            BankCardId: '请选择银行卡',
        }
    },
    [ParameterName.signature]: {
        url: '/api/LoanContract/Signature',
        type: 'get',
    },
    [ParameterName.selectLoanRecord]: {
        url: '/api/LoanDetail/SelectLoanRecord',
        type: 'get',
    },
    [ParameterName.selectRepayPlanDetail]: {
        url: '/api/Repay/SelectRepayPlanDetail',
        type: 'get'
    },
    [ParameterName.selectRepayRecord]: {
        url: '/api/Repay/SelectRepayRecord',
        type: 'get'
    },
    [ParameterName.getContractState]: {
        url: '/api/LoanContract/GetContractState',
        type: 'get'
    },
    [ParameterName.selectRechargeLoanBalance]:{
        url: '/api/Merchant/SelectRechargeLoanBalance',
        type: 'get'
    },
    [ParameterName.applyRechargeLoanBalance]: {
        url: '/api/Merchant/ApplyRechargeLoanBalance',
        type: 'post'
    },
    [ParameterName.applyWithdrawLoanBalance]: {
        url: '/api/Withdraw/ApplyRechargeLoanBalance',
        type: 'post'
    },
    [ParameterName.applyLoan]: {
        url: '/api/LoanDetail/ApplyLoan',
        type: 'post'
    },
    [ParameterName.uploadCertificateImage]:{
        url: '/api/Merchant/UploadCertificateImage',
        type: 'post',
        contentType: 'multipart/form-data',
        error: {
            "certificate.jpg" : '凭证不能为空！'
        }
    },
    [ParameterName.getMerchantBalance]:{
        url: '/api/Merchant/GetMerchantBalance',
        type: 'get'
    },
    [ParameterName.getReportChargeItems]: {
        url: '/api/Report/GetReportChargeItems',
        type: 'get'
    },
    [ParameterName.getMongoApplyInfoData]: {
        url: '/api/Report/GetMongoApplyInfoData',
        type: 'get'
    },
    [ParameterName.getReportInfo]: {
        url: '/api/Report/GetReportInfo',
        type: 'get'
    },
    [ParameterName.selectBorrowerImage]: {
        url: '/api/Borrower/SelectBorrowerImage',
        type: 'get'
    },
    [ParameterName.getSignatureState] : {
        url: '/api/LoanContract/GetSignatureState',
        type: 'get'
    },
    [ParameterName.applyAccount]: {
        url : '/api/SysUser/ApplyAccount',
        type: 'post'
    },
    [ParameterName.getStore]: {
        url : '/api/Permission/GetStore',
        type: 'get'
    },
    [ParameterName.getRoleItems]: {
        url : '/api/Permission/GetRoleItems',
        type: 'get'
    },
    [ParameterName.modifyPassword]: {
        url : '/api/SysUser/ModifyPassword',
        type : 'post'
    },
    [ParameterName.getUserInfo]: {
        url : '/api/SysUser/GetUserInfo',
        type : 'get'
    },
    [ParameterName.selectContractPlan]: {
        url: '/api/Repay/SelectContractPlan',
        type: 'get'
    },
    [ParameterName.cancelContract]: {
        url: '/api/LoanContract/CancelContract',
        type: 'GET'
    },
    [ParameterName.applyRepayOfflineClearing]: {
        url: '/api/Repay/ApplyRepayOfflineClearing',
        type: 'post'
    },
    [ParameterName.applyRepayOnlineClearing]:{
        url: '/api/Repay/ApplyRepayOnlineClearing',
        type: 'post'
    },
    [ParameterName.getUserSingleInfo]: {
        url: '/api/SysUser/GetUserSingleInfo',
        type: 'get'
    },
    [ParameterName.modifyUserInfo]: {
        url: '/api/SysUser/ModifyUserInfo',
        type: 'post'
    },
    [ParameterName.applyRepayOnline]: {
        url: '/api/Repay/ApplyRepayOnline',
        type: 'post'
    },
    [ParameterName.getMerchantChargeDetail]: {
        url: '/api/Merchant/GetMerchantChargeDetail',
        type: 'get'
    },
    [ParameterName.selectRepayDetail]: {
        url: '/api/Repay/SelectRepayDetail',
        type: 'get'
    },
    [ParameterName.confirmRepayOffline]: {
        url: '/api/Repay/ConfirmRepayOffline',
        type: 'post'
    },
    [ParameterName.confirmRepayOfflineClearing]: {
        url: '/api/Repay/ConfirmRepayOfflineClearing',
        type: 'post'
    },
    [ParameterName.getBankCardItems]: {
        url: '/api/Withdraw/GetBankCardItems',
        type: 'get'
    },
    [ParameterName.withdrawBindCard]: {
        url: '/api/Withdraw/BindBankCard',
        type: 'post'
    },
    [ParameterName.applyWithdraw]: {
        url: '/api/Withdraw/ApplyWithdraw',
        type: 'post',
        error: {
            WithdrawAmount: '金额不能为空'
        }
    },
    [ParameterName.applyRepayOffline]: {
        url: '/api/Repay/ApplyRepayOffline',
        type: 'post'
    },
    [ParameterName.getWithdrawItems]: {
        url: '/api/Withdraw/GetWithdrawItems',
        type: 'get'
    },
    [ParameterName.changeBankCard]: {
        url: '/api/BindBankCard/ChangeBankCard',
        type: 'post'
    },
    [ParameterName.getHomePageApplyCount]: {
        url: '/api/Apply/GetHomePageApplyCount',
        type: 'get'
    },
    [ParameterName.getOverdueCount]: {
        url: '/api/LoanContract/GetOverdueCount',
        type: 'get'
    },
    [ParameterName.getOverdueAmount]: {
        url: '/api/LoanContract/GetOverdueAmount',
        type: 'get'
    },
    [ParameterName.getOverdueContractItems]: {
        url: '/api/LoanContract/GetOverdueContractItems',
        type: 'get'
    },
    [ParameterName.getPostLoanRecordItems]: {
        url: '/api/PostLoanRecord/GetPostLoanRecordItems',
        type: 'get'
    },
    [ParameterName.uploadPostLoanImage]: {
        url: '/api/PostLoanRecord/UploadPostLoanImage',
        type: 'post',
        contentType: 'multipart/form-data'
    },
    [ParameterName.addPostLoanRecord]: {
        url: '/api/PostLoanRecord/AddPostLoanRecord',
        type: 'post',
        error: {
            Remark: '内容不能为空'
        }
    },
    [ParameterName.selectRecordBorrowerImage]: {
        url: '/api/PostLoanRecord/SelectBorrowerImage',
        type: 'get'
    }
};
