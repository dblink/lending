import {
    AccoutParameter,
    ActiveSummaryParameter,
    AlipayBasicInfoParameter,
    AlipayBillDetailListParameter,
    BankCardListParameter,
    BaseParameter,
    BasicInfoParameter,
    CallContactParameter,
    CallSummaryParameter,
    CommonType,
    ConsumeSummaryParameter,
    ContactListParameter,
    ContactSummaryParameter,
    EcommerceBindedBankCardsParameter,
    EcommerceConsigneeAddressesParameter,
    EcommercePaymentAccountsParameter,
    EcommerceTradesParameter,
    HuabeiBillsParameter,
    HuabeiConsumeListParameter,
    HuabeiInfoParameter,
    JiebeiInfoParameter,
    LoanRateListParameter,
    LoanRecordDetailListParameter,
    LoanRecordListParameter,
    LogisticsParameter,
    MemberListParameter,
    MyBankAssetDetailsParameter,
    MyBankBindInfoParameter,
    MyBankLoanDetailsParameter,
    MyBankRepayPlanListParameter,
    NetSummaryParameter,
    RepayRecordListParameter,
    ReportBankCardInfoParameter,
    ReportBasicInfoParameter,
    ReportBorrowInfoParameter,
    ReportRelationInfoParameter,
    RiskSummaryParameter,
    SellerParameter,
    SmsSummaryParameter,
    SoldOrdersParameter,
    SubOrdersParameter,
    SubscribeMsgListParameter,
    TaobaoOrdersParameter,
    TransferBankCardsParameter,
    WeChatBasicInfoParameter
} from "./reportComponents/reportParameterType";

interface Src {
    [index: string] : any
}

interface SheetHeadType {
    Name: string;
    Mobile: string;
    Card: string;
    Operate: string;
    [subName: string]: string;
}

export type ApplyState = {Value: string | number, PrimaryText: string | number}[];
export type BankList = {Value: string | number, PrimaryText: string | number}[];

interface Config {
    imgSrc: string;
    src: Src;
    height: number;
    sheetHead: SheetHeadType;
    requestList: {
        login: string;
        company: string;
        applyList: string;
    };
    //Company: CallbackRow<'getCompany'>[]
    applyState: ApplyState;
    report: {
        reportSummary: {
            basicInfo: CommonType<BaseParameter> | any;
            basicInfoAnalysis: CommonType<BasicInfoParameter> | any;
            callSummary: CommonType<CallSummaryParameter> | any;
            smsSummary: CommonType<SmsSummaryParameter> | any;
            netSummary: CommonType<NetSummaryParameter> | any;
            riskSummary: CommonType<RiskSummaryParameter> | any;
            activitySummary: CommonType<ActiveSummaryParameter> | any;
            consumeSummary: CommonType<ConsumeSummaryParameter> | any;
            contactSummary: CommonType<ContactSummaryParameter> | any;
            callContact: CommonType<CallContactParameter> | any;
            smsContact:{
                smsNumber: string | number | any,
                smsLocation: string | number | any,
                smsCnt: string | number | any,
            }
            [index: string]: any;
        },
        callDetailReport: any,
        smsDetailReport: any
    },
    ecReport: {
        ecommerceBaseInfo: CommonType<AlipayBasicInfoParameter> | any;
        ecommerceTrades: CommonType<EcommerceTradesParameter> | any;
        ecommerceConsigneeAddresses: CommonType<EcommerceConsigneeAddressesParameter> | any;
        ecommerceBindedBankCards: CommonType<EcommerceBindedBankCardsParameter> | any;
        ecommercePaymentAccounts: CommonType<EcommercePaymentAccountsParameter> | any;
        taobaoOrders: CommonType<TaobaoOrdersParameter> | any;
        soldOrders: CommonType<SoldOrdersParameter> | any;
        seller: CommonType<SellerParameter>;
        logistics: CommonType<LogisticsParameter> | any;
        subOrders: CommonType<SubOrdersParameter> | any;
        huabeiConsumeList: CommonType<HuabeiConsumeListParameter> | any;
        jiebeiInfo: CommonType<JiebeiInfoParameter> | any;
        huabeiInfo: CommonType<HuabeiInfoParameter> | any;
        transferBankCards: CommonType<TransferBankCardsParameter> | any;
        huabeiBills: CommonType<HuabeiBillsParameter> | any;
        myBankBindInfo: CommonType<MyBankBindInfoParameter> | any;
        myBankLoanDetails: CommonType<MyBankLoanDetailsParameter> | any;
        myBankRepayPlanList: CommonType<MyBankRepayPlanListParameter> | any;
        myBankAssetDetails: CommonType<MyBankAssetDetailsParameter> | any;
        alipayBillDetailList: CommonType<AlipayBillDetailListParameter> | any;

    }
    weChatReport: {
        baseInfo: CommonType<WeChatBasicInfoParameter> | any;
        subscribeMsgList: CommonType<SubscribeMsgListParameter> | any;
        contactList: CommonType<ContactListParameter> | any;
        memberList: CommonType<MemberListParameter> | any;
        accout: CommonType<AccoutParameter> | any;
        loanRateList: CommonType<LoanRateListParameter> | any;
        bankCardList: CommonType<BankCardListParameter> | any;
        loanRecordList: CommonType<LoanRecordListParameter> | any;
        loanRecordDetailList: CommonType<LoanRecordDetailListParameter> | any;
        repayRecordList: CommonType<RepayRecordListParameter> | any;
    }

