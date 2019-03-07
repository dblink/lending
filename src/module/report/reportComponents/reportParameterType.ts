
/**
 * 活跃分析摘要
 */
export type ActiveSummaryParameter = 'timeDimensionType' | 'callDayCnt'
    | 'smsDayCnt' | 'netDayCnt' | 'rechargeDayCnt';

export type BaseParameter = 'telNum' | 'name' | 'idCard' | 'netJoinDuration' | 'accountBalance'
    | 'telNumProvince' | 'telNumCity' | 'telCustomerLevel' | 'telPackage' | 'lastMonthPayFee' | 'queryDate'

export type ConsumeSummaryParameter = 'billMonth' | 'callCnt' | 'callDuration' | 'callerCnt'
    | 'callerDuration' | 'calledCnt' | 'calledDuration' | 'smsCnt' | 'payFee';

export type ContactSummaryParameter = 'top3CallContacts' | 'top3CallValidContacts'
    | 'top3CallCloseContacts' | 'top3SmsContacts' | 'timeDimensionType' ;

export type BasicInfoParameter = 'idCardMatchStatus' | 'nameMatchStatus' | 'familiarityStatus'
    | 'familiarityHolderStatus' | 'mobileMatchIdCardStatus' | 'authCnt';

export type CallSummaryParameter = 'contactCnt' | 'frequentContactCnt' | 'frequentContactLocation'
    | 'idCardLocationMatchStatus' | 'validCallCnt' | 'asCalledValidCallCnt' | 'asCallerValidCallCnt'
    | 'homeValidCallCnt' | 'callCnt' | 'asCalledCallCnt' | 'asCallerCallCnt'| 'midNightCallCnt'
    | 'midNightContactCnt' | 'asCalledMidNightCallCnt' | 'asCallerMidNightCallCnt' | 'hourFrequentCallCnt'
    | 'hourFrequentContactCnt' | 'hourFrequentCallDate' | 'silenceAvgMinute' | 'silenceCnt' | 'silenceDayCnt'
    | 'silenceMinute' | 'timeDimensionType';

export type NetSummaryParameter = 'frequentContactLocation' | 'idCardLocationMatchStatus' | 'netUseCnt'
    | 'netUseTotalFlow' | 'timeDimensionType';

export type RiskSummaryParameter = 'creditCardCallCnt' | 'creditCardCallDuration' | 'creditCardSmsCnt'
    | 'loanPlatformCallCnt'| 'loanPlatformCallDuration' | 'loanPlatformSmsCnt' | 'call110Cnt'
    | 'call110Duration' | 'macaoCallCnt' | 'macaoCallDuration' | 'macaoSmsCnt' | 'debtCallCnt'
    | 'debtCallDuration' | 'debtSmsCnt' | 'lawyerCallCnt' | 'lawyerCallDuration' | 'lawyerSmsCnt'
    | 'courtCallCnt' | 'courtCallDuration' | 'courtSmsCnt';

export type SmsSummaryParameter = 'contactCnt' | 'frequentContactCnt' | 'frequentContactLocation'
    | 'idCardLocationMatchStatus' | 'homeSmsCnt' | 'midNightSmsCnt' | 'midNightContactCnt'
    | 'hourFrequentSmsCnt' | 'hourFrequentContactCnt' | 'hourFrequentSmsDate'| 'timeDimensionType';

export type CallContactParameter = 'callNumber' | 'callLocation' | 'callCnt' | 'callDuration'
    | 'validCallCnt' | 'validCallDuration' | 'callerCnt' | 'callerDuration' | 'calledCnt' | 'calledDuration'
    | 'mark' | 'type' | 'timeDimensionType'

export type SmsContactParameter = 'smsNumber' | 'smsLocation' | 'smsCnt' | 'mark' | 'type'

export type CallDetailReportParameter = 'callLocations' | 'callNumbers' | 'callSilenceSheets'

export type CallLocationParameter = 'location' | 'callCnt' | 'callNumberCnt' | 'callDuration' | 'callerCnt'
    | 'callerDuration' | 'calledCnt' | 'calledDuration'

export type CallNumberParameter = 'number' | 'intimacy' | 'location' | 'callCnt' | 'callDuration' | 'validCallCnt'
    | 'validCallDuration' | 'callerCnt' | 'callerDuration' | 'validCallerCnt' | 'validCallerDuration'
    | 'calledCnt' | 'calledDuration' | 'validCalledCnt' | 'validCalledDuration' | 'mark' | 'type'

export type CallSilenceSheetParameter = 'silenceMonth' | 'silenceDayCnt' | 'silenceMinute' | 'silenceCnt'
    | 'silenceAvgMinute' | 'silenceDeatil'

export type SmsLocationsParameter = 'location' | 'smsCnt' | 'smsNumberCnt'

export type SmsNumbersParameter = 'number' | 'location' | 'totalCnt' | 'mark' | 'type'

export type WeChatBasicInfoParameter = 'uin' | 'nickName' | 'remarkName' | 'sex' | 'signature'
    | 'headImgPath' | 'verifyFlag'

