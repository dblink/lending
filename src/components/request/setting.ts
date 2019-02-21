import {OptionType} from "./main";

export type Key = 'login' | 'getBorrowerInfoState' | 'getBorrowerState' | 'getIDCardOCRInfo'
    | 'uploadIDCardImage' | 'getGetBorrowPersonInfoData' | 'addOrUpdateBorrowPersonCompany' | 'addBankCard' | 'updateOtherInfoData'
    | 'updateRelationShipData' | 'kuaiQianAgreementApply' | 'kuaiQianAgreementBind' | 'getBankCards' | 'addOrUpdateApplyItem'
    | 'getTokenByOperator' | 'getToken' | 'submitApplyItem' | 'getReportString' | 'getApplyItems'
    | 'getAuditItemList' | 'operationApplyAudit' | 'conversionToFormalContract' | 'getContractItems'
    | 'getPrintContractInfo' | 'uploadContractImage' | 'getContractImage' | 'applicationForTender'
    | 'autoLoan' | 'getRoleSelectItems' | 'addRole' | 'editRole'| 'setMenu' | 'getStoreSelectItems'
    | 'editStore' | 'addStore' | 'getSnapshotApplyItem' | 'abortion' | 'getRepayList'|'onlinePayment'
    | 'updateManagementFee' | 'getEmployeeSelectItems' | 'addEmployee' | 'editEmployee'
    | 'localPayment' | 'getDetailPayList' | 'getDetailRepayList' | 'personPayment'
    | 'modifyPassword' | 'pettyLoanList' | 'createRecharge' | 'uploadReceipt' | 'getLoanMoney'
    | 'deleteRole' | 'getAllLoanContract' | 'addLoanContract' | 'closeLoanContract' | 'editLoanContract'
    | 'getPrintLoanContractInfo' | 'contractPay' | 'contractPayState' | 'getTokenByOperatorJXL'
    | 'localSettle' | 'getMiReport' | 'UploadLoanContractImage' | 'changeUser' | 'getApplyItemsByPerson' | 'getTest' | 'getTest2'
    | 'getIDCardImage' | 'getSignInfo' | 'downloadContractToExcel' | 'downloadLendingToExcel' | 'downloadRepaymentToExcel' 
    | 'removeBankCard';
export type InterfaceName = Key;

export type Parameter <k extends Key> = {
    [i in RequestParameter[k]] ?: any;
}

/**
 * 请求参数
 */
