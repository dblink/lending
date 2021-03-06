import * as React from 'react';
import { Sign } from './sign';
import './css/loanAgreement.css';
import { lowerToUpper } from './lowerToUpper';
import { sessionData } from '../../components/sessionData/sessionData';

interface Props {
    data ?: {
        "RealName": string,
        "IDCardNo": string,
        "Mobile": string,
        "Email": string,
        "BankName": string,
        "BankCardNo": string,
        "Amount": string,
        "StartTime": string,
        "Rate": string,
        "Purpose": string,
        "RepayDate": string,
        "RepayWay": string,
        OutTradeNo: string;
        lender: string;
        address: string
    };
    success ?: (data: any)=>void
}

interface State {}

export class LoanAgreement extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    data = {
        '2': {
            name: '海南易联普惠互联网小额贷款有限公司',
            addr: '海南省海口市龙华区滨海大道117号滨海国际金融中心A栋22层整层' 
        },
        '3': {
            name: '农信互联网小额贷款股份有限公司',
            addr: '海南省海口市美兰区国兴大道5号海南大厦农信楼812室'
        }
    }
    render() {
        let data = this.props.data;
        let a = sessionData.getData('UserInfo').ProductType.toString();
        let company = this.data[a as '2'];
        return (<div className="topTitle">
        <h1 className="loan">借款协议</h1>
        <div className="floatR">协议编号：<span id=''>{data.OutTradeNo}</span></div>
        <p className="marginTop80">贷款人：<span>{company.name}</span></p>
        <p>地址：<span>{company.addr}</span></p>
        <p className="marginTop40">借款人：{data.RealName}</p>
        <p>身份证号：{data.IDCardNo}</p>
        <p>联系电话：{data.Mobile}</p>
        <p>电子邮箱：{data.Email}</p>
        <p className="fontWeight600 marginTop40">特别提醒：</p>
        <p className="textIndent xiahua">
            在借款人确认同意本协议之前，借款人应已清楚知悉并充分理解本产品的所有信息，同意向{company.name}（以下简称“贷款人”）申请贷款（以下简称“本贷款”或“贷款”）。一旦借款人在贷款人贷款网站或其他贷款人合作方的平台（以下简称“贷款网络平台”）点击接受本协议，即意味着借款人已阅读本协议所有条款，并对本协议条款的含义及相应的法律后果已全部通晓并充分理解，同意接受本协议约束。
        </p>
        <p className="textIndent xiahua">
            为充分维护借款人的合法权益，贷款人特提醒借款人特别关注本协议条款中的黑体及/或加下划线部分（包括但不限于第三条、第六条、第九条至第十五条），请借款人务必仔细阅读。
        </p>
        <h3 className="margin20">第一条  定义</h3>
        <p className="textIndent">
            （一）借款人：指通过贷款网络平台向小贷公司提出贷款申请的，具有完全民事权利能力和完全民事行为能力的自然人或按照中国法律合法设立并有效存续的企业法人或其他机构。
        </p>
        <p className="textIndent">
            （二）贷款网络平台：指借款人向贷款人提出贷款审批、查看额度、申请借款等操作的平台，包括贷款人贷款网站或其他贷款人合作方的平台。
        </p>
        <p className="textIndent">
            （三）借款额度：是指小贷公司向借款人实际发放的贷款金额。
        </p>
        <p className="textIndent">
            （四）借款期限：是指自贷款发放之日起至借款最终到期日止的期间。
        </p>
        <p className="textIndent">
            （五）收款账户：指借款人申请、使用本贷款服务，提供给贷款人发放借款本金的银行账户。借款人因购买商品，故指定收款账户信息如下：
        </p>
        <p className="textIndent">户名：
            <span>
                {data.RealName}
            </span>
        </p>
        <p className="textIndent">开户行：
            <span>{data.BankName}</span>
        </p>
        <p className="textIndent">账号：
            <span>{data.BankCardNo}</span>
        </p>
        <p className="textIndent">
            （六）还款账户：指借款人根据本协议约定向贷款人指定账户支付借款本金、利息及相关费用的银行账户（如借款人在借款期限内更换银行卡，还款账户以变更后的银行账户为准）或借款人于汇付天下有限公司开设的账户。
            借款人还款银行账户信息如下：
        </p>
        <p className="textIndent">户名：
            <span>
                {data.RealName}
            </span>
        </p>
        <p className="textIndent">开户行：
            <span>{data.BankName}</span>
        </p>
        <p className="textIndent">账号：
            <span>{data.BankCardNo}</span>
        </p>
        <p className="textIndent">
            （七）代扣还款：指为偿还本协议项下应付款项的目的，借款人无条件不可撤销地同意并授权贷款人代借款人持续向还款账户开户行、有权的第三方支付机构组织发送代扣指令，直接将借款人还款账户的款项于还款日划至贷款人账户，用于偿还借款人在贷款人处全部债务直至清偿完毕，且贷款人有权将同一还款日的多笔贷款应还款额合为一笔或分成特定金额，分笔、分批发出交易委托指令。借款人承诺前述交易委托指令视同借款人本人做出。代扣时间、金额等指令以贷款人通知为准。
        </p>
        <h3 className="margin20">第二条 借款基本信息</h3>
        <table cellSpacing="0" cellPadding="0" className="tableSty">
            <tr className="height30">
                <td>借款人姓名/名称</td>
                <td>{data.RealName}</td>
            </tr>
            <tr className="height30">
                <td>用户名</td>
                <td>{data.RealName}</td>
            </tr>
            <tr className="height30">
                <td>身份证号/统一社会信用代码</td>
                <td>{data.IDCardNo}</td>
            </tr>
            <tr className="height30">
                <td>借款本金</td>
                <td>人民币【 {data.Amount} 】元（大写：<span id='bigAmount'>{data.Amount && lowerToUpper(parseInt(data.Amount)).big}</span>）</td>
            </tr>
            <tr className="height30">
                <td>借款期限</td>
                <td>{data.StartTime}日 ，自贷款发放之日起计算</td>
            </tr>
            <tr className="height30">
                <td>借款年利率%</td>
                <td>{data.Rate}</td>
            </tr>
            <tr className="height30">
                <td>借款用途</td>
                <td>{data.Purpose}</td>
            </tr>
            <tr className="height30">
                <td>还款日</td>
                <td>{data.RepayDate}</td>
            </tr>
            <tr className="height30">
                <td>还款方式</td>
                <td>{data.RepayWay}</td>
            </tr>
        </table>
        <p>注： </p>
        <p className="textIndent">
            1、贷款期限是指自贷款发放之日起至最终到期日止的期间。
        </p>
        <p className="textIndent">
            2、放款日是指贷款金额由第三方支付机构或存管银行从小贷公司的托管账户中成功划出的日期，此日期以第三方支付机构或存管银行的划款凭证记载为准。 
        </p>
        <p className="textIndent">
            3、如还款日为法定节假日的，自动提前至节假日前最后一个工作日。
        </p>
        <p className="textIndent">
            4、本合同适用固定利率，遇利率调整不分段计息。年利率= 月利率×12；日利率=年利率/360=月利率/30。
        </p>
        <h3 className="margin20">第三条 借款人确认 </h3>
        <p className="textIndent xiahua">
            借款人在签约前须确认并保证借款人同时满足以下条件，并承诺在本协议有效期内始终有效：
        </p>
        <p className="textIndent">
            （一）借款人具有签订和履行本协议的资格和能力，借款人可以独立地作为一方诉讼主体。
        </p>
        <p className="textIndent">
            （二）借款人签订和履行本协议不违反借款人作为签约一方的任何协议以及相关法律法规的规定，与借款人应承担的其他合同项下的义务均无抵触。
        </p>
        <p className="textIndent">
            （三）借款人的交易行为、借款用途真实、合法、有效，不存在任何虚假。
        </p>
        <p className="textIndent">
            （四）使用以借款人本人名义注册的经过贷款网络平台实名认证并设置了密码的个人账户在贷款网络平台所从事的所有行为均视为借款人本人行为，包括但不限于订立本协议、申请支用贷款和归还贷款等，该等行为的法律后果均由借款人本人承担。
        </p>
        <p className="textIndent">
            （五）借款人具有与借款本金相匹配的还款能力并保证按照合同约定偿还借款本金、利息及相关费用。
        </p>
        <p className="textIndent">
            （六）借款人提供给贷款人的所有文件和资料都是真实、准确、完整和有效的，不存在虚假记载、重大遗漏或误导性陈述。
        </p>
        <p className="textIndent">
            （七）借款人理解并同意，由于借款额度为贷款人对借款人初步预测及评估的额度，贷款人可根据借款人的风险评估状况及运营政策随时调整借款额度或停止授信。
        </p>
        <p className="textIndent">
            （八）借款人同意并认可，若小贷公司将本协议下债权进行转让的，由受让方代向借款人书面通知（包括但不限于电子邮件、平台站内信、手机短信、快递和传真等方式）债权转让事宜，该等通知构成合法、有效的债权转让通知；且一经作出，相关债权转让即对借款人发生法律效力。
        </p>
        <p className="textIndent">
            （九）借款人确认，贷款人已提请借款人特别注意本协议中有关借款人权利义务的全部条款，并应借款人的要求对该等条款做了相应说明。
        </p>
        <p className="textIndent">
            （十）借款人确认本协议下的各项授权在本人使用贷款网络平台相关贷款产品/服务期间持续有效。
        </p>
        <h3 className="margin20">第四条 合同构成</h3>
        <p className="textIndent">
            本协议由本协议及附件条款、借款人在贷款网络平台信息系统填写的所有信息、贷款网站平台各项规则和贷款网络平台其他与本贷款相关的页面信息组成，各组成部分均具有法律效力，与本协议条款有冲突的以本协议条款为准。
        </p>
        <h3 className="margin20">第五条 合同形式</h3>
        <p className="textIndent">
            （一）借款人与贷款人一致同意本协议采用电子文本形式制成，并保存在贷款网络平台为此设立的专用服务器上备查，各方均认可该形式的协议的效力，本协议电子版与纸质版具有同等法律效力。本协议各方确认并同意由贷款网络平台提供的与本协议有关的书面文件或电子信息在无明显错误的情况下应作为本协议有关事项的终局证明。
        </p>
        <p className="textIndent">
            （二）借款人委托贷款网络平台保管所有与本协议有关的书面文件或电子信息。
        </p>
        <h3 className="margin20">第六条 合同的生效</h3>
        <p className="textIndent xiahua">
            借款人在贷款网络平台确认本协议后并不导致本协议立即生效，仅在经过贷款人审核通过并将借款本金划入本协议约定的借款人指定收款账户时，本协议始生效。
        </p>
        <h3 className="margin20">第七条 权利和义务</h3>
        <p className="textIndent">
            一、借款人的主要权利和义务
        </p>
        <p className="textIndent">
            1、借款人有权要求贷款人对借款人提供的财务资料以及生产经营方面的商业秘密予以保密，但法律法规另有规定或本协议另有约定的除外。
        </p>
        <p className="textIndent">
            2、借款人为签署本协议所需的全部内部授权手续均已办理完毕并充分有效。借款人签署本协议、履行其在本协议项下的义务，均不会与其现行章程和内部规章或对借款人有约束力的任何合同、协议及其他文件相抵触。
        </p>
        <p className="textIndent">
            3、借款人保证借款人在贷款网络平台中提供的任何信息均真实、合法、有效。
        </p>
        <p className="textIndent">
            4、借款人应妥善保管其账户名、密码、与账户绑定的手机号码、手机验证码等与账户有关的一切信息。借款人应确保不向其他任何人泄露其账户的密码。<span className="xiahua">对于因密码泄露所致的损失，由借款人自行承担。</span>如借款人发现有他人冒用或盗用借款人的账户及密码或任何其他未经合法授权之情形时，应立即以有效方式通知贷款人，要求其暂停相关行为。同时，借款人理解贷款人对借款人的请求采取行动需要合理期限，在此之前，贷款人对已执行的指令及（或）所导致的借款人的损失不承担任何责任。
        </p>
        <p className="textIndent">
            5、借款人同意在借款人未清偿所有应还款项前，若申请变更、注销借款人的任何一个账户的，均应事先征得贷款人的同意。
        </p>
        <p className="textIndent">
            6、借款人应保证还款账户余额充足且可被代扣还款。
        </p>
        <p className="textIndent">
            7、借款人应按本协议约定的用途使用借款本金，不得用于首付贷、校园贷等用途，未经贷款人书面同意借款人不得将借款本金挪作他用。
        </p>
        <p className="textIndent">
            8、借款人同意贷款人对本协议项下借款本金使用情况和有关借款人财务活动情况进行监督和检查，按照贷款人的要求及时提供真实、准确、完整的资料，并为贷款人的前述监督和检查提供工作方便。
        </p>
        <p className="textIndent">
            9、借款人不得将借款本金用于基金、股票、理财产品、有价证券、期货买卖及股本权益性投资。
        </p>
        <p className="textIndent">
            10、借款人不得利用本协议或本协议项下的借款本金规避相关法律法规或规章的要求（包括但不限于税务方面政策法规的要求），否则与此相关的任何法律责任应由借款人自行承担，与贷款人无涉。
        </p>
        <p className="textIndent">
            11、本协议签订之日起至借款全部清偿之日止，借款人的下列信息如发生变更的，应当在相关信息发生变更三日内将更新后的信息提供给贷款人：姓名、家庭联系人及紧急联系人、工作单位、居住地址、住所电话、手机号码、电子邮箱、银行账户。若因不及时提供上述变更信息而带来的损失或额外费用应由借款人承担。
        </p>
        <p className="textIndent">
            12、借款人进行对外投资、实质性增加债务融资，以及进行合并、分立、股权转让等重大事项前征得贷款人同意。
        </p>
        <p className="textIndent">
            13、如发生对借款人正常财务情况构成威胁或对借款人履行本协议项下的义务产生不利影响的任何其他事件，包括但不限于涉及或可能涉及经济纠纷、财务状况恶化等，均应在该等情形发生之日起五日内书面通知贷款人。
        </p>
        <p className="textIndent">
            14、借款人声明在订立本协议时借款人不存在任何违反有关知识产权保护、环境保护、节能减排以及劳动者薪金保护的法律、法规与规章的行为或情形，并且承诺本协议订立后亦严格遵守有关知识产权保护、环境保护、节能减排以及劳动者薪金保护的法律、法规与规章；若借款人上述声明虚假或者上述承诺未被履行，或者借款人可能发生违法违规风险，贷款人有权停止向借款人发放贷款、宣布贷款本息提前到期，或者采取本协议约定或法律允许的其他救济措施。
        </p>
        <p className="textIndent">二、贷款人的主要权利和义务</p>
        <p className="textIndent">
           1、贷款人应按照本协议的约定履行权利义务。
        </p>
        <p className="textIndent">
           2、贷款人有权直接或委托第三方对借款本金的使用情况和有关借款人的个人状况、家庭情况、财务活动等情况进行监督和检查。
        </p>
        <p className="textIndent">
           3、未征得贷款人同意，本贷款不得展期。
        </p>
        <p className="textIndent">
           4、贷款人有权将本协议下债权进行转让，并由受让方代向借款人书面通知（包括但不限于电子邮件、平台站内信、手机短信、快递和传真等方式）债权转让事宜，该等通知构成合法、有效的债权转让通知；且一经作出，相关债权转让即对借款人发生法律效力。
        </p>
        <p className="textIndent xiahua">
           5、如贷款人发现1{')'}借款人在贷款网络平台中的行为数据或其他信息发生异常变化；或2{')'}借款人在贷款人关联公司网站上注册的账户出现异常现象；或3{')'}借款人发生本协议约定的违约情形；或4{')'}借款人不履行或违反与贷款人或其关联公司的其他任何合同（如有）项下借款人应承担的任何义务，已经或可能影响借款人履行本协议项下义务，贷款人有权基于合理怀疑停止向借款人发放贷款或宣布贷款提前到期或通知第三方支付机构对借款人的账户进行权限限制或扣划相应款项用于偿还本协议项下欠款或采取本协议约定或法律允许的其他救济措施。
        </p>
        <p className="textIndent">
           6、贷款人应根据法律法规及监管规定要求提供贷款服务，不得以任何形式集资和吸收或变相吸收公众存款；不得发放违反法律有关利率规定的贷款；不得通过网络平台融入资金；不得通过暴力、恐吓方式催收贷款；不得隐瞒借款人应知晓的贷款人有关信息和擅自使用借款人信息、非法买卖或泄露借款人信息等监管明令禁止的行为。
        </p>
        <h3 className="margin20">第八条 提前还款和逾期还款</h3>
        <p className="fontWeight600">（一）提前还款</p>
        <p className="textIndent">
           1、借款人可以申请提前还款。
        </p>
        <p className="textIndent">
           2、提前还款时应结清应还本金及利息。
        </p>
        <p className="textIndent">
           3、甲方经乙方同意后提前归还部分本金且缩短剩余还款期限的，剩余的贷款本金的利率浮动水平和调整仍以原贷款期限对应的中国人民银行相应期限档次贷款的利率为基准，利率浮动水平和调整仍按本合同第二条约定执行。
        </p>
        <p className="textIndent">
           4.借款人提前还款的，应还款项=借款剩余本金+【借款本金×（借款年利率/360天）×实际借款天数】
        </p>
        <p className="fontWeight600">（二）逾期还款</p>
        <p>1、如发生下列情形之一时，则视为借款人逾期还款。</p>
        <p className="textIndent">
           （1）于还款日24点前，未缴或未缴足当期应还金额。
        </p>
        <p className="textIndent">
           （2）贷款人依约宣布贷款提前到期后在提前还款通知规定的期限内，未缴或未缴足当期应还金额。
        </p>
        <p>2、如借款人未按本协议或还款计划按时足额还款，借款人应自逾期发生日起至清偿日止以逾期本金为准按照年利率24%每日向贷款人支付逾期利息，计算公式：逾期利息=逾期本金X24%/360日X逾期实际天数。</p>
        <p>3、当借款人的还款不足时，其还款的清偿顺序为：</p>
        <p className="textIndent">
           （1）支付依法或依照本合同约定的实现债权而支付的催收费用、诉讼费（或仲裁费）、保全费、公告费、执行费、律师费、差旅费及其他费用；
        </p>
        <p className="textIndent">（2）支付应付违约金；</p>    
        <p className="textIndent">（3）支付应付逾期利息；</p>    
        <p className="textIndent">（4）支付应付利息；</p>    
        <p className="textIndent">（5）支付应付本金。</p>    
        <p>甲方所偿还款项不足以清偿同一顺序全部债务的，按有关债务发生的先后顺序清偿。</p>
        <h3 className="margin20">第九条 违约责任</h3>
        <p>
            （一）本协议各方均应严格履行本协议约定的义务。任何一方违约，违约方应向守约方支付相当于本协议借款金额5%的违约金并赔偿给守约方造成的损失，包括但不限于第三方催收服务费、调查费、诉讼费、律师费、保全费、保全担保费、差旅费、公证费、鉴定费及执行费等。
        </p>
        <p className="fontWeight600">
            （二） 如借款人发生下列情况之一，则视借款人严重违约：
        </p>
        <p className="textIndentFW">
            1、提供的资料中含有虚假成分，或故意隐瞒重要事实；
        </p>
        <p className="textIndentFW">
            2、擅自改变借款用途；
        </p>
        <p className="textIndentFW">
            3、借款人未按本协议规定按时足额偿还贷款本息或其他应付款项。
        </p>
        <p className="textIndentFW">
            4、借款人提供的借款资料中影响到贷款人权益的部分（包括但不限于姓名、借款人住所/联系地址、单位地址、电话、联系方式等）在借款期间发生变更后未依本协议约定期限内书面通知贷款人的；
        </p>
        <p className="textIndentFW">
            5、借款人或借款人控股、参股（或实际控制）的企业发生重大违纪、违法或被索赔事件以及卷入或即将卷入重大纠纷引起诉讼、仲裁等事件；
        </p>
        <p className="textIndentFW">
            6、借款人或借款人控股、参股（或实际控制）的企业或担保人经营出现严重困难和财务状况发生恶化；
        </p>
        <p className="textIndentFW">
            7、借款人在还款期限内死亡、被宣告失踪、处于限制民事行为能力或丧失民事行为能力状态、被刑事监禁、或发生重大疾病、重大事故等可能危及本协议项下贷款安全的情况。
        </p>
        <p className="textIndentFW">
            8、借款人出现恶意逾期等恶意行为（包括但不限于借款人转移资产以逃避债务，借款人出现不接听电话并/或拒收书面催款通知，或在催收过程中拒绝承认欠款，逃避、拒绝还款、拒绝承认贷款事实等）；
        </p>
        <p className="textIndentFW">
            9、发生可能影响借款人财务状况和偿债能力（包括但不限于工作调整、收入降低、失业、重大疾病、拖欠其他债务、承担重大负债等），或可能致使贷款人在本协议项下的权利遭受损失的情况。
        </p>
        <p className="textIndentFW">
           10、借款人违反本协议约定的其他义务。
        </p>
        <p className="fontWeight600">
           （三）在发生本条第二款约定的任何一种情形时，贷款人有权采取下列一项或多项措施，包括担不限于：
        </p>
        <p className="textIndentFW">
           1、要求借款人纠正违约行为。
        </p>
        <p className="textIndentFW">
           2、停止依据本协议或借款人与贷款人之间的其他合同向借款人发放任何借款本金。
        </p>
        <p className="textIndentFW">
           3、自主决定本协议和借款人与贷款人之间其他合同项下借款人未偿还的借款全部或部分提前到期，并要求借款人立即偿还管理费、借款剩余本金、利息、违约金、逾期罚息、损失赔偿及根据本协议产生的其他全部费用。
        </p>
        <p className="textIndentFW">
           4、处分抵押/质押财产或要求保证人代偿（如有），实现贷款人债权。
        </p>
        <p className="textIndentFW">
           5、借款人在第三方支付机构的账户或借款人在贷款网络平台注册账户里有任何余款，贷款人有权按照本条第四款约定的清偿顺序将借款人的余款用于偿还借款人的债务，并要求借款人支付因此产生的相关费用。
        </p>
        <p className="textIndentFW">
           6、以合法手段追偿借款人欠款（包括但不限于委托催收公司、律师事务所等其他第三方机构代为追讨，申请相关部门进行调查、提起仲裁或诉讼等），由此引起的一切费用（包括但不限于第三方催收服务费、调查费、诉讼费、律师费、保全费、担保费、差旅费、公证费、鉴定费及执行费等）由借款人承担。
        </p>
        <p className="textIndentFW">
           7、如果借款人逾期支付任何一期还款，贷款人有权将借款人的“逾期记录”记入贷款人或其指定第三方机构的“信用信息库”，并有权将借款人违约失信的相关信息及借款人其他信息向征信系统、媒体、用人单位、公安机关、检查机关及其他有权机关披露，由此造成的后果由借款人自行承担，贷款人对此不承担任何责任。
        </p>
        <p className="textIndentFW">
           8、贷款人根据法律法规或本协议约定有权采取的其他违约救济措施。
        </p>
        <h3 className="margin20">第十条 特别约定</h3>
        <p className="fontWeight600">
           （一）本贷款网络平台信息系统因下列状况无法正常运作，使借款人无法使用各项服务或使贷款人无法履行本协议时，贷款人不承担损害赔偿责任，该状况包括但不限于：
        </p>
        <p className="textIndentFW">
           1、在贷款网络平台或与本协议项下贷款相关的其他平台公告之系统维护期间。
        </p>
        <p className="textIndentFW">
           2、因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障、电信设备故障、银行原因、第三方服务瑕疵或政府行为等原因。
        </p>
        <p className="textIndentFW">
           3、因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成贷款人系统障碍不能执行业务的。
        </p>
        <p className="textIndentFW">
           4、由于黑客攻击、电信部门和其他有信息技术依赖的相关部门、企事业单位技术调整或故障、网站升级等原因而造成的服务中断或者延迟。
        </p>
        <p className="textIndentFW">
           5、借款人操作不当或通过非贷款人及相关方授权或认可的方式使用贷款网络平台、支付平台服务的。
        </p>
        <p className="fontWeight600">
           （二）本协议有效期内，因国家相关主管部门颁布、变更的法律、法规、规章、规定、指引、通知、政策和其他规范性文件等导致贷款人或相关方不能提供约定服务的，不视为其违约，各方可根据相关规定变更协议内容或提前终止本协议。
        </p>
        <p className="fontWeight600">
           （三）借款人理解本协议所涉服务有赖于贷款网络平台、支付平台系统的准确运作及操作。若出现贷款网络平台系统差错、故障或其他原因引发了展示错误、借款人同意贷款人或相关方可自行或通过第三方采取更正差错、扣划款项、暂停服务等适当纠正措施。
        </p>
        <h3 className="margin20">第十一条 信息收集、使用、共享</h3>
        <p className="fontWeight600">
           （一）查询、收集借款人信息
        </p>
        <p className="tft">
           借款人理解，如果不收集借款人的一些必要信息，贷款人或其受托人将无法客观判断借款人的履约能力和意愿，也无法履行法律或监管要求贷款人或其受托人必须履行的一些法定义务（如反洗钱等）。为了依法合规地向借款人提供更好的服务，借款人理解和同意贷款人和/或其受托人可能需要按以下方式获取借款人的信息：
        </p>
        <p className="tft">
           1、借款人在申请或使用借款时向贷款人或其合作的第三方机构提供的信息，包括但不限于姓名/名称、身份证号、联系电话、联系地址等。
        </p>
        <p className="tft">
           2、向依法设立的征信机构、资信评估机构或有关法律、监管机构许可的类似机构（以下统称“信用服务机构”），向中国人民银行金融信用信息基础数据库（以下简称“金融信用信息基础数据库”）等查询、收集借款人信息（包括但不限于信用信息、信用报告等）。
        </p>
        <p className="tft">
           3、向部分政府机构、司法机关及公共事业单位（如人力资源和社会保障部门、公积金管理中心、中国互联网金融协会等机构）采集与借款相关的必要信息，包括但不限于借款人的工商注册信息、诉讼信息、社保信息等。
        </p>
        <p className="tft">
           4、查询、收集借款人留存在资料/信息传递方、咨询服务提供方、还款保障服务提供方（包括但不限于担保公司、保证人等）、以及其他为借款人申请借款提供服务的相关方等处，与借款人或本协议项下借款相关的所有信息。
        </p>
        <p className="tft">
           5、向其他合法留存借款人信息的自然人、法人及其他组织收集与贷款相关的必要信息。
        </p>
        <p className="fontWeight600">
           （二）信息使用
        </p>
        <p className="tft">
           为更好地向借款人提供服务、降低贷款人风险，以及保护各方的合法权效力，借款人同意向贷款人在必要时将借款人的信息用于以下用途：
        </p>
        <p className="tft">
           1、为保护借款人的账户安全，对借款人的身份进行识别、验证等。
        </p>
        <p className="tft">
           2、为向借款人提供适合于借款人的服务，并持续维护、改善这些服务，对借款人的信息进行分析和处理。
        </p>
        <p className="tft">
           3、合理评估借款人履约状况，防控风险。
        </p>
        <p className="tft">
           4、如借款人未能履行本协议项下义务，贷款人和其合作的第三方需通过催收及法律途径解决，因此需将相关信息提供给催收者及司法机关。
        </p>
        <p className="tft">
           5、经借款人许可的其他用途。
        </p>
        <p className="fontWeight600">
           （三）信息分享
        </p>
        <p className="tft">
           贷款人承诺会根据法律法规及监管规定对借款人的信息承担保密义务。借款人同意并授权贷款人和其合作的第三方机构在下列情况下将借款人的信息与第三方共享（本协议另有约定的除外）：
        </p>
        <p className="tft">
           1、某些服务和/或产品和/或推广活动由贷款人的合作伙伴提供或贷款人与合作伙伴共同提供，贷款人会与其共享并使用借款人的必要信息；借款人同意并授权贷款人可在其合作伙伴平台向借款人展示本贷款相关信息并提供相应服务内容。
        </p>
        <p className="tft">
           2、某些情况下，只有共享借款人的信息，才能向借款人提供需要的服务和/或产品，或处理借款人与他人的交易纠纷或争议，维护借款人的合法权益。
        </p>
        <p className="tft">
           3、为建立信用体系，借款人同意并授权贷款人向监管部门或其指定机构、中国人民银行个人信用信息基础数据库、金融信用信息基础数据库、信用服务机构、中国互联网金融协会等行业自律组织或其他合法机构报送与借款人或本协议项下借款相关的所有信息（含借款人不良信息）。
        </p>
        <p className="tft">
           4、将与本协议有关的信息和借款人其他相关信息向监管部门、行业自律组织和监管信息披露。 
        </p>
        <p className="tft">
           5、借款人同意贷款人根据有关法律法规或规章、监管规定和行业自律组织的要求等，将与借款人或本协议项下借款相关的信息在其运营的网络平台上进行披露；并同意贷款人向监管部门、行业自律组织和监管信息系统报送，供监管部门使用和借款人授权查询使用。
        </p>
        <p className="tft">
           6、为便好地处理借款人的个人信息，借款人同意贷款人将借款人的个人信息提供给贷款人委托的数据处理者进行处理。贷款人对委托的数据处理者资质、能力、合法合规性承担保证责任。
        </p>
        <p className="tft">
           7、根据法律法规的规定及有权机关的要求；
        </p>
        <p className="tft">
          （四）以上授权一经作出，不可变更或撤销。
        </p>
        <p className="tft">
          （五）各条款标题仅为方便查阅而设，不作为对条款内容进行解释的依据。
        </p>
        <h3 className="margin20">第十二条 合同的变更、解除和权利义务转让</h3>
        <p>
          （一）合同的变更和解除
        </p>
        <p className="tft">
            1、贷款人有权不定期修改本协议，但相关修改不得加重借款人在借款金额、利率和期限方面的责任。一旦条款产生变动，贷款人将以书面形式通知借款人。
        </p>
        <p className="tft">
            2、除法律法规另有强制性规定外，经修订的合同一经通知，立即自动生效。一旦借款人继续使用本贷款服务即被视为借款人已接受了修改后的合同内容；如借款人不同意相关变更，应自贷款人的前述通知发生之日起5个自然日内停止使用借款并在贷款人要求的期限内归还全部借款本息和管理费等其他费用。
        </p>
        <p className="tft">
            3、本协议生效后，除本协议另有约定外，借款人不得要求单方擅自变更或解除本协议。贷款人有权基于自身经营考虑，随时宣布中继、终止本协议或其他任何部分，并要求借款人在约定期限内偿还本协议项下贷款本息和管理费等其他费用。
        </p>
        <h3 className="margin20">第十三条 通知</h3>
        <p className="tft">
            本协议任何一方根据本协议约定做出的通知和/或文件均应以书面形式做出，书面通知方式包括但不限于邮寄纸质通知、平台公告、电子邮件、站内信、手机短信和传真等方式。若以邮寄方式发出书面通知的，则按照借款人在贷款网络平台留存的通讯地址交邮后的第三个自然日即视为送达。如以平台公告、电子邮件、站内信、手机短信和传真等电子方式发出书面通知的，则在通知发送成功即视为送达。
        </p>
        <h3 className="margin20">第十四条 争议解决及法律文书送达</h3>
        <p className="tft">
            本协议在履行过程中，如发生任何争执或纠纷，各方应友好协商解决;若协商不成，各方均同意提请中国广州仲裁委员会,按照申请仲裁时该会现行有效的网络仲裁规则进行网络仲裁并进行书面审理。仲裁裁决是终局的，对各方均有约束力。
        </p>
        <p className="tft">
            甲、乙双方确认以本合同中预留的联络邮箱，作为各方之间往来及涉仲裁时仲裁机构送达相关材料的送达地址；并以预留的手机号码，为短信通知号码。合同任何一方向对方及仲裁机构向各方发出的任何通知，以电子邮件或者短信等形式发出，送至约定邮箱或者手机号码，即视为送达。如一方需变更联络邮箱或者手机号码的，应当自变更日起三日内通知对方，并得到对方确认。若本合同中没有预留电子邮箱，则仲裁文书及通知的送达以仲裁时仲裁委通过发送短信至本合同中预留的手机号码，文书送达地址以短信中指定的电子邮箱或网页链接等为准。若因合同当事人自行停止使用本合同中的联络方式导致无法接收通知短信的，其后果自行承担。
        </p>
        <h3 className="margin20">第十五条 其他</h3>
        <p className="textIndent">
            （一）如果本协议中的任何一条或多条违反相关法律法规的规定，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。
        </p>
        <p className="textIndent">
            （二）本协议取代借款人与贷款人就有关本协议项下之贷款于先前以口头或书面形式达成的任何协议或共识。
        </p>
        <p className="textCenter">（以下无正文）</p>
        <div className="flex">
            <p>贷款人：<span>{company.name}</span></p>
            <p>借款人：
                <Sign success={(data:any)=>{this.props.success && this.props.success(data)}} />
            </p>
        </div>
        <div className="flex">
            <p>日期：<span id=''> 
                {data.StartTime.split('-')[0]}年{data.StartTime.split('-')[1]}月{data.StartTime.split('-')[2]}日
                </span>
            </p>
            <p>日期：<span id=''>
                {data.StartTime.split('-')[0]}年{data.StartTime.split('-')[1]}月{data.StartTime.split('-')[2]}日
            </span></p>
        </div>
    </div>)
    }
}