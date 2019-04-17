import { OptionType } from "./main";
export declare const requestUrl: {
    type: string;
    development: string;
    production: string;
};
export declare enum ParameterName {
    login = "login",
    regionalManagerLogin = "\u533A\u57DF\u603B\u767B\u5F55",
    getBorrowerStatus = "\u83B7\u53D6\u7528\u6237\u72B6\u6001",
    addLoanApplyRecord = "\u6DFB\u52A0\u501F\u6B3E\u4FE1\u606F",
    uploadBorrowerImage = "uploadBorrowerImage",
    updateBorrowPersonInfo = "updateBorrowPersonInfo",
    getBorrowerBaseInfo = "getBorrowerBaseInfo",
    addBorrowerDetailInfo = "addBorrowerDetailInfo",
    getBorrowerDetailInfo = "\u83B7\u53D6\u501F\u6B3E\u4EBA\u8BE6\u7EC6\u4FE1\u606F",
    getAuditItems = "\u5BA1\u6838\u5217\u8868",
    getApplyItems = "\u7533\u8BF7\u5217\u8868",
    confirmApply = "\u786E\u8BA4\u7533\u8BF7",
    getUserAllInfo = "\u5458\u5DE5\u5217\u8868",
    getContractItems = "\u5408\u540C\u5217\u8868",
    getOverdueContractItems = "\u83B7\u53D6\u903E\u671F\u5408\u540C\u8868",
    auditLoanApply = "\u63D0\u4EA4\u5BA1\u6838",
    bindBankCard = "\u7ED1\u5B9A\u94F6\u884C\u5361",
    changeBankCard = "\u7F16\u8F91\u94F6\u884C\u5361",
    getBankCardInfo = "\u94F6\u884C\u5361\u5217\u8868",
    getGxbToken = "\u83B7\u53D6\u516C\u4FE1\u5B9D",
    getJxlUrl = "\u83B7\u53D6\u805A\u4FE1\u7ACB",
    getMiGuan = "\u83B7\u53D6\u871C\u7F50",
    getReportState = "\u83B7\u53D6\u62A5\u544A\u72B6\u6001",
    getApplyInfo = "\u67E5\u8BE2\u7533\u8BF7\u501F\u6B3E\u4FE1\u606F",
    modifyContractCard = "\u5408\u540C\u5173\u8054\u94F6\u884C\u5361",
    signature = "\u7535\u5B50\u7B7E\u7AE0",
    selectLoanRecord = "\u653E\u6B3E\u660E\u7EC6\u8868",
    selectRepayPlanDetail = "\u8FD8\u6B3E\u8BA1\u5212\u660E\u7EC6\u5217\u8868",
    selectRepayRecord = "\u56DE\u6B3E\u660E\u7EC6",
    getContractState = "\u83B7\u53D6\u5408\u540C\u72B6\u6001",
    selectRechargeLoanBalance = "\u5546\u6237\u67E5\u8BE2\u5145\u503C\u653E\u6B3E\u91D1\u989D\u8BB0\u5F55",
    applyRechargeLoanBalance = "\u5546\u6237\u7533\u8BF7\u5145\u503C\u653E\u6B3E\u91D1\u989D",
    applyWithdrawLoanBalance = "\u63D0\u73B0\u4F59\u989D\u8F6C\u503A\u5238",
    applyLoan = "\u653E\u6B3E",
    uploadCertificateImage = "\u4E0A\u4F20\u51ED\u8BC1",
    getMerchantBalance = "\u5546\u6237\u67E5\u770B\u653E\u6B3E\u91D1\u989D",
    getReportChargeItems = "\u67E5\u8BE2\u62A5\u544A\u8D39\u7528",
    getMongoApplyInfoData = "\u83B7\u53D6\u501F\u6B3E\u4EBA\u4FE1\u606F",
    getReportInfo = "\u83B7\u53D6\u751F\u6210\u7684\u6570\u636E\u62A5\u544A",
    selectBorrowerImage = "\u67E5\u8BE2\u5B9E\u540D\u8BA4\u8BC1\u56FE\u7247",
    getSignatureState = "\u83B7\u53D6\u7B7E\u7EA6\u72B6\u6001",
    applyAccount = "\u6DFB\u52A0\u5458\u5DE5",
    modifyUserInfo = "\u4FEE\u6539\u8D26\u53F7",
    getStore = "\u83B7\u53D6\u95E8\u5E97",
    getRoleItems = "\u83B7\u53D6\u89D2\u8272",
    getUserInfo = "\u83B7\u53D6\u4E0A\u7EA7",
    modifyPassword = "\u4FEE\u6539\u5BC6\u7801",
    selectContractPlan = "\u6839\u636E\u5408\u540C\u67E5\u8BE2\u8FD8\u6B3E\u660E\u7EC6",
    cancelContract = "\u53D6\u6D88\u5408\u540C",
    applyRepayOfflineClearing = "\u7EBF\u4E0B\u7ED3\u6E05",
    applyRepayOnlineClearing = "\u7EBF\u4E0A\u7ED3\u6E05",
    applyRepayOnline = "\u7EBF\u4E0A\u8FD8\u6B3E",
    applyRepayOffline = "\u7EBF\u4E0B\u8FD8\u6B3E",
    getUserSingleInfo = "\u67E5\u8BE2\u67D0\u4E2A\u5458\u5DE5\u4FE1\u606F",
    getMerchantChargeDetail = "\u83B7\u53D6\u5546\u6237\u8D39\u7528\u8BE6\u7EC6\u4FE1\u606F",
    selectRepayDetail = "\u67E5\u8BE2\u7EBF\u4E0B\u8FD8\u6B3E\u64CD\u4F5C",
    confirmRepayOffline = "\u7EBF\u4E0B\u786E\u8BA4\u8FD8\u6B3E",
    confirmRepayOfflineClearing = "\u7EBF\u4E0B\u786E\u8BA4\u7ED3\u6E05",
    getBankCardItems = "\u83B7\u53D6\u7ED1\u5361\u5217\u8868",
    withdrawBindCard = "\u63D0\u73B0\u7ED1\u5361",
    applyWithdraw = "\u7533\u8BF7\u63D0\u73B0",
    getWithdrawItems = "\u63D0\u73B0\u660E\u7EC6",
    getHomePageApplyCount = "\u4E00\u6708\u5185\u6BCF\u5929\u7533\u8BF7/\u901A\u8FC7\u603B\u6570",
    getOverdueCount = "7\u65E5\u5185\u6BCF\u5929\u903E\u671F\u5408\u540C\u6570\u91CF",
    getOverdueAmount = "7\u65E5\u5185\u6BCF\u5929\u903E\u671F\u91D1\u989D",
    getPostLoanRecordItems = "\u83B7\u53D6\u8D37\u540E\u8BB0\u5F55\u5217\u8868",
    uploadPostLoanImage = "\u4E0A\u4F20\u8D37\u540E\u56FE\u7247",
    addPostLoanRecord = "\u65B0\u589E\u8D37\u540E\u8BB0\u5F55",
    selectRecordBorrowerImage = "\u67E5\u770B\u8D37\u540E\u4E0A\u4F20\u56FE\u7247",
    oneKeyRepayment = "\u4E00\u952E\u8FD8\u6B3E"
}
declare type PagingParamter = 'PageIndex' | 'PageSize';
declare type TimeSelectParamter = 'StartTime' | 'EndTime';
declare type RequestListParameter = PagingParamter | 'MerchantNo' | 'EmployeeId' | TimeSelectParamter | 'BorrowerName' | 'Mobile' | 'Status' | 'Token';
/**
 * 请求参数汇总
 */