    reportBasicInfo: CommonType<ReportBasicInfoParameter> | any;
    reportBankCardInfo : CommonType<ReportBankCardInfoParameter> | any;
    reportBorrowInfo: CommonType<ReportBorrowInfoParameter> | any;
    reportRelationInfo: CommonType<ReportRelationInfoParameter> | any;

    titleSetting:{
        welcome: string;
        apply: string;
        [index: string]: string;
    }

    statusStatus: {
        "1": string;
        "2": string;
    }

    HuaBeiStatus: {
        "0": string;
        "1": string;
        "2": string;
    }
    marriageStatus: {
        "1": string;
        "2": string;
        "3": string;
    }
    cardTypeStatus: {
        "1": string;
        "2": string;
    },
    sex: {
        '0': string;
        '1': string;
        '2': string;
    }
    verifyFlag: {
        '0': string;
        '1': string;
    }
    loanStatus: {
        '1': string;
        '2': string;
    }
    bankaccTypeStatus: {
        '1': string;
        '2': string;
    }
    isState: {
        '0': string;
        '1': string;
    }
    reportState: {
        '0': string;
        '1': string;
        '2': string;
    }
    reportStateWord: {
        '0': string;
        '1': string;
        '2': string;
    }
    RelationState:{
        "0": string;
        "1": string;
        "2": string;
        "3": string;
    }
    reportColorState: {
        '0': string;
        '1': string;
        '2': string;
    }
    [index: string]: string | number | Object;
    repayAccountTypeState: any;
    bankList: BankList;
}

/*type GetCompanyType = CallbackArray<'getCompany'>;
type GetCompanyOptionType = OptionType<'getCompany'>;
type GetCompanyParameter = Parameter<'getCompany'>;

//公司
class Company {
    companyList:CallbackRow<'getCompany'>[] = [];
    getCompany: () => void = () => {
        let _options: GetCompanyOptionType = {},
            _data: GetCompanyParameter = {token: ''};
        _data.token = localData.getData('Token');
        if (!_data.token) {
            history.push('/');
            return;
        }

        _options.data = {
            token: localData.getData('Token')
        };
        _options.fail = (error)=>{
            console.log(error);
        };
        _options.succeed = (data: GetCompanyType) => {
            if (!data.Status) {
                history.push('/');
                return;
            }
            this.companyList =  data.Data as CallbackRow<'getCompany'>[];
        };
        main('getCompany', _options);
    };
}

//获取公司
function company() {
    let _company = new Company();
   return function () {
        if(_company.companyList.length <= 0){
            _company.getCompany();
        }
        return _company;
    }
}

export const companyList = company();*/