export type SubscribeMsgListParameter = 'nickName' | 'publishTime' | 'title' | 'digest' | 'cover'
    | 'url'

export type ContactListParameter = 'uuId' | 'nickName' | 'headImgPath' | 'remarkName' | 'sex'
    | 'signature' | 'verifyFlag' | 'starFriend' | 'attrStatus' | 'province' | 'city' | 'alias'
    | 'displayName' | 'isGroup' | 'isOwner' | 'memberCount' | 'isCollection' | 'recentContactTimes'
    | 'statues' | 'snsFlag' | 'intimacy' | 'isBlack' | 'isTopContact' | 'isMuted' | 'isContact' | 'hasContacted'
    | 'snsNotLookOther' | 'snsOtherNotLook' | 'memberList'

export type MemberListParameter = 'uuId' | 'nickName' | 'displayName' | 'memberStatus' | 'attrStatus'

export type AccoutParameter = 'idType' | 'idNo' | 'surName' | 'name' | 'mobileNo' | 'active' | 'isOverdue'
    | 'isFirstLoan' | 'cardNo' | 'totalAmount' | 'availableAmount' | 'currPmtDueDate' | 'currBal' | 'loanStatus'
    | 'custType' | 'unpaidLoans' | 'isActivated' | 'firstPurchaseDate' | 'overdueUnpay' | 'overdueTerms' | 'overdueDays'
    | 'overdueOffsetDays' | 'defaultBindSerial' | 'rateList'

export type LoanRateListParameter = 'loanTerm' | 'interestRate' | 'penaltyRate'

export type BankCardListParameter = 'bankType' | 'bindSerial' | 'bankName' | 'cardTail' | 'bankaccType'

export type LoanRecordListParameter = 'loanReceiptNo' | 'loanInitTerm' | 'loanInitPrin' | 'registerDate'
    | 'remainUnpayPrin' | 'overDueFlag' | 'payOffFlag' | 'loanBank' | 'debitCardNo' | 'interestRate'
    | 'requestTime' | 'expireDate' | 'firstBillDate' | 'name' | 'phone' | 'currentTerm' | 'currentAmount'
    | 'scheduleList'

export type LoanRecordDetailListParameter = 'interest' | 'isDue' | 'isPaid' | 'payDate' | 'payOffFlag'
    | 'preInterest' | 'principal'

export type RepayRecordListParameter = 'repayTime' | 'repayAmount' | 'payBank' | 'debitCardNo' | 'pmtInd'

export type AlipayBasicInfoParameter = 'alipayUserId' | 'alipayAccountType' | 'alipayAccount' | 'taobaoAccount'
    | 'name' | 'email' | 'mobile' | 'alipayBalance' | 'yuebaoBalance' | 'alipayRegistrationDatetime'
    | 'isVerified' | 'alipayUserId' | 'alipayUserId' | 'alipayUserId' | 'alipayUserId' | 'alipayUserId'
    | 'alipayUserId' | 'huabeiAmount' | 'huabeiBalance' | 'huabeiPenaltyAmount' | 'huabeiStatus' | 'huabeiOverdueDays'
    | 'huabeiPayDay' | 'huabeiOverdueBillCnt' | 'huabeiCurrentMonthPayment' | 'huabeiNextMonthPayment' | 'creditLevelAsBuyer' | 'creditLevelAsSeller' | 'identityCard'
    | 'jiebeiAmount' | 'jiebeiBalance' | 'huabeiOriginalAmount' | 'status' | 'taoScore' | 'balancePaymentEnable'
    | 'yuebaoIncome' | 'tmallScore' | 'antMemberScore' | 'postCode' | 'detailAddress' | 'earliestTaobaoOrderDate'
    | 'weiboAccount' | 'weiboNickName' | 'rateSummaryAsBuyer' | 'sixMonthGoodRateAsBuyer' | 'totalGoodRateAsBuyer'
    | 'sixMonthNeutralRateAsBuyer' | 'totalNeutralRateAsBuyer' | 'sixMonthBadRateAsBuyer' | 'totalBadRateAsBuyer' | 'rateSummaryAsSeller'
    | 'sixMonthGoodRateAsSeller' | 'totalGoodRateAsSeller' | 'sixMonthNeutralRateAsSeller' | 'totalNeutralRateAsSeller' | 'sixMonthBadRateAsSeller'
    | 'totalBadRateAsSeller' | 'taobaoUserId' | 'taobaoImgUrl'

export type EcommerceTradesParameter = 'title' | 'amount' | 'tradeNo' | 'tradeTime' | 'tradeStatusName'
    | 'txTypeId' | 'txTypeName' | 'behaviorLableName' | 'tradeDetailUrl' | 'otherSide' | 'otherSideAccount'
    | 'otherSideName' | 'payType' | 'payAccount' | 'isDelete'