export interface ParameterSummary {
    [ParameterName.login]: 'LoginName' | 'Password' | 'MerchantNo';
    [ParameterName.getBorrowerStatus]: 'IDCardNo' | 'Token';
    [ParameterName.addLoanApplyRecord]: 'BorrowerId' | 'ApplyMoney' | 'Period' | 'Purpose' | 'Token';
    [ParameterName.uploadBorrowerImage]: 'IDCard' | 'Token' | 'zheng.jpg' | 'fan.jpg' | 'shou.jpg';
    [ParameterName.updateBorrowPersonInfo]: 'Id' | 'RealName' | 'IDCardNo' | 'Mobile' | 'Birthday' | 'Sex' | 'HouseholdAddress' | 'Email' | 'Token';
    [ParameterName.getBorrowerBaseInfo]: 'BorrowerId' | 'Token';
    [ParameterName.addBorrowerDetailInfo]: 'BorrowerId' | 'BorrowerRelation' | 'BorrowerCompany' | 'Remark' | 'Token' | 'MaritalStatus';
    [ParameterName.getBorrowerDetailInfo]: 'BorrowerId' | 'Token';
    [ParameterName.getAuditItems]: RequestListParameter;
    [ParameterName.getApplyItems]: RequestListParameter;
    [ParameterName.confirmApply]: 'BorrowerId' | 'Token';
    [ParameterName.getUserAllInfo]: PagingParamter | 'MerchantNo' | 'Mobile' | 'Status' | 'Token' | 'EmpName' | 'StoreId';
    [ParameterName.getContractItems]: RequestListParameter;
    [ParameterName.getOverdueContractItems]: RequestListParameter;
    [ParameterName.auditLoanApply]: 'AuditApplyId' | 'Status' | 'ApplyMoney' | 'Period' | 'ApplyType' | 'Remark' | 'Token' | 'ServiceMoney';
    [ParameterName.bindBankCard]: 'BankCardNo' | 'Mobile' | 'BankCode' | 'BankName' | 'BorrowerBaseInfoId' | 'ReturnUrl' | 'Token';
    [ParameterName.changeBankCard]: 'Id' | 'BankCardNo' | 'Mobile' | 'BankCode' | 'BankName' | 'BorrowerBaseInfoId' | 'ReturnUrl' | 'Token';
    [ParameterName.getBankCardInfo]: 'BorrowerId' | 'Token';
    [ParameterName.getGxbToken]: 'ApplyId' | 'IdCardNo' | 'Token';
    [ParameterName.getJxlUrl]: 'ApplyId' | 'IdCardNo' | 'Token';
    [ParameterName.getMiGuan]: 'ApplyId' | 'IdCardNo' | 'Token';
    [ParameterName.getReportState]: 'ApplyId' | 'Token' | 'ReportType';
    [ParameterName.getApplyInfo]: 'BorrowerId' | 'Token';
    [ParameterName.modifyContractCard]: 'ContractId' | 'BankCardId' | 'Token';
    [ParameterName.signature]: 'ContractId' | 'ReturnUrl' | 'Token';
    [ParameterName.selectLoanRecord]: PagingParamter | TimeSelectParamter | 'MerchantNo' | 'EmployeeId' | 'BorrowerName' | 'Mobile' | 'Token';
    [ParameterName.selectRepayPlanDetail]: PagingParamter | TimeSelectParamter | 'MerchantNo' | 'EmployeeId' | 'BorrowerName' | 'Mobile' | 'State' | 'Token';
    [ParameterName.selectRepayRecord]: PagingParamter | TimeSelectParamter | 'MerchantNo' | 'EmployeeId' | 'BorrowerName' | 'Mobile' | 'Token';
    [ParameterName.getContractState]: 'ContractId' | 'Token';
    [ParameterName.selectRechargeLoanBalance]: PagingParamter | TimeSelectParamter | 'Status' | 'Token' | 'MerchantNo';
    [ParameterName.applyRechargeLoanBalance]: 'Money' | 'Token';
    [ParameterName.applyLoan]: 'LoanContractId' | 'Token';
    [ParameterName.uploadCertificateImage]: 'RechargeId' | 'Token' | 'certificate.jpg';
    [ParameterName.getMerchantBalance]: 'Token';
    [ParameterName.getReportChargeItems]: PagingParamter | TimeSelectParamter | 'BorrowerName' | 'ReportType' | 'Status' | 'MerchantNo' | 'Token';
    [ParameterName.getMongoApplyInfoData]: 'ApplyId' | 'Token';
    [ParameterName.getReportInfo]: 'ApplyId' | 'ReportType' | 'Token';
    [ParameterName.selectBorrowerImage]: 'IDCardNo' | 'Token';
    [ParameterName.getSignatureState]: 'ContractId' | 'Token';
    [ParameterName.applyAccount]: 'LoginName' | 'ParentId' | 'LoginPassword' | 'SecureMobile' | 'UserStatus' | 'RealName' | 'StoreId' | 'RoleId' | 'Token';
    [ParameterName.modifyUserInfo]: ParameterSummary[ParameterName.applyAccount] | 'Id';
    [ParameterName.getStore]: 'Token';
    [ParameterName.getRoleItems]: 'Token';
    [ParameterName.modifyPassword]: 'UserId' | 'Password' | 'Token';
    [ParameterName.getUserInfo]: 'Token';
    [ParameterName.selectContractPlan]: 'LoanContractId' | 'Token';
    [ParameterName.cancelContract]: 'ContractId' | 'Token';
    [ParameterName.applyRepayOfflineClearing]: 'LoanContractId' | 'RepayMoney' | 'Token';
    [ParameterName.applyRepayOnlineClearing]: 'LoanContractId' | 'RepayMoney' | 'Token';
    [ParameterName.getUserSingleInfo]: 'EmployeeId' | 'Token';
    [ParameterName.applyRepayOnline]: 'RepayPlanDetailId' | 'Token';
    [ParameterName.getMerchantChargeDetail]: 'Token';
    [ParameterName.selectRepayDetail]: PagingParamter | TimeSelectParamter | 'MerchantNo' | 'EmployeeId' | 'BorrowerName' | 'Mobile' | 'Token';
    [ParameterName.confirmRepayOffline]: 'RepayPlanDetailId' | 'State' | 'Token';
    [ParameterName.confirmRepayOfflineClearing]: 'RepayPlanDetailId' | 'State' | 'Token';
    [ParameterName.getBankCardItems]: 'Token';
    [ParameterName.withdrawBindCard]: 'BankCardNo' | 'IdCardNo' | 'Mobile' | 'BankCode' | 'BankName' | 'Remark' | 'RealName' | 'Token';
    [ParameterName.applyWithdraw]: 'WithdrawBankCardId' | 'WithdrawAmount' | 'Remark' | 'Token';
    [ParameterName.applyRepayOffline]: 'RepayPlanDetailId' | 'Token';
    [ParameterName.getWithdrawItems]: 'Status' | 'PageIndex' | 'PageSize' | 'Token';
    [ParameterName.getHomePageApplyCount]: 'Token' | 'Time';
    [ParameterName.getOverdueCount]: 'Token';
    [ParameterName.getOverdueAmount]: 'Token';
    [ParameterName.regionalManagerLogin]: 'LoginName' | 'Password';
    [ParameterName.getPostLoanRecordItems]: 'ContractId' | 'PageSize' | 'PageIndex' | 'Token';
    [ParameterName.uploadPostLoanImage]: 'ContractId' | 'PostLoanRecordId' | 'Token' | any;
    [ParameterName.addPostLoanRecord]: 'ContractId' | 'Remark' | 'Token';
    [ParameterName.selectRecordBorrowerImage]: 'ContractId' | 'PostLoanRecordId' | 'Token';
    [ParameterName.applyWithdrawLoanBalance]: 'Money' | 'Token';
    [ParameterName.oneKeyRepayment]: 'Token' | 'RepayTime';
}
export declare type Parameter<T extends ParameterName> = {
    [i in ParameterSummary[T]]?: any;
};
declare type CallbackListParameter = 'Id' | 'BorrowerMobile' | 'ApplyMoney' | 'Period' | 'Status' | 'ApplyTime' | 'BorrowerRealName' | 'MerchantNo' | 'ConfirmPersonName' | 'Remark' | 'MerchantName';
/**
 * 返回值汇总
 */
