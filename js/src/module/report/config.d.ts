import { AccoutParameter, ActiveSummaryParameter, AlipayBasicInfoParameter, AlipayBillDetailListParameter, BankCardListParameter, BaseParameter, BasicInfoParameter, CallContactParameter, CallSummaryParameter, CommonType, ConsumeSummaryParameter, ContactListParameter, ContactSummaryParameter, EcommerceBindedBankCardsParameter, EcommerceConsigneeAddressesParameter, EcommercePaymentAccountsParameter, EcommerceTradesParameter, HuabeiBillsParameter, HuabeiConsumeListParameter, HuabeiInfoParameter, JiebeiInfoParameter, LoanRateListParameter, LoanRecordDetailListParameter, LoanRecordListParameter, LogisticsParameter, MemberListParameter, MyBankAssetDetailsParameter, MyBankBindInfoParameter, MyBankLoanDetailsParameter, MyBankRepayPlanListParameter, NetSummaryParameter, RepayRecordListParameter, ReportBankCardInfoParameter, ReportBasicInfoParameter, ReportBorrowInfoParameter, ReportRelationInfoParameter, RiskSummaryParameter, SellerParameter, SmsSummaryParameter, SoldOrdersParameter, SubOrdersParameter, SubscribeMsgListParameter, TaobaoOrdersParameter, TransferBankCardsParameter, WeChatBasicInfoParameter } from "./reportComponents/reportParameterType";
interface Src {
    [index: string]: any;
}
interface SheetHeadType {
    Name: string;
    Mobile: string;
    Card: string;
    Operate: string;
    [subName: string]: string;
}
export declare type ApplyState = {
    Value: string | number;
    PrimaryText: string | number;
}[];
export declare type BankList = {
    Value: string | number;
    PrimaryText: string | number;
}[];
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
            smsContact: {
                smsNumber: string | number | any;
                smsLocation: string | number | any;
                smsCnt: string | number | any;
            };
            [index: string]: any;
        };
        callDetailReport: any;
        smsDetailReport: any;
    };
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
    };
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
    };
    reportBasicInfo: CommonType<ReportBasicInfoParameter> | any;
    reportBankCardInfo: CommonType<ReportBankCardInfoParameter> | any;
    reportBorrowInfo: CommonType<ReportBorrowInfoParameter> | any;
    reportRelationInfo: CommonType<ReportRelationInfoParameter> | any;
    titleSetting: {
        welcome: string;
        apply: string;
        [index: string]: string;
    };
    statusStatus: {
        "1": string;
        "2": string;
    };
    HuaBeiStatus: {
        "0": string;
        "1": string;
        "2": string;
    };
    marriageStatus: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
    };
    cardTypeStatus: {
        "1": string;
        "2": string;
    };
    sex: {
        '0': string;
        '1': string;
        '2': string;
    };
    verifyFlag: {
        '0': string;
        '1': string;
    };
    loanStatus: {
        '1': string;
        '2': string;
    };
    bankaccTypeStatus: {
        '1': string;
        '2': string;
    };
    isState: {
        '0': string;
        '1': string;
    };
    reportState: {
        '0': string;
        '1': string;
        '2': string;
    };
    reportStateWord: {
        '0': string;
        '1': string;
        '2': string;
    };
    RelationState: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
    };
    reportColorState: {
        '0': string;
        '1': string;
        '2': string;
    };
    [index: string]: string | number | Object;
    repayAccountTypeState: any;
    bankList: BankList;
}
export declare const config: Config;
export {};