export type EcommerceConsigneeAddressesParameter = 'receiveName' | 'postCode' | 'address' | 'region' | 'uuid'
    | 'telNumber' | 'tradeTime' | 'tradeNo' | 'defaultStatus'

export type EcommerceBindedBankCardsParameter = 'bankName' | 'cardNo' | 'cardType' | 'cardOwnerName' | 'isExpress'
    | 'bankSign' | 'applyTime' | 'cardFullNumber' | 'signid' | 'mobile' | 'bankShortName'

export type EcommercePaymentAccountsParameter = 'category' | 'city' | 'organization' | 'accountName' | 'accountCode'

export type SoldOrdersParameter = 'tradeNumber' | 'orderNumber' | 'tradeStatusName' | 'tradeTypeName' | 'createTime'
    | 'endTime' | 'totalQuantity' | 'postFees' | 'actualFee' | 'address' | 'post' | 'phone' | 'receiveName'

export type TaobaoOrdersParameter = 'tradeNumber' | 'orderNumber' | 'tradeStatusName' | 'tradeTypeName' | 'createTime'
    | 'endTime' | 'payTime' | 'totalQuantity' | 'postFees' | 'actualFee' | 'virtualSign' | 'mobileTradeStatus'

export type SellerParameter = 'shopId' | 'shopName' | 'nick' | 'url' | 'pic'

export type LogisticsParameter = 'companyCode' | 'companyName' | 'mailNo' | 'createTime' | 'lastTime'
    | 'lastMsg' | 'postManName' | 'postManPhone' | 'postManSiteName'

export type SubOrdersParameter = 'itemTitle' | 'itemId' | 'quantity' | 'original' | 'actual'
    | 'itemPic' | 'itemUrl'

export type HuabeiConsumeListParameter = 'image' | 'amount' | 'type' | 'time' | 'title'
    | 'tradeNo' | 'bizType' | 'status' | 'billMonth'

export type JiebeiInfoParameter = 'jiebeiAmount' | 'jiebeiBalance' | 'jiebeiRiskRate' | 'jiebeiOvdAble' | 'jiebeiNewAble'
    | 'jiebeiIsClosed' | 'jiebeiUnClearLoanCount' | 'jiebeiStatus'

export type HuabeiInfoParameter = 'huabeiAmount' | 'huabeiBalance' | 'huabeiOriginalAmount' | 'huabeiStatus' | 'huabeiPenaltyAmount'
    | 'huabeiOverdueDays' | 'huabeiPayDay' | 'huabeiOverdueBillCnt' | 'huabeiCurrentMonthPayment' | 'huabeiNextMonthPayment'
    | 'huabeiOnTrial' | 'huabeiHasAnyOverdue'

export type TransferBankCardsParameter = 'bankName' | 'cardNumber' | 'cardOwnerName' | 'cardFullNumber' | 'bankShortName'

export type HuabeiBillsParameter = 'billMonth' | 'isBilled' | 'totalAmount' | 'unRepayAmount' | 'repayDate' | 'isClear'
    | 'isOverDue' | 'totalPenalty' | 'miniAmount' | 'hasHistoryOvdBill' | 'refundAmount'

export type MyBankBindInfoParameter = 'weBankUserId' | 'weBankRepayAccount' | 'weBankRepayAccountType' | 'weBankTotalAmount'
    | 'weBankOverdueAmount'

export type MyBankLoanDetailsParameter = 'applyDate' | 'channel' | 'lendDetailUrl' | 'loanAmt'
    | 'loanArNo' | 'loanDate' | 'loanPdName' | 'loanTerm' | 'ownerPhoneNo' | 'repayAccount' | 'repayAccountType'
    | 'repayModeDesc' | 'statusDesc'

export type MyBankRepayPlanListParameter = 'feeAmount' | 'prinAmount' | 'totalAmount' | 'repayAccountNo'
    | 'repayAccountType' | 'repayDate'

export type MyBankAssetDetailsParameter = 'tradeAmt' | 'tradeType' | 'transDate' | 'assetDetailUrl'
    | 'bizNo' | 'assetAccount' | 'assetAccountType'

export type AlipayBillDetailListParameter = 'billMonth' | 'expendAmount' | 'expendCount' | 'incomeAmount'
    | 'incomeCount' | 'payableAmount' | 'payableCount' | 'receivableAmount' | 'receivableCount'

export type ReportBasicInfoParameter = 'RealName' | 'Birthday' | 'IDCardNo' | 'Mobile' | 'Sex' | 'HouseholdAddress'
    | 'HouseAddress' | 'Marriage' | 'CompanyName' | 'CompanyAddress' | 'Department' | 'Salary' | 'BankName' | 'BankCardNo'
    | 'Email'
export type ReportBankCardInfoParameter = 'BankCardNo' | 'BankName' | 'Mobile'

export type ReportBorrowInfoParameter = 'Money' | 'Period'

export type ReportRelationInfoParameter = 'contactName' | 'contactMobile' | 'contactAddress' | 'contactRelation'

export type  CommonType <k extends string> = {
    [index in k] ?: string | number | any;
}