export type RequestParameter = {
    getBorrowerInfoState: 'Token' | 'IDCardNo';
    getBorrowerState: 'Token' | 'IDCardNo';
    getIDCardOCRInfo: any;
    getGetBorrowPersonInfoData: 'Token' | 'IDCardNo';
    login: 'UserName' | 'Password' | 'MerchantNo';
    addOrUpdateBorrowPersonCompany: 'BorrowPersonBaseInfoId'
        | 'BorrowPersonDetailInfoId' | 'CompanyName' | 'CompanyAddress' | 'Department'
        | 'Position' | 'Salary' | 'Token';
    addBankCard: 'BorrowerBaseInfoId' | 'BankCardNo' | 'Mobile' | 'BankName' | 'BankCode';
    updateOtherInfoData: 'BorrowPersonDetailInfoId' | 'OtherInfoData' | 'Mobile' | 'Marriage' | 'Email' | 'HouseAddress';
    updateRelationShipData: 'BorrowPersonDetailInfoId' | 'RelationShipData' | 'Token';
    kuaiQianAgreementApply: 'BorrowerBaseInfoId' | 'BankCardNo' | 'Mobile' | 'Token';
    kuaiQianAgreementBind: 'BorrowerBaseInfoId' | 'Id' | 'ValidCode' | 'PayToken' | 'Token';
    getBankCards: 'IDCardNo' | 'Token';
    addOrUpdateApplyItem: 'Id' | 'BorrowerDetailInfoId' | 'Purpose' | 'Period' | 'Money' | 'BorrowerBankCardId' | 'Token';
    getTokenByOperator: 'PersonCardNo' | 'ApplyID' | 'Token';
    getTokenByOperatorJXL: 'PersonCardNo' | 'ApplyID' | 'Token';
    getToken: 'PersonCardNo' | 'ApplyID' | 'AuthItem' | 'Token';
    submitApplyItem: 'ApplyID' | 'Token';
    uploadIDCardImage: any;
    getReportString: 'GXBToken';
    getApplyItems: 'StartTime' | 'EndTime' | 'datetime'
        | 'RealName' | 'IDCardNo' | 'Mobile' | 'EmpName' | 'StoreId' | 'State'
        | 'PageSize' | 'PageIndex';
    getApplyItemsByPerson : 'StartTime' | 'EndTime' | 'datetime'
    | 'RealName' | 'IDCardNo' | 'Mobile' | 'EmpName' | 'StoreId' | 'State'
    | 'PageSize' | 'PageIndex';
    getAuditItemList: 'StartTime' | 'EndTime' | 'RealName' | 'Mobile'
        | 'EmpName' | 'StoreId' | 'State' | 'PageSize' | 'PageIndex' | 'Token';
    operationApplyAudit: 'Id' | 'State'
        | 'ApprovalMoney' | 'ApprovalPeriod' | 'Illustrate' | 'Token';
    conversionToFormalContract: 'ApplyID' | 'Token';
    getContractItems: 'StartTime' | 'EndTime' | 'RealName' | 'IDCardNo'
        | 'Mobile' | 'EmpName' | 'StoreId' | 'State' | 'PageSize' | 'PageIndex';
    getPrintContractInfo: 'ContractId';
    uploadContractImage: FormData;
    getContractImage: 'ContractId';
    applicationForTender: 'ContractId';
    autoLoan: 'ContractId';
    getRoleSelectItems: any;
    getStoreSelectItems: any;
    addRole: 'RoleName' | 'ParentId';
    addStore: 'StoreName' | 'StoreAddress' | 'StoreCompanyName' | 'TelePhone' | 'ParentId';
    editRole: 'RoleName' | 'ParentId' | 'Id';
    editStore: 'Id' | 'StoreName' | 'StoreAddress' | 'StoreCompanyName' | 'TelePhone' | 'ParentId';
    setMenu : 'RoleId' | 'MeunId' ;
    getSnapshotApplyItem : 'ApplyID';
    abortion: 'ContractId';
    getRepayList:  'StartTime' | 'EndTime' | 'RealName' | 'IDCardNo'
        | 'Mobile' | 'EmpName' | 'StoreId' | 'State' | 'PageSize' | 'PageIndex';
    onlinePayment: 'ContractRepaymentId' | 'BankCardId' | 'Money';
    localPayment: 'ContractRepaymentId' | 'Money';
    updateManagementFee: 'ContractId' | 'ManagementFee';
    personPayment: 'ContractId';
    getDetailPayList: 'StartTime' | 'EndTime' | 'RealName' |'IDCardNo'  |'Mobile' |'EmpName' |'StoreId'
        |'PageSize'| 'PageIndex';
    getDetailRepayList: 'StartTime' | 'EndTime' | 'RealName' |'IDCardNo'  |'Mobile' |'EmpName' |'StoreId'
        |'PageSize'| 'type' | 'PageIndex';
    addEmployee : 'LoginName'| 'RealName'| 'Mobile'| 'LoginPassword'|'RoleId' | 'StoreId'
        | 'ParentId';
    editEmployee: 'Id' | 'RealName' | 'Mobile' | 'RoleId' | 'StoreId' | 'ParentId';
    modifyPassword: 'NewPassword' | 'Id';
    pettyLoanList: 'PageSize'| 'PageIndex' | 'State' | 'StartTime' | 'EndTime';
    deleteRole: 'RoleId';
    createRecharge: 'RechargeMoney';
    uploadReceipt: FormData;
    getAllLoanContract: 'StartTime' | 'EndTime' | 'PersonCardNo' | 'State' | 'Mobile'
        | 'StoreId'| 'PageSize'| 'PageIndex';
    addLoanContract: 'Name'|'Mobile'|'PersonCardNo'
        |'StartTime'|'EndTime'|'Email'|'Money'
        |'PeriodType'|'Period'|'BankCode'|'BankName'|'BankCardNo';
    editLoanContract: 'Id'| 'Name'|'Mobile'|'PersonCardNo'
        |'StartTime'|'EndTime'|'Email'|'Money'
        |'PeriodType'|'Period'|'BankCode'|'BankName'|'BankCardNo';
    closeLoanContract: 'Id';
    getPrintLoanContractInfo: "Id";
    localSettle: 'ContractId' | 'Money';
    contractPay: 'Id';
    contractPayState: 'Id';
    changeUser: 'BorrowPersonBaseInfoId'|'RealName'|'IDCardNo';
    getMiReport: 'ApplyID' | 'PersonCardNo';
    getSignInfo: 'Id' | 'ReturnUrl';
    downloadRepaymentToExcel: 'StartTime'|'EndTime'|'MerchantNo';
    downloadContractToExcel: 'StartTime'|'EndTime'|'MerchantNo';
    downloadLendingToExcel: 'StartTime'|'EndTime'|'MerchantNo';
    removeBankCard: 'BankCardId';
    UploadLoanContractImage: any;
    getLoanMoney: any;
    getEmployeeSelectItems: any;
    getTest: any;
    getTest2: any;
    getIDCardImage: 'IDCardNo' | 'Token';
}

