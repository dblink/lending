var _a;
export var ParameterName;
(function (ParameterName) {
    ParameterName["login"] = "login";
    ParameterName["getBorrowerStatus"] = "getBorrowerStatus";
    ParameterName["addLoanApplyRecord"] = "addLoanApplyRecord";
    ParameterName["uploadBorrowerImage"] = "uploadBorrowerImage";
    ParameterName["updateBorrowPersonInfo"] = "updateBorrowPersonInfo";
    ParameterName["getBorrowerBaseInfo"] = "getBorrowerBaseInfo";
    ParameterName["addBorrowerDetailInfo"] = "addBorrowerDetailInfo";
})(ParameterName || (ParameterName = {}));
export var interfaceSetting = (_a = {},
    _a[ParameterName.login] = {
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
    _a[ParameterName.getBorrowerStatus] = {
        url: '/api/Borrower/GetBorrowerStatus',
        type: 'get',
        error: {
            IDCardNo: '身份证不能为空'
        }
    },
    _a[ParameterName.addLoanApplyRecord] = {
        url: '/api/Apply/AddLoanApplyRecord',
        type: 'post',
        error: {
            ApplyMoney: '申请金额不能为空',
            Period: '期数不能为空',
        }
    },
    _a[ParameterName.uploadBorrowerImage] = {
        url: '/api/Borrower/UploadBorrowerImage',
        type: 'post',
        error: {
            'zheng.jpg': '正面不能为空',
            'fan.jpg': '反面不能为空',
            'shou.jpg': '手持身份证不能为空'
        }
    },
    _a[ParameterName.updateBorrowPersonInfo] = {
        url: '/api/Borrower/UpdateBorrowPersonInfo',
        type: 'post',
        error: {
            'Email': 'Email不能为空',
            'HouseholdAddress': '住址不能为空',
            'Mobile': '手机号不能为空',
            'RealName': '姓名不能为空',
        }
    },
    _a[ParameterName.getBorrowerBaseInfo] = {
        url: '/api/Borrower/GetBorrowerBaseInfo',
        type: 'get'
    },
    _a[ParameterName.addBorrowerDetailInfo] = {
        url: '/api/Borrower/AddBorrowerDetailInfo',
        type: 'post'
    },
    _a);
//# sourceMappingURL=setting.js.map