export const config:Config ={
    imgSrc: '/dist/img/',
    height: window.innerHeight,
    src: {
        '/index/apply': '填写申请',
        '/index/applyList': '申请列表',
        '/index/settingPage': '页面设置',
        '/index/reviewList': '审核列表',
        '/index/allContractState': '合同列表',
        '/index/waitCreateContractList': '待生成合同',
        '/index/waitSignContractList': '待签署合同',
        '/index/waitReleaseMarkList': '待发布标的合同',
        '/index/contractRaising': '募集的表的合同',
        '/index/contractLoan': '等待放款合同',
        '/index/contractPerformance': '履约中合同',
        '/index/contractOverdue': '逾期合同',
        '/index/contractSettle': '结清合同',
        '/index/contractFailed': '流标合同',
        '/index/settingRole': '角色设置',
        '/index/settingStore': '门店设置',
        '/index/paydetail': '放款明细',
        '/index/repaydetail': '还款明细',
        '/index/repayList': '还款列表'
    },
    Company: [],
    sheetHead: {
        Name: '用户名',
        RegisterNamePhone: '注册手机用户名',
        RegisterNameCard: '注册手机用户身份证',
        PhonePassword: '手机密码',
        Mobile: '手机号',
        Card: '身份证',
        Operate: '操作',
        StartTime: '申请时间',
        ApplyMoney: '申请金额',
        ApplyTerm: '申请周期',
        Company: '公司',
        EmpName: '业务员',
        FinalMoney: '终审金额',
        FinalTerm: '终审周期',
        State: '状态',
        ApplyType: '申请类型',
        ApplyState: '申请状态'
    },
    requestList: {
        login: 'login',
        company: 'company',
        applyList: 'applyList',
    },

    titleSetting: {
        welcome : '首页',
        apply   : '申请借款'
    },
    //报告参数名设置
    report: {
        reportSummary:{
            basicInfo: {
                telNum: "手机号",
                name: "姓名",
                idCard: "身份证",
                netJoinDuration: '入网时长（单位为月）',
                accountBalance: '账户余额',
                telNumProvince: "手机号所在省份",
                telNumCity: "手机号所在市",
                telCustomerLevel: "手机号运营商星级",
                lastMonthPayFee: '上月消费金额',
                telPackage: '手机套餐',
                queryDate: "查询日期"
            },
            basicInfoAnalysis: {
                idCardMatchStatus: '身份证匹配状态',
                nameMatchStatus: '姓名匹配状态',
                familiarityStatus: '亲情网状态',
                familiarityHolderStatus: '亲情网户主状态',
                mobileMatchIdCardStatus: '手机归属地与身份证归属地匹配状态',
                authCnt: '授权次数'
            },
            callSummary: {
                contactCnt: '联系号码总数',
                frequentContactCnt: '频繁联系人数，联系人联系次数大于（10次每月）',
                frequentContactLocation: '联系人最多的区域（省级别）',
                idCardLocationMatchStatus: '联系人最多的归属地与身份证地址是否匹配',
                validCallCnt: '有效通话数（通话时长>20s)',
                asCalledValidCallCnt: '被叫有效通话个数（通话时长>20s）',
                asCallerValidCallCnt: '主叫有效通话个数（通话时长>20s）',
                homeValidCallCnt: '与身份证归属地通话个数',
                callCnt: '通话总个数',
                asCalledCallCnt: '被叫通话数',
                asCallerCallCnt: '主叫通话数',
                midNightCallCnt: '半夜通话数（00:00-06:00）',
                midNightContactCnt: '半夜联系人个数',
                asCalledMidNightCallCnt: '被叫半夜通话个数',
                asCallerMidNightCallCnt: '主叫半夜通话个数',
                hourFrequentCallCnt: '一个小时内通话最大数量',
                hourFrequentContactCnt: '一个小时内联系人最多个数',
                hourFrequentCallDate: '一个小时内最频繁通话的日期',
                silenceAvgMinute: '平均静默时长',
                silenceCnt: '静默总次数',
                silenceDayCnt: '静默总天数',
                silenceMinute: '静默总时长'
            },
            smsSummary: {
                contactCnt: '联系号码总数',
                frequentContactCnt: '频繁联系人数，联系人联系次数大于（10次每月)',
                frequentContactLocation: "联系人最多的区域（省级别）",
                idCardLocationMatchStatus: '联系人最多的归属地与身份证地址是否匹配',
                homeSmsCnt: '与身份证归属地短信个数',
                midNightSmsCnt: '半夜短信数（00:00-06:00）',
                midNightContactCnt: '半夜联系人个数',
                hourFrequentSmsCnt: '一个小时内短信最大数量',
                hourFrequentContactCnt: '一个小时内联系人最多个数',
                hourFrequentSmsDate: "一个小时内最频繁短信的日期"
            },
            netSummary: {
                frequentContactLocation: '流量常用地',
                idCardLocationMatchStatus: '流量常用地与身份证地址是否匹配',
                netUseCnt: '流量使用次数',
                netUseTotalFlow: '流量使用总量',
            },
            riskSummary: {
                creditCardCallCnt: '信用卡类通话次数',
                creditCardCallDuration: '信用卡类通话时长（单位：秒）',
                creditCardSmsCnt: '信用卡类短信次数',
                loanPlatformCallCnt: '小贷平台通话次数',
                loanPlatformCallDuration: '小贷平台通话时长（单位：秒）',
                loanPlatformSmsCnt: '小贷平台短信次数',
                call110Cnt: '110通话次数',
                call110Duration: '110通话时长',
                macaoCallCnt:'澳门地区通话次数',
                macaoCallDuration:'澳门地区通话时长（单位：秒）',
                macaoSmsCnt:'澳门地区短信次数',
                debtCallCnt: '催收公司通话次数',
                debtCallDuration: '催收公司通话时长（单位：秒）',
                debtSmsCnt: '催收公司短信次数',
                lawyerCallCnt: '律师类通话次数',
                lawyerCallDuration: '律师类通话时长（单位：秒）',
                lawyerSmsCnt: '律师类短信次数',
                courtCallCnt: '法院类通话次数',
                courtCallDuration: '法院类通话时长 （单位：秒）',
                courtSmsCnt: '法院类短信次数'
            },
            activitySummary:{
                callDayCnt: '通话天数',
                smsDayCnt: '短信天数',
                netDayCnt: '流量天数',
                rechargeDayCnt: '充值次数',
            },
            consumeSummary: {
                billMonth: '账单月',
                callCnt: '通话次数',
                callDuration: '通话时长',
                callerCnt: '主叫次数',
                callerDuration: '主叫时长',
                calledCnt: '被叫次数',
                calledDuration: '被叫时长',
                smsCnt: '月短信次数',
                payFee : '月消费金额'
            },
            contactSummary: {
                top3CallContacts: '前三通话联系人（按通话次数排序）',
                top3CallValidContacts: '前三有效通话联系人（按有效通话次数排序）',
                top3CallCloseContacts: '前三亲密通话联系人（按联系人亲密度排序）',
                top3SmsContacts: '前三短信联系人（按短信次数排序）',
                timeDimensionType:'时间跨度'
            },
            callContact: {
                callNumber:'通话号码',
                callLocation:'通话号码归属地',
                callCnt:'通话次数',
                callDuration:'通话时长',
                validCallCnt:'有效通话次数',
                validCallDuration: '有效通话时长',
                callerCnt: '主叫通话次数',
                callerDuration: '主叫通话时长',
                calledCnt: '被叫次数',
                calledDuration: '被叫通话时长',
                // mark: '号码标签',
                // type: '号码标签类型',
            },
            smsContact:{
                smsNumber: '短信号码',
                smsLocation: '短信号码归属地',
                smsCnt: '短信次数',
            }
        },
        callDetailReport: {
            callLocations: {
                location: '通话号码归属地',
                callCnt: '通话次数',
                callNumberCnt: '通话号码个数',
                callDuration: '通话时长',
                callerCnt: '主叫通话次数',
                callerDuration: '主叫通话时长',
                calledCnt: '被叫次数',
                calledDuration: '被叫通话时长'
            },
            callNumbers: {
                number: '通话号码',
                intimacy: '通话亲密度',
                location: '通话号码归属地',
                callCnt: '通话次数',
                callDuration: '通话时长',
                validCallCnt: '有效通话次数',
                validCallDuration: '有效通话时长',
                callerCnt: '主叫通话次数',
                callerDuration: '主叫通话时长',
                validCallerCnt: '有效主叫通话次数',
                validCallerDuration: '有效主叫通话时长',
                calledCnt: '被叫次数',
                calledDuration: '被叫通话时长',
                validCalledCnt: '有效被叫通话次数',
                validCalledDuration: '有效被叫通话时长',
            },
            callSilenceSheets: {
                silenceMonth: '静默时间统计的月份',
                silenceDayCnt: '静默天数',
                silenceMinute: '静默时长（分）',
                silenceCnt: '静默次数',
                silenceAvgMinute: '平均静默时长',
                silenceDeatil: '静默详情'
            }
        },
        smsDetailReport: {
            smsDetailReport:{
                smsLocations: '短信区域详细报告',
                smsNumbers: '短信号码详细报告'
            },
            smsLocation: {
                location: '短信号码归属地',
                smsCnt: '短信次数',
                smsNumberCnt: '短信号码个数'
            },

            smsNumber: {
                number: '短信号码',
                location: '短信号码归属地',
                totalCnt: '短信次数',
            }
        }
    },

    //电商参数名设置
    ecReport: {
        ecommerceBaseInfo: {
            alipayUserId: '支付宝账户用户编号',
            alipayAccountType: '支付宝账户类型',
            alipayAccount: '支付宝账号',
            taobaoAccount: '绑定的淘宝账号',
            name: '支付宝处登记姓名',
            email: '支付宝处登记邮箱',
            mobile: '支付宝处登记手机',
            alipayBalance: '支付宝余额',
            yuebaoBalance: '余额宝余额',
            earliestTaobaoOrderDate: '最早淘宝订单',
            alipayRegistrationDatetime: '支付宝注册时间',
            isVerified: '是否实名认证',
            huabeiAmount: '花呗额度(包含临时信用额度)',
            huabeiBalance: '花呗余额(如用户已逾期，此数值为负数)',
            huabeiPenaltyAmount: '花呗的罚息',
            huabeiStatus: '花呗状态',
            huabeiOverdueDays: '花呗的逾期天数',
            huabeiPayDay: '花呗还款日',
            huabeiOverdueBillCnt: '花呗的逾期账单数',
            huabeiCurrentMonthPayment: '花呗当月还款额',
            huabeiNextMonthPayment: '花呗下月还款额',
            creditLevelAsBuyer: '作为买家信用额度',
            creditLevelAsSeller: '作为卖家信用额度',
            identityCard: '支付宝处登记身份证号',
            jiebeiAmount: '借呗额度',
            jiebeiBalance: '借呗余额',
            huabeiOriginalAmount: '花呗原始信用额度',
            status: '授权的人和实际抓取信息是否一致',
            taoScore: '淘气值',
            balancePaymentEnable: '支付宝余额支付开关',
            yuebaoIncome: '余额宝累计收益',
            tmallScore: '天猫积分',
            antMemberScore: '蚂蚁会员积分',
            postCode: '淘宝个人信息中邮编',
            detailAddress: '淘宝个人信息中详细地址',
            weiboAccount: '淘宝绑定的微博账号',
            weiboNickName: '淘宝绑定的微博妮称',
            rateSummaryAsBuyer: '买家好评率',
            sixMonthGoodRateAsBuyer: '近6个月买家好评数',
            totalGoodRateAsBuyer: '总计买家好评数',
            sixMonthNeutralRateAsBuyer: '近6个月买家中评数',
            totalNeutralRateAsBuyer: '总计买家中评数',
            sixMonthBadRateAsBuyer: '近6个月买家差评数',
            totalBadRateAsBuyer: '总计买家差评数',
            rateSummaryAsSeller: '卖家好评率',
            sixMonthGoodRateAsSeller: '近6个月卖家好评数',
            totalGoodRateAsSeller: '总计卖家好评数',
            sixMonthNeutralRateAsSeller: '近6个月卖家中评数',
            totalNeutralRateAsSeller: '总计卖家中评数',
            sixMonthBadRateAsSeller: '近6个月卖家差评数',
            totalBadRateAsSeller: '总计卖家差评数',
            taobaoUserId: '淘宝用户id',
            // taobaoImgUrl: '淘宝头像链接'
        },
        ecommerceTrades: {
            title: '购物标题',
            amount: '金额',
            tradeNo: '交易号',
            tradeTime: '交易时间',
            tradeStatusName: '交易状态',
            txTypeId: '交易类型id',
            txTypeName: '交易类型',
            behaviorLableName: '行为标签',
            tradeDetailUrl: '交易详情URL',
            otherSide: '交易对方',
            otherSideAccount: '交易对方账号',
            otherSideName: '交易对方姓名',
            payType: '支付方式',
            payAccount: '支付银行以及卡号',
            isDelete: '是否被删除'
        },
        ecommerceConsigneeAddresses: {
            receiveName: '收货人',
            postCode: '收货地址邮政编码',
            address: '地址',
            region: '收货地址所在区域',
            uuid: '地址唯一标示',
            telNumber: '电话',
            tradeTime: '真实收货地址对应的最近交易时间',
            tradeNo: '真实收货地址对应的最近交易号',
            defaultStatus: '是否默认地址'
        },
        ecommerceBindedBankCards: {
            bankName: '银行名称',
            cardNo: '卡号后4位',
            cardType: '类型',
            cardOwnerName: '银行卡持卡人姓名',
            isExpress: '是否开通快捷支付',
            bankSign: '银行标示',
            applyTime: '开通时间',
            cardFullNumber: '银行卡号',
            signid: '银行卡支付宝唯一标示',
            mobile: '绑卡手机号',
            bankShortName: '银行缩写'
        },
        ecommercePaymentAccounts: {
            category: '缴费项目',
            city: '地区',
            organization: '收款单位',
            accountName: '户名',
            accountCode: '缴费号码'
        },
        taobaoOrders: {
            tradeNumber: '支付交易号',
            orderNumber: '订单号',
            tradeStatusName: '交易状态',
            tradeTypeName: '交易类型',
            createTime: '创建时间',
            endTime: '订单完成',
            payTime: '支付时间',
            totalQuantity: '商品总数量',
            postFees: '邮费',
            actualFee: '实付金额',
            virtualSign: '是否虚拟商品',
            mobileTradeStatus: '是否手机订单'
        },
        soldOrders: {
            tradeNumber: '支付交易号',
            orderNumber: '订单号',
            tradeStatusName: '交易状态',
            tradeTypeName: '交易类型',
            createTime: '创建时间',
            endTime: '订单完成',
            totalQuantity: '商品总数量',
            postFees: '邮费',
            actualFee: '实付金额',
            address: '交易地址',
            post: '邮编',
            phone: '手机号',
            receiveName: '收货人',
        },
        seller: {
            shopId: '淘宝卖家id',
            shopName: '店铺名称',
            nick: '店铺昵称',
            url: '店铺链接',
            pic: '店铺头像'
        },
        logistics: {
            companyCode: '物流公司编码',
            companyName: '物流公司名',
            mailNo: '物流号',
            createTime: '创建时间',
            lastTime: '最新物流时间',
            lastMsg: '最新物流信息',
            postManName: '派件员',
            postManPhone: '派件员手机号',
            postManSiteName: '派件人所在网点'
        },
        subOrders: {
            itemTitle: '商品名称',
            itemId: '商品id',
            quantity: '购买数量',
            original: '原价',
            actual: '实际金额',
            itemPic: '商品图片',
            itemUrl: '商品链接'
        },
        huabeiConsumeList: {
            image: '头像标识',
            amount: '额度变化金额',
            type: '类型',
            time: '交易时间',
            title: '交易名称',
            tradeNo: '交易号',
            bizType: '业务类型',
            status: '是否删除',
            billMonth: '花呗所在账单月'
        },
        jiebeiInfo: {
            jiebeiAmount: '借呗额度',
            jiebeiBalance: '借呗余额',
            jiebeiRiskRate: '借呗日利率',
            jiebeiOvdAble: '借呗是否逾期',
            jiebeiNewAble: '借呗是否新开',
            jiebeiIsClosed: '借呗是否关闭',
            jiebeiUnClearLoanCount: '未还期数',
            jiebeiStatus: '借呗状态'
        },
        huabeiInfo: {
            huabeiAmount: '花呗额度',
            huabeiBalance: '花呗余额',
            huabeiOriginalAmount: '花呗原始信用额度',
            huabeiStatus: '花呗状态',
            huabeiPenaltyAmount: '花呗的罚息'
        },
        transferBankCards: {
            bankName: '银行名',
            cardNumber: '银行卡号后四位',
            cardOwnerName: '银行卡持卡人姓名',
            cardFullNumber: '完整银行卡号',
            bankShortName: '银行缩写'
        },
        huabeiBills: {
            billMonth: '账单月',
            isBilled: '是否已出账',
            totalAmount: '总欠款额度',
            unRepayAmount: '未还款额度',
            repayDate: '还款日',
            isClear: '是否还清',
            isOverDue: '是否逾期',
            totalPenalty: '总罚息',
            miniAmount: '最小还款额',
            hasHistoryOvdBill: '历史账单是否结清',
            refundAmount: '退款金额'
        },
        myBankBindInfo: {
            weBankUserId: '网商贷用户Id',
            weBankRepayAccount: '还款账号',
            weBankRepayAccountType: '还款账号类型',
            weBankTotalAmount: '网商贷总欠款额度',
            weBankOverdueAmount: '网商贷总逾期额度'
        },
        myBankLoanDetails: {
            applyDate: '申请时间',
            channel: '申请渠道',
            lendDetailUrl: '借款详情链接',
            loanAmt: '借款金额',
            loanArNo: '借款流水号',
            loanDate: '借款日期',
            loanPdName: '借款产品',
            loanTerm: '借款总期数',
            ownerPhoneNo: '借款人手机号',
            repayAccount: '还款账号',
            repayAccountType: '还款账号类型',
            repayModeDesc: '还款方式',
            statusDesc: '当前状态'
        },
        myBankRepayPlanList: {
            feeAmount: '利息',
            prinAmount: '本金',
            totalAmount: '总金额',
            repayAccountNo: '还款账号',
            repayAccountType: '还款账号类型',
            repayDate: '还款日期'
        },
        myBankAssetDetails: {
            tradeAmt: '金额',
            tradeType: '交易类型',
            transDate: '交易日期',
            assetDetailUrl: '详情链接',
            bizNo: '流水号',
            assetAccount: '资金账号',
            assetAccountType: '资金账号类型'
        },
        alipayBillDetailList: {
            billMonth: '账单月',
            expendAmount: '支出金额',
            expendCount: '支出笔数',
            incomeAmount: '收入金额',
            incomeCount: '收入笔数',
            payableAmount: '待支出金额',
            payableCount: '待支出笔数',
            receivableAmount: '待收入金额',
            receivableCount: '待收入笔数'
        }
    },

    //微信参数名设置
    weChatReport: {
        baseInfo: {
            uin: '微信账户唯一标示',
            nickName: '昵称',
            remarkName: '备注名',
            sex: '性别',
            signature: '签名',
            // headImgPath: '头像图片',
            verifyFlag: '账号类型'
        },
        subscribeMsgList: {
            nickName: '发布者昵称',
            publishTime: '发布时间',
            title: '标题',
            digest: '文摘',
            cover: '文章封面',
            url: '文章链接'
        },
        contactList: {
            uuId: '用户唯一id',
            nickName: '昵称',
            remarkName: '备注名',
            sex: '性别',
            verifyFlag: '账号类型',
            starFriend: '星级好友',
            attrStatus: '属性状态',
            province: '省',
            city: '市',
            isGroup: '是否群组',
            isOwner: '是否群主',
            memberCount: '群组人数',
            isCollection: '群组是否收藏',
            recentContactTimes: '联系次数',
            statues: '群组是否开启消息推送',
            snsFlag: '是否有朋友圈相册',
            intimacy: '亲密度',
            isBlack: '是否加入黑名单',
            isTopContact: '聊天知否置顶是',
            isMuted: '是否屏蔽消息',
            isContact: '是否联系人',
            hasContacted: '是否聊过天',
            snsNotLookOther: '不看别人朋友圈',
            snsOtherNotLook: '不让别人看朋友圈',
            headImgPath: '头像图片路径',
            signature: '个人签名',
            alias: '别名',
            displayName: '展示名'
        },
        memberList: {
            uuId: '用户唯一id',
            nickName: '昵称',
            displayName: '显示名',
            memberStatus: '成员状态',
            attrStatus: '属性状态'
        },
        accout: {
            idType: '证件类型',
            idNo: '证件号前四位',
            surName: '待确认姓名',
            name: '姓名',
            mobileNo: '手机后四位',
            active: '是否有效',
            isOverdue: '是否逾期',
            isFirstLoan: '首次借贷',
            cardNo: '微粒贷卡号',
            totalAmount: '总额度',
            availableAmount: '有效额度',
            currPmtDueDate: '当前期最后还款日',
            currBal: '当前期需还款额',
            loanStatus: '借款状态',
            custType: '微粒贷用户分群',
            unpaidLoans: '未还清的借款数',
            isActivated: '是否激活',
            firstPurchaseDate: '首次贷款日',
            overdueUnpay: '逾期未还金额',
            overdueTerms: '逾期未还期数',
            overdueDays: '逾期天数',
            overdueOffsetDays: '逾期抵扣天数',
            defaultBindSerial: '默认绑卡的序列',
        },
        loanRateList: {
            loanTerm: '借款期数',
            interestRate: '利率',
            penaltyRate: '罚息率'
        },
        bankCardList: {
            bankType: '银行类型',
            bindSerial: '绑卡序列',
            bankName: '银行名',
            cardTail: '卡号后四位',
            bankaccType: '卡类型'
        },
        loanRecordList: {
            loanReceiptNo: '借款号',
            loanInitTerm: '借款期数',
            loanInitPrin: '借款金额',
            registerDate: '申请日期',
            remainUnpayPrin: '剩余未还',
            overDueFlag: '逾期标示',
            payOffFlag: '还清标示',
            loanBank: '借款银行',
            debitCardNo: '借款银行卡后四位',
            interestRate: '借款利率',
            requestTime: '申请时间',
            expireDate: '到期时间',
            firstBillDate: '首账单日',
            name: '借款人姓名',
            phone: '借款人手机号',
            currentTerm: '当前期数',
            currentAmount: '当期未还金额',
            scheduleList: '借款分期明细'
        },
        loanRecordDetailList: {
            interest: '利息',
            isDue: '逾期标示',
            isPaid: '还款标示',
            payDate: '还款日',
            payOffFlag: '还清标示',
            preInterest: '当期原始利息',
            principal: '当期本金'
        },
        repayRecordList: {
            repayTime: '还款日期',
            repayAmount: '还款金额',
            payBank: '还款银行',
            debitCardNo: '还款卡号后四位',
            pmtInd: '是否代扣'
        }
    },


    //报告数据借款人基本信息
    reportBasicInfo: {
        RealName: '真实姓名',
        Birthday: '出生年月',
        IDCardNo: '身份证号码',
        Mobile: '手机号码',
        // BankName: '银行名称',
        // BankCardNo: '银行卡号',
        Email: '邮箱',
        Sex: '性别',
        HouseholdAddress: '居住地址',
        MaritalStatus: '婚姻状况',
        // HouseAddress: '居住地址',
        // Marriage: '婚姻状况',
        // CompanyName: '公司名称',
        // CompanyAddress: '公司地址',
        // Department: '部门名称',
        // Salary: '薪资',
    },

    //报告数据借款人银行卡信息
    reportBankCardInfo: {
        BankCardNo: '银行卡号',
        BankName: '银行名称',
        Mobile: '银行预留手机号'
    },

    //报告数据借款人借款信息
    reportBorrowInfo: {
        Money: '借款金额',
        Period: '借款期数',
        // Purpose: '借款用途'
    },

    //报告数据借款人借款信息
    reportRelationInfo: {
        contactName: '联系人姓名',
        contactMobile: '联系人手机号',
        contactAddress: '联系人地址',
        contactRelation: '联系人关系'
    },

    //卡类型
    marriageStatus: {
        "1": "已婚",
        "2": "未婚",
        "3": "离异",
    },

    //卡类型
    cardTypeStatus: {
        "1": "借记卡",
        "2": "信用卡"
    },

    //授权的人和实际抓取信息设置
    statusStatus: {
        "1": "是",
        "2": "否"
    },

    //花呗状态设置
    HuaBeiStatus: {
        "0": "未冻结",
        "1": "冻结",
        "2": "逾期"
    },

    //借款状态设置
    loanStatus: {
        "1": "有贷款",
        "2": "无欠款"
    },

    bankaccTypeStatus: {
        "1": "借记卡",
        "2": "信用卡"
    },
    //关系状态
    RelationState:{
        "0": "父母",
        "1": "配偶",
        "2": "朋友",
        "3": "亲戚"
    },

    //是否状态设置
    isState: {
        '0': '否',
        '1': '是'
    },

    //账号类型设置
    verifyFlag: {
        '0': '个人号',
        '1': '公众号'
    },

    //性别设置
    sex: {
        '0': '未知',
        '1': '男',
        '2': '女'
    },

    //状态设置
    reportState: {
        '0': 'check_box',
        '1': 'cancel',
        '2': 'error'
    },
    reportStateWord: {
        '0': '匹配',
        '1': '不匹配',
        '2': '未知状态'
    },
    //状态设置
    reportColorState: {
        '0': '#00cd0c',
        '1': '#e22500',
        '2': '#ffcf00'
    },
    //状态配置
    applyState:[],
    repayAccountTypeState: {
        "ICBCC1CN": "工商银行",
        "AOBCC1CN": "农业银行",
        "BKCHC1CN": "中国银行",
        "PCBCC1CN": "建设银行",
        "BOCMC1CN": "交通银行",
        "ECITC1CN": "中信银行",
        "CGBCC1CN": "广发银行",
        "CMBCC1CN": "民生银行",
        "CEBBC1CN": "光大银行",
        "PINGC1CN": "平安银行",
        "CMBKC1CN": "招商银行",
        "CIBKC1CN": "兴业银行",
        "SPDBC1CN": "浦发银行",
        "SHHBC1CN": "上海银行",
        "NBCBC1CN": "宁波银行",
        "HXBKC1CN": "华夏银行",
        "BOBJC1CN": "北京银行",
        "0711C1CN": "包商银行",
        "JSBCC1CN": "江苏银行",
        "0918C1CN": "东莞银行",
        "X008C1CN": "广东南粤银行",
        "Y220C1CN": "广州银行",
        "0962C1CN": "珠海华润银行",
        "CZBKC1CN": "浙商银行",
        "PSBCC1CN": "邮储银行",
        "Y048C1CN": "深圳农商行",
        "1040C1CN": "广东华兴银行",
        "ALIPAY": "支付宝",
        "MYBKC1CN": "网商银行",
        "1297C1CN": "桂林银行"
    },
    bankList:[
        {
            Value: "ICBC",
            PrimaryText: "工商银行"
        },
        {
            Value: "ABC",
            PrimaryText: "农业银行"
        },
        {
            Value: "BOC",
            PrimaryText: "中国银行"
        },
        {
            Value: "CCB",
            PrimaryText: "建设银行"
        },
        {
            Value: "CMB",
            PrimaryText: "招商银行"
        },
        {
            Value: "BCOM",
            PrimaryText: "交通银行"
        },
        {
            Value: "SPDB",
            PrimaryText: "浦发银行"
        },
        {
            Value: "CITIC",
            PrimaryText: "中信银行"
        },
        {
            Value: "CIB",
            PrimaryText: "兴业银行"
        },
        {
            Value: "CMBC",
            PrimaryText: "民生银行"
        },
        {
            Value: "PAB",
            PrimaryText: "平安银行"
        },
        {
            Value: "GDB",
            PrimaryText: "广发银行"
        },
        {
            Value: "SHB",
            PrimaryText: "上海银行"
        },
        {
            Value: "CEB",
            PrimaryText: "光大银行"
        },
        {
            Value: "HXB",
            PrimaryText: "华夏银行"
        },
        {
            Value: "PSBC",
            PrimaryText: "中国邮政储蓄银行"
        },
        {
            Value: "JSB",
            PrimaryText: "江苏银行"
        },
        {
            Value: "NBCB",
            PrimaryText: "宁波银行"
        },
        {
            Value: "DLB",
            PrimaryText: "大连银行"
        },
        {
            Value: "SRCB",
            PrimaryText: "上海农商行"
        },
        {
            Value: "JJB",
            PrimaryText: "九江银行"
        },
        {
            Value: "NCB",
            PrimaryText: "南昌银行"
        },
        {
            Value: "IMB",
            PrimaryText: "内蒙古银行"
        },
        {
            Value: "BSB",
            PrimaryText: "包商银行"
        },
        {
            Value: "JZB",
            PrimaryText: "锦州银行"
        },
        {
            Value: "QLB",
            PrimaryText: "齐鲁银行"
        },
        {
            Value: "WHCCB",
            PrimaryText: "威海市商业银行"
        },
        {
            Value: "WFB",
            PrimaryText: "潍坊银行"
        },
        {
            Value: "HBBB",
            PrimaryText: "湖北银行"
        },
        {
            Value: "CDB",
            PrimaryText: "承德银行"
        },
        {
            Value: "HZB",
            PrimaryText: "杭州银行"
        },
        {
            Value: "TZB",
            PrimaryText: "台州银行"
        },
        {
            Value: "LZB",
            PrimaryText: "兰州银行"
        },
        {
            Value: "SRB",
            PrimaryText: "上饶银行"
        },
        {
            Value: "HRBB",
            PrimaryText: "哈尔滨银行"
        },
        {
            Value: "LJB",
            PrimaryText: "龙江银行"
        },
        {
            Value: "GZCB",
            PrimaryText: "广州银行"
        },
        {
            Value: "HSB",
            PrimaryText: "徽商银行"
        },
        {
            Value: "NXB",
            PrimaryText: "宁夏银行"
        },
        {
            Value: "DYB",
            PrimaryText: "东营银行"
        },
        {
            Value: "NJCB",
            PrimaryText: "南京银行"
        },
        {
            Value: "GYB",
            PrimaryText: "贵阳银行"
        },
        {
            Value: "QHB",
            PrimaryText: "青海银行"
        },
        {
            Value: "YZB",
            PrimaryText: "鄞州银行"
        },
        {
            Value: "CSB",
            PrimaryText: "长沙银行"
        },
        {
            Value: "CQB",
            PrimaryText: "重庆银行"
        },
        {
            Value: "HBB",
            PrimaryText: "河北银行"
        },
        {
            Value: "CDRCBB",
            PrimaryText: "成都农商"
        },
        {
            Value: "ZJTLCB",
            PrimaryText: "泰隆商行"
        },
        {
            Value: "SXRCB",
            PrimaryText: "绍兴银行"
        },
        {
            Value: "ZJCZCB",
            PrimaryText: "稠州商行"
        },
        {
            Value: "ZJRCC",
            PrimaryText: "浙江农信"
        },
        {
            Value: "HZRCB",
            PrimaryText: "湖州商行"
        },
        {
            Value: "ZJMTCB",
            PrimaryText: "民泰商行"
        },
        {
            Value: "JHRCB",
            PrimaryText: "金华银行"
        },
        {
            Value: "GZRCB",
            PrimaryText: "赣州银行"
        },
        {
            Value: "CRB",
            PrimaryText: "广州农商行"
        },
        {
            Value: "DGB",
            PrimaryText: "东莞银行"
        },
        {
            Value: "DGRCB",
            PrimaryText: "东莞农商行"
        },
        {
            Value: "HYB",
            PrimaryText: "华润银行"
        },
        {
            Value: "NYB",
            PrimaryText: "南粤银行"
        },
        {
            Value: "SDRCB",
            PrimaryText: "顺德农商行"
        },
        {
            Value: "SZSB",
            PrimaryText: "石嘴山银行"
        },
        {
            Value: "SJB",
            PrimaryText: "盛京银行"
        },
        {
            Value: "LSSRCB",
            PrimaryText: "临商银行"
        },
        {
            Value: "DZB",
            PrimaryText: "德州银行"
        },
        {
            Value: "LSB",
            PrimaryText: "莱商银行"
        },
        {
            Value: "RZRCB",
            PrimaryText: "日照银行"
        },
        {
            Value: "QSRCB",
            PrimaryText: "齐商银行"
        },
        {
            Value: "BJRCB",
            PrimaryText: "北京农商行"
        },
        {
            Value: "CSRCB",
            PrimaryText: "常熟农商行"
        },
        {
            Value: "JYRCB",
            PrimaryText: "江阴农商行"
        },
        {
            Value: "JSRCU",
            PrimaryText: "江苏农信"
        },
        {
            Value: "WXRCB",
            PrimaryText: "无锡农商行"
        },
        {
            Value: "WJRCB",
            PrimaryText: "吴江农商行"
        },
        {
            Value: "FJRCC",
            PrimaryText: "福建农信"
        },
        {
            Value: "GXBBWB",
            PrimaryText: "广西北部湾"
        },
        {
            Value: "QHRCC",
            PrimaryText: "青海农信"
        },
        {
            Value: "HNRCC",
            PrimaryText: "湖南农信"
        },
        {
            Value: "QDRCB",
            PrimaryText: "青岛银行"
        },
        {
            Value: "SQB",
            PrimaryText: "商丘银行"
        },
        {
            Value: "HKB",
            PrimaryText: "汉口银行"
        },
        {
            Value: "JLRCB",
            PrimaryText: "吉林银行"
        },
        {
            Value: "CQRCB",
            PrimaryText: "重庆农商"
        },
        {
            Value: "TJRCB",
            PrimaryText: "天津农商"
        },
        {
            Value: "TJB",
            PrimaryText: "天津银行"
        },
        {
            Value: "YNRCC",
            PrimaryText: "云南农信"
        },
        {
            Value: "FDB",
            PrimaryText: "富滇银行"
        },
        {
            Value: "SXRCC",
            PrimaryText: "山西省联社"
        },
        {
            Value: "BOCD",
            PrimaryText: "成都银行"
        },
        {
            Value: "SHB",
            PrimaryText: "上海银行"
        }
    ]
};