/**
 * 回调参数
 */
export type CallbackParameter = {
    getBorrowerInfoState: 'ISBindBankState' | 'ISBindCompanyState'
        | 'ISExistPersonState' | 'ISFillOtherInfoDataState' | 'ISFillPersonDetailInfoState'
    	| 'ISFillRelationShipDataState' | 'ISUploadPersonCardState' | 'ISAccountIDState';

    getBorrowerState: 'Status' | 'Value';
    getGetBorrowPersonInfoData: any;
    login: 'Id' | 'MerchantNo' | 'MenuItems' | 'Name' | 'OverdueTime' | 'ParentChain'
        | 'ParentChain' | 'ParentId' | 'RoleId' | 'Token' | 'StoreId';
    UploadLoanContractImage: any;
    changeUser: any;
    contractPay: any;
    getLoanMoney: any;
    getApplyItemsByPerson: any;
    uploadReceipt: any;
    createRecharge: any;
    personPayment: any;
    localPayment: any;
    addOrUpdateBorrowPersonCompany: any;
    addBankCard: any;
    updateOtherInfoData: any;
    updateRelationShipData: any;
    getIDCardOCRInfo: any;
    kuaiQianAgreementApply: any;
    kuaiQianAgreementBind: any;
    getBankCards: any;
    addOrUpdateApplyItem: any;
    getTokenByOperator: any;
    getTokenByOperatorJXL: any;
    getToken: any;
    submitApplyItem: any;
    uploadIDCardImage: any;
    getReportString: any;
    getApplyItems: any;
    getAuditItemList: any;
    operationApplyAudit: any;
    conversionToFormalContract: any;
    getContractItems: any;
    getPrintContractInfo: any;
    uploadContractImage: any;
    getContractImage: any;
    applicationForTender: any;
    autoLoan: any;
    getRoleSelectItems: any;
    getStoreSelectItems: any;
    addRole: any;
    addStore: any;
    editRole: any;
    editStore: any;
    setMenu: any;
    getSnapshotApplyItem: any;
    getRepayList: any;
    abortion: any;
    onlinePayment: any;
    updateManagementFee: any;
    getDetailPayList: any;
    getDetailRepayList: any;
    getEmployeeSelectItems: any;
    editEmployee: any;
    addEmployee: any;
    modifyPassword: any;
    pettyLoanList: any;
    deleteRole: any;
    getAllLoanContract: any;
    addLoanContract: any;
    editLoanContract: any;
    closeLoanContract: any;
    getPrintLoanContractInfo: any;
    localSettle: any;
    getMiReport: any;
    contractPayState: any;
    getTest: any;
    getTest2: any;
    getIDCardImage: any;
    getSignInfo: any;
    downloadRepaymentToExcel: any;
    downloadContractToExcel: any;
    downloadLendingToExcel: any;
    removeBankCard: any;
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

export type CallbackRow<k extends Key> = {
    [index in CallbackParameter[k]] ?: string | number | boolean;
}

export interface Callback {
    Status : 'FAILURE' | 'SUCCESS';
    Value ?: any;
    ErrMsg ?: string;
}

export interface CallbackJson<k extends Key> extends Callback{
    Value : CallbackRow<k>;
}

export interface CallbackArray<k extends Key> extends Callback{
    Data: CallbackRow<k>[];
}

type interfaceSettingType = {
    [index in Key] : OptionType<Key>
}

export type RequestOption<key extends Key> = {
    data   : Parameter<key>;
    fail   : (error: Callback) => void;
    succeed: (data:Callback)=>void;
}

export const interfaceSetting: interfaceSettingType = {
    login: {
        url: "/api/Business/Login/Login",
        type: "post",
        data: {} as Parameter<'login'>,
        error: {
            MerchantNo: '商户号不能为空',
            UserName: "用户名不能为空",
            Password: "密码不能为空"
        },
        dataType: "json",
    },
    getBorrowerInfoState:{
        url: "/api/Business/Apply/GetBorrowPersonInfoState",
        type: 'get',
        data: {} as Parameter<'getBorrowerInfoState'>,
        error: {
            IDCardNo: '身份证不能为空',
        },
        dataType: "json"
    },
    getBorrowerState: {
        url: "/api/Business/Apply/GetPersonBorrowState",
        type: 'get',
        data: {} as Parameter<'getBorrowerState'>,
        error: {
            IDCardNo: '身份证不能为空'
        },
        dataType: 'json'
    },
    getIDCardOCRInfo: {
        url: '/api/Business/Apply/GetIDCardOCRInfo',
        type: 'post',
        data: {} as Parameter<'getIDCardOCRInfo'>,
        error: {
            'cardA.jpg': '身份证正面不能为空'
        },
        contentType: 'multipart/form-data',
        dataType: 'json'
    },
    uploadIDCardImage: {
        url: '/api/Business/Apply/UploadIDCardImage',
        type: 'post',
        data: {} as Parameter<'uploadIDCardImage'>,
        error: {
            //'CardA.jpg': '图片不能为空'
            'cardA.jpg': '身份证正面不能为空',
            'cardB.jpg': '身份证反面面不能为空',
            'cardC.jpg': '手持身份证不能为空'
        },
        contentType: 'multipart/form-data',
        dataType: 'json'
    },
    getGetBorrowPersonInfoData: {
        url: '/api/Business/Apply/GetGetBorrowPersonInfoData',
        type: 'get',
        data: {} as Parameter<'getGetBorrowPersonInfoData'>,
        error: {
            Token: 'TOKEN不能为空!'
        },
        dataType: 'json'
    },
    //公司信息:
    addOrUpdateBorrowPersonCompany: {
        url: '/api/Business/Apply/AddOrUpdateBorrowPersonCompany',
        type: 'post',
        data: {} as Parameter<'addOrUpdateBorrowPersonCompany'>,
        error:{
            CompanyName	: '公司名字不能为空!',
            CompanyAddress : '公司地址不能为空',
            Department : '部门不能为空',
            Position : '职位不能为空',
            Salary : '薪水不能为空',
            Token : 'TOKEN不能为空',
        },
        dataType: 'json'
    },
    //添加银行
    addBankCard: {
        url: '/api/Business/Apply/AddBankCard',
        type: 'post',
        data: {} as Parameter<'addBankCard'>,
        error:{
            BorrowerBaseInfoId: '基本信息ID不能为空',
            BankCardNo: '银行卡号不能为空',
            Mobile: '预留手机号不能为空',
            //BankName: '银行名称不能为空',
            BankCode: '银行code不能为空',
        },
        dataType: 'json'
    },
    updateOtherInfoData: {
        url: '/api/Business/Apply/UpdateOtherInfoData',
        type: 'post',
        data: {} as Parameter<'updateOtherInfoData'>,
        error:{
            OtherInfoData : '其他信息不能为空',
            Marriage : '婚姻状况不能为空',
            Email : '邮箱不能为空',
            HouseAddress : '现居住地址不能为空',
            Mobile : '手机号不能为空'
        },
        dataType: 'json'
    },
    updateRelationShipData: {
        url: '/api/Business/Apply/UpdateRelationShipData',
        type: 'post',
        data: {} as Parameter<'updateRelationShipData'>,
        error:{
            RelationShipData : '关系信息不能为空',
            Token : 'TOKEN不能为空',
        },
        dataType: 'json'
    },
    kuaiQianAgreementApply: {
        url: '/api/Business/Apply/KuaiQianAgreementApply',
        type: 'post',
        data: {} as Parameter<'kuaiQianAgreementApply'>,
        error:{
            BankCardNo : '银行卡号不能为空',
            Mobile : '银行卡预留手机号不能为空',
            Token : 'TOKEN不能为空',
        },
        dataType: 'json'
    },
    kuaiQianAgreementBind: {
        url: '/api/Business/Apply/KuaiQianAgreementBind',
        type: 'post',
        data: {} as Parameter<'kuaiQianAgreementBind'>,
        error:{
            Id : 'Id不能为空',
            ValidCode : '快钱发送的绑卡验证码不能为空',
            PayToken : '快钱协议支付绑定授权码不能为空',
            Token : 'TOKEN不能为空',
        },
        dataType: 'json'
    },
    getBankCards: {
        url: "/api/Business/Apply/GetBankCards",
        type: "get",
        data: {} as Parameter<'getBankCards'>,
        error: {
            IDCardNo: '身份证不能为空',
            Token : 'TOKEN不能为空',
        },
        dataType: "json",
    },
    addOrUpdateApplyItem: {
        url: "/api/Business/Apply/AddOrUpdateApplyItem",
        type: "post",
        data: {} as Parameter<'addOrUpdateApplyItem'>,
        error: {
            //Id: 'ID不能为空',
            Purpose : '用途不能为空',
            Period : '申请周期不能为空',
            Money : '申请金额不能为空',
            BorrowerBankCardId : '选择授权还卡的银行卡Id不能为空',
            Token : 'TOKEN不能为空',
        },
        dataType: "json",
    },
    getMiReport: {
        url: "/api/Business/GXB/GetMiReport",
        type: "get",
        data: {},
        error: {},
        dataType: "json"
    },
    changeUser: {
        url: '/api/Business/Apply/UpdateBorrowInfo',
        type: 'post',
        data: {},
        error: {
            RealName: '真实姓名不能为空',
            IDCardNo: '身份证不能为空'
        },
        dataType: "json",
    },
    getTokenByOperatorJXL:{
        url: "/api/Business/GXB/GetJXLOperator",
        type: "get",
        data: {} as Parameter<'getTokenByOperator'>,
        error: {
            PersonCardNo: '身份证号不能为空',
            Token : 'TOKEN不能为空',
        },
        dataType: "json",
    },
    getTokenByOperator: {
        url: "/api/Business/GXB/GetTokenByOperator",
        type: "get",
        data: {} as Parameter<'getTokenByOperator'>,
        error: {
            PersonCardNo: '身份证号不能为空',
            Token : 'TOKEN不能为空',
        },
        dataType: "json",
    },
    //获取个人信息token
    getToken: {
        url: "/api/Business/GXB/GetToken",
        type: "get",
        data: {} as Parameter<'getToken'>,
        error: {
            PersonCardNo: '身份证号不能为空',
            AuthItem: '微信支付宝不能为空',
            Token : 'TOKEN不能为空',
        },
        dataType: "json",
    },
    submitApplyItem: {
        url: "/api/Business/Apply/SubmitApplyItem",
        type: "post",
        data: {} as Parameter<'submitApplyItem'>,
        error: {
            Token : 'TOKEN不能为空',
        },
        dataType: "json",
    },
    getReportString:{
        url: '/api/Business/GXB/GetReportString',
        type: 'get',
        data: {},
        error: {
            GXBToken: 'Token不能为空'
        },
        dataType: 'json'
    },
    getApplyItems: {
        url: '/api/Business/Apply/GetApplyItems',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    getApplyItemsByPerson: {
        url: '/api/Business/Apply/GetApplyItemsByPersonal',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    getAuditItemList: {
        url: '/api/Business/Audit/GetAuditItemList',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    operationApplyAudit:{
        url: '/api/Business/Audit/OperationApplyAudit',
        type: 'post',
        data: {},
        error: {
            Illustrate: '备注必须写'
        },
        dataType: 'json'
    },
    //审核
    conversionToFormalContract: {
        url: '/api/Business/Apply/ConversionToFormalContract',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    getContractItems: {
        url: '/api/Business/Contract/GetContractItems',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    getPrintContractInfo: {
        url: '/api/Business/Contract/GetPrintContractInfo',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    uploadContractImage:{
        url:'/api/Business/Contract/UploadContractImage',
        type: 'post',
        data: {},
        error: {},
        contentType: 'multipart/form-data',
        dataType: 'json'
    },
    getContractImage: {
        url: '/api/Business/Contract/GetContractImage',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    applicationForTender:{
        url: '/api/Business/Contract/ApplicationForTender',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    autoLoan: {
        url: '/api/Business/Contract/AutoLoan',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    getRoleSelectItems: {
        url: '/api/Business/BasicSetting/GetRoleSelectItems',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    getStoreSelectItems:{
        url: '/api/Business/BasicSetting/GetStoreSelectItems',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    addRole: {
        url: '/api/Business/BasicSetting/AddSysRole',
        type: 'post',
        data: {},
        error: {
            RoleName: '角色不能为空',
            ParentId: 'ID不能为空'
        },
        dataType: 'json'
    },
    
    editRole: {
        url: '/api/Business/BasicSetting/EditSysRole',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    
    editStore: {
        url: '/api/Business/BasicSetting/EditStoreItem',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    
    addStore: {
        url: '/api/Business/BasicSetting/AddStoreItem',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },

    setMenu: {
        url: '/api/Business/BasicSetting/SetMeunPermission',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },

    getSnapshotApplyItem: {
        url: '/api/Business/Audit/GetSnapshotApplyItem',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },

    abortion: {
        url: '/api/Business/Contract/Abortion',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    //还款列表
    getRepayList: {
        url: '/api/Business/Contract/GetRepaymentList',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    //线上还款
    onlinePayment:{
        url: '/api/Business/Contract/SystemRepayment',
        type: 'post',
        data: {},
        error: {
            BankCardId: '银行卡号不能为空'
        },
        dataType: 'json'
    },
    localPayment: {
        url: '/api/Business/Contract/OfflinePayment',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    updateManagementFee: {
        url: '/api/Business/Contract/UpdateManagementFee',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    personPayment: {
        url: '/api/Business/Contract/GetRepaymentListByContract',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    getDetailPayList: {
        url: '/api/Business/FinancialStatistics/GetDetailsOfContractLendingItems',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    getDetailRepayList:{
        url: '/api/Business/FinancialStatistics/GetDetailsOfContarctRepaymentItems',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    getEmployeeSelectItems: {
        url: '/api/Business/BasicSetting/GetEmployeeSelectItems',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    addEmployee: {
        url: '/api/Business/BasicSetting/AddEmployee',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    editEmployee: {
        url: '/api/Business/BasicSetting/EditEmployee',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    modifyPassword: {
        url: '/api/Business/BasicSetting/ModifyPassword',
        type: 'post',
        data:{},
        error: {
            "NewPassword": '请输入密码'
        },
        dataType: 'json'
    },
    //小额充值列表查询
    pettyLoanList:{
        url: '/api/Business/ApplyForLoan/GetRechargeLoanBalanceByMer',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    //充值
    createRecharge:{
        url: '/api/Business/ApplyForLoan/CreateRechargeLoanBalance',
        type: 'post',
        data: {},
        error: {
            RechargeMoney: '请输入充值金额'
        },
        dataType: 'json'
    },
    //删除角色
    deleteRole:{
        url: '/api/Business/BasicSetting/DeleteSysRole',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    //上传回单
    uploadReceipt: {
        url: '/api/Business/ApplyForLoan/UploadCredentials',
        type: 'post',
        data: {},
        error: {
            '1.jpeg': '回单不能为空'
        },
        contentType: 'multipart/form-data',
        dataType: 'json'
    },
    //获取冻结金额
    getLoanMoney:{
        url: '/api/Business/ApplyForLoan/ApplySelectMerchantBalance',
        type: 'get',
        data: {},
        error: {

        },
        dataType: 'json'
    },
    //获取贷款合同列表
    getAllLoanContract: {
        url: '/api/Business/ApplyForLoan/GetAllLoanContract',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    //添加贷款合同信息
    addLoanContract: {
        url: '/api/Business/ApplyForLoan/AddCashLoanContarct',
        type:'post',
        data: {},
        error: {},
        dataType: "json"
    },
    //编辑贷款合同信息
    editLoanContract: {
        url: '/api/Business/ApplyForLoan/EditCashLoanContarct',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    //关闭合同
    closeLoanContract: {
        url: '/api/Business/ApplyForLoan/CloseLoanContract',
        type: 'post',
        data: {},
        error: {},
        dataType:'json'
    },
    //获取打印合同数据
    getPrintLoanContractInfo:{
        url: '/api/Business/ApplyForLoan/GetPrintContractInfo',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json',

    },
    //上传小袋合同
    UploadLoanContractImage: {
        url: '/api/Business/ApplyForLoan/UploadLoanContractImage',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json',
        contentType: 'multipart/form-data'
    },
    //线下结清
    localSettle: {
        url: '/api/Business/Contract/OfflineSettlePayment',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    //小贷汇款
    contractPay: {
        url: '/api/Business/ApplyForLoan/ContractPay',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    //小贷
    contractPayState: {
        url: '/api/Business/ApplyForLoan/CheckContractLoanState',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    getTest: {
        url: '/css/api/SysUser/GetUserInfoById',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    getTest2: {
        url: '/css/api/Authorize/AccessToken',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    getIDCardImage: {
        url: '/api/Business/Apply/GetIDCardImage',
        type: 'get',
        data: {},
        error: {},
        dataType: 'json'
    },
    getSignInfo: {
        url: '/api/Business/ApplyForLoan/GetSignInfo',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    },
    //导出合同列表
    downloadContractToExcel :{
        url: '/api/Business/FinancialStatistics/DownloanExcelOfContractItem',
        type: 'get',
        data: {},
        error: {},
        dataType: 'blob'
    },
    //导出放款明细列表
    downloadLendingToExcel : {
        url: '/api/Business/FinancialStatistics/DownloanExcelOfLendingItem',
        type: 'get',
        data: {},
        error: {},
        dataType: 'blob'
    },
    //导出还款明细列表
    downloadRepaymentToExcel:{
        url: '/api/Business/FinancialStatistics/DownloanExcelOfRepaymentItem',
        type: 'get',
        data: {},
        error: {},
        dataType: 'blob'
    },
    //删除银行卡
    'removeBankCard': {
        url: '/api/Business/Apply/RemoveBankCard',
        type: 'post',
        data: {},
        error: {},
        dataType: 'json'
    }
};