export interface CallbackSummary {
    [ParameterName.getBorrowerStatus]: 'BorrowerId' | 'ApplyId' | 'BorrowerDetailInfoId' | 'ISExsitBorrower' | 'ISApply' | 'ISExsitBorrowerDetail' | 'ISUploadPersonCardState' | 'HoneypotStatus' | 'HoneyBeeStatus' | 'Alipay';
    [ParameterName.getAuditItems]: CallbackListParameter | 'AuditId' | 'ApplyId' | 'IdCardNo';
    [ParameterName.getApplyItems]: CallbackListParameter | 'AuditMoney' | 'AuditPeriod' | 'IdCardNo' | 'ApplyId';
    [ParameterName.getContractItems]: 'Id' | 'BorrowerBankCardId' | 'BorrowPersonBaseInfoId' | 'LoanApplyRecordId' | 'Mobile' | 'Purpose' | 'Money' | 'PeriodType' | 'Period' | 'State' | 'MerchantNo' | 'StoreId' | 'OrderNo' | 'CreateTime' | 'Remark' | 'BorrowerName' | 'OverdueDate';
    [ParameterName.getBankCardInfo]: 'Id' | 'BankCardNo' | 'Mobile' | 'BankCode' | 'BankName' | 'BorrowerBaseInfoId' | 'Status' | 'ErrorMessage' | 'MoneymoremoreId';
    [ParameterName.getUserAllInfo]: 'Name' | 'RoleName' | 'StoreName' | 'Superior' | 'State' | 'SecureMobile' | 'CreateTime' | 'Id';
    [ParameterName.selectLoanRecord]: 'OrderNo' | 'BorrowerMobile' | 'BankCardNo' | 'LoanMoney' | 'Principal' | 'Period' | 'Interest' | 'LoanTime' | 'BorrowerName' | 'AvgMoney' | 'MerchantNo' | 'OtherCharge' | 'QueryCharge' | 'MerchantName' | 'ConfirmPersonName' | 'LoanChannelCost';
    [ParameterName.selectRepayPlanDetail]: 'OrderNo' | 'Money' | 'RepayMoney' | 'Period' | 'Id' | 'RepayTime' | 'State' | 'BorrowerName' | 'BorrowerMobile' | 'OperationEmployeeName';
    [ParameterName.selectRepayRecord]: 'OrderNo' | 'RepayMoney' | 'Period' | 'RepayTime' | 'Type' | 'BorrowerName' | 'BorrowerMobile' | 'MerchantName' | 'OperationEmployeeName' | 'BankCardNo' | 'RepayChannelCost';
    [ParameterName.selectRechargeLoanBalance]: 'Id' | 'RechargeCode' | 'TradeNo' | 'RechargeMoney' | 'State' | 'CreateTime' | 'ConfirmTime';
    [ParameterName.getReportChargeItems]: 'Id' | 'MerchantNo' | 'CreateTime' | 'Status' | 'ReportType' | 'BorrowerName' | 'MIGuanCharge' | 'MiFengCharge' | 'AlipayCharge' | 'Total';
    [ParameterName.selectContractPlan]: 'Principal' | 'Interest' | 'Period' | 'Money' | 'RepayMoney' | 'Status' | 'RepayTime' | 'ServiceMoney';
    [ParameterName.getMerchantChargeDetail]: 'MerchantNo' | 'MerchantName' | 'TinyLoanChannelRate' | 'DeductionChannelRate' | 'Honeypot' | 'HoneyBee' | 'Alipay' | 'ServiceCharge' | 'FrozenServiceCharge' | 'LoanBalance' | 'FrozenLoanBalance' | 'BalanceAmount' | 'FrozenAmount';
    [ParameterName.selectRepayDetail]: 'CreateTime' | 'BorrowerName' | 'RepayMoney' | 'Period' | 'Type' | 'Id';
    [index: string]: any;
}
export declare type RequestCallback<T extends ParameterName> = {
    [index in CallbackSummary[T]]?: any;
};
/**
 * 分页
 */
export interface PageInfo {
    PageCount?: string;
    PageIndex?: string;
    PageSize?: number;
    TotalCount?: number;
}
export interface Callback<i = any> {
    Status: 'FAILURE' | 'SUCCESS';
    Value?: i;
    ErrMsg?: string;
}
declare type interfaceSettingType = {
    [index in ParameterName]: OptionType<index>;
};
export declare type RequestOption<key extends ParameterName> = {
    data: ParameterSummary[key];
    fail: (error: Callback) => void;
    succeed: (data: Callback) => void;
};
export declare const interfaceSetting: interfaceSettingType;
export {};
