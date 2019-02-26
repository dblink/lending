import * as React from 'react';
import { BaseModal } from './base/baseModal';
import {  BankCardInput, ApplyInput } from '../input';
import { PrimaryButton, CancelButton, TabButton, HrefButton } from '../button';
import { ApplyContent } from '../menu/applyContent';
import { req, ReqOption } from '../request';
import { ParameterName, Parameter, ParameterSummary } from '../request/setting';
import { Progress, InnerProgress } from '../progress/progress';
import { ImageFile } from '../showImage';
import { Table } from '../table/commonTable';
import { ApplySelect } from '../select';
import { type } from 'os';

interface Props {}

interface State {
    isOpen: boolean;
}
interface Props {}

interface ModalState {
    step: 'inputCard' | 'applyList' | 'applyListDetail';
    dataState: any;
    card: string;
    type: string;
}

export class ApplyModal extends React.Component<Props, ModalState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            step: 'inputCard',
            dataState: {},
            card: '',
            type: ''
        };
        this.changeStep = this.changeStep.bind(this);
        this.setDataState = this.setDataState.bind(this);
        this.onChangeDataState = this.onChangeDataState.bind(this);
        this.setCard = this.setCard.bind(this);
        this.setType = this.setType.bind(this);
    }
    changeStep(step: 'inputCard' | 'applyList' | 'applyListDetail'){
        this.setState({
            step: step
        })
    }
    //设置数据状态
    setDataState(data: any){
        this.setState({
            dataState: data
        })
    }
    onChangeDataState(name: string, status: boolean){
        let _data = this.state.dataState;
        _data[name] = status;
        this.setState({
            dataState: _data
        })
    }
    setCard(card: string){
        this.setState({
            card: card
        })
    }
    getStep(){
        switch(this.state.step){
            case 'inputCard':{
                return <InputCardModal 
                setDataState={this.setDataState}
                setCard={this.setCard}
                onChangeStep={this.changeStep} />
            }
            case 'applyList': {
                return <ApplyContentListModal 
                    dataState={this.state.dataState}
                    card={this.state.card}
                    setType={this.setType}
                    onChangeStep={this.changeStep}/>
            }
            case 'applyListDetail': {
                return <ApplyContentDetail 
                    card= {this.state.card}
                    dataState={this.state.dataState}
                    setType={this.setType}
                    type={this.state.type}
                    onChangeDataState={this.onChangeDataState}
                    onChangeStep={this.changeStep} />
            }
        }
    }
    setType(str: string){
        this.setState({
            type: str
        });
    }
    render() {
        return <BaseModal isOpen={true}>
            {this.getStep()}
        </BaseModal>
    }
} 
interface InputCardModalProps {
    onChangeStep: (str: string)=>void;
    setDataState: (data: any) =>void;
    setCard: (str: string) => void;
}
interface InputCardModalState {
    data: {
        card: string;
    },
    isLoading: boolean;
    error: string;
}
class Loading{
    state: any;
    setState: any;
    run(func ?: any){
        return ()=>{
            if(this.state.isLoading){
                return;
            }
            this.setState({
                isLoading: true
            },()=>{
                typeof func === 'function' && func.call(this);
            })
        }
    }
}
//输入身份证模块
class InputCardModal extends React.Component<InputCardModalProps, InputCardModalState> {
    constructor(props: InputCardModalProps) {
        super(props);
        this.state = {
            data: {
                card: '',
            },
            isLoading: false,
            error: ''
        };
        this.changeInput = this.changeInput.bind(this);
        //this.searchCard = this.loading.call(this, this.searchCard);
        let loading = new Loading();
        this.searchCard = loading.run.call(this, this.searchCard);
    }
    changeInput(name: 'card', value: any){
        let _data = this.state.data;
        _data[name] = value;
        this.setState({
            error: '',
            data: _data
        })
    }
    searchCard(){
        let _options:ReqOption<ParameterName.getBorrowerStatus> = {
            data: {
                IDCardNo: this.state.data.card,
                Token: '123123'
            },
            fail: (error)=>{
                this.setState({
                    error: error.ErrMsg,
                    isLoading: false
                })
            },
            succeed: (callBack)=>{
                this.setState({
                    isLoading: false
                });
                let _data = {
                    "Status": "SUCCESS",
                    "Value": {
                        "BorrowerId": "4947359977861481873",//借款人基本信息Id
                        "ApplyId": "0",//申请Id
                        "BorrowerDetailInfoId": "0",//借款人详细信息Id
                        "ISExsitBorrower": true,//是否存在借款人基本信息
                        "ISApply": false,//是否存在申请信息
                        "ISExsitBorrowerDetail": false,//是否存在借款人基本信息
                        "ISUploadPersonCardState": false,//是否实名认证
                        "HoneypotStatus": false,//是否获取蜜罐信息
                        "HoneyBeeStatus": false,//是否获取蜜蜂信息
                        "Alipay": false//是否获取支付宝信息
                    }
                }
                //设置状态;
                this.props.setDataState(_data.Value);
                this.props.setCard(this.state.data.card); 
                //跳转
                this.props.onChangeStep('applyList');
            }
        }
        
        req(ParameterName.getBorrowerStatus, _options);
    }
    render() {
        return <div
            style={{
                background: '#fff', padding: '35px', width: '330px'
            }}>           
            {this.state.error && <div style={{color: 'red'}}>
                {this.state.error}    
            </div>}
            <BankCardInput 
                placeholder='请输入身份证' name='card' 
                value={this.state.data.card}
                onChange={(e)=>this.changeInput('card', e.target.value)} />
            <PrimaryButton 
                style={{height: '48px',marginTop: '20px'}}
                onClick={this.searchCard}>
                {!this.state.isLoading ? '查询身份证' :  
                <InnerProgress hidden={false} height={'32px'} />} 
            </PrimaryButton>
            <CancelButton style={{height: '48px',marginTop: '20px'}}>
                关闭
            </CancelButton>
        </div>
    }
}

interface ApplyContentListModalProps {
    onChangeStep: (str: string) => void;
    setType: (str: string) => void;
    dataState: any;
    card: string;
}

//状态列表
class ApplyContentListModal extends React.Component <ApplyContentListModalProps ,any>{
    constructor(props: ApplyContentListModalProps){
        super(props);
        this.onChangeStep = this.onChangeStep.bind(this);
    }
    onChangeStep(str: string, name: string){
        this.props.setType(name);
        this.props.onChangeStep(str);
    }
    render(){
        //console.log(this.props.dataState);
        return <div style={{width: '500px', 
                height: '660px', 
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                background: '#Fff'}}>
                <div>
                    <BankCardInput value={this.props.card} disabled={true} borderNone={true} />
                    <ApplyContent 
                        dataState={this.props.dataState}
                        onChangeStep={this.onChangeStep} />
                </div>
                <div style={{display: 'flex'}}>
                    <CancelButton onClick={()=>this.props.onChangeStep('inputCard')} style={{borderRadius: '0', 
                        height: '40px',
                        width: '33%'}}>
                        返回
                    </CancelButton>
                    <CancelButton style={{borderRadius: '0',
                        height: '40px',
                        width: '34%'
                        }}>
                        关闭
                    </CancelButton>
                    <PrimaryButton style={{borderRadius: '0',
                        height: '40px',
                        width: '33%'}}>
                        确认
                    </PrimaryButton>
                </div>
        </div>
    }
}

type ApplyContentDetailProps = {
    card: string;
    dataState: any;
    type: any;
    onChangeStep: (e: string)=>void;
    setType:(e: string) => void;
    onChangeDataState: (e: string, status: boolean) => void;
}

class ApplyContentDetail extends React.Component <ApplyContentDetailProps, any>{
    constructor(props: ApplyContentDetailProps){
        super(props);
        this.changeStep = this.changeStep.bind(this);
    }
    changeStep(step: string, name: string){
        this.props.setType(name);
        this.props.onChangeStep(step);
    }
    getTypePage(){
        switch(this.props.type){
            case 'ISApply': return (
                <ApplyInfo name={this.props.type} 
                    onChangeDataState={this.props.onChangeDataState} 
                    id={this.props.dataState.BorrowerId} 
                    onChangeStep={this.props.onChangeStep}/>  );
            case 'ISUploadPersonCardState': return (
                <Certification name={this.props.type} 
                    onChangeDataState={this.props.onChangeDataState} 
                    IDCard={this.props.card} 
                    onChangeStep={this.props.onChangeStep} />
            )
            case 'ISExsitBorrower': return (
                <BorrowerInfo name={this.props.type}
                    userId={this.props.dataState.BorrowerId}
                    isExit={this.props.dataState[this.props.type]}
                    card={this.props.card}
                    onChangeDataState={this.props.onChangeDataState}
                    onChangeStep={this.props.onChangeStep}
                />
            )
            case 'ISExsitBorrowerDetail': return(
                <BorrowerInfoDetail />
            )
            default: {
                return <div>测试阶段</div>
            }
        }
    }
    render(){
        return <div style={{height: '660px',
                display:'flex',
                background: '#fff'
            }}>
            <div style={{width: '300px'}}>
                <BankCardInput value={this.props.card} disabled={true} borderNone={true} />
                <ApplyContent dataState={this.props.dataState} 
                onChangeStep={this.changeStep}/>
            </div>
            <div style={{width: '520px'}}>
                {this.getTypePage()}
            </div>
        </div>
    }
}
type ApplyInfoState = {
    data: Parameter<ParameterName.addLoanApplyRecord>;
    isLoading: boolean;
    error: string;
}
type ApplyInfoProps = {
    id: string;
    name: string;
    onChangeDataState: (str: string, status: boolean)=> void;
    onChangeStep: (str: string)=>void;
}
//申请借款信息
class ApplyInfo extends React.Component <ApplyInfoProps, ApplyInfoState>{
    constructor(props: any){
        super(props);
        this.state={
            data: {
                Token: '1231231',
                ApplyMoney: '',
                BorrowerId: this.props.id,
                Period: '',
                Remark: '家庭消费'
            },
            isLoading: false,
            error: ''
        }
        this.inputChange = this.inputChange.bind(this);
        let loading = new Loading();
        this.confirm = loading.run.call(this, this.confirm);
    }
    inputChange(name:ParameterSummary[ParameterName.addLoanApplyRecord], value: any){
        let _data = this.state.data;
        _data[name] = value;
        this.setState({
            data: _data
        });
    }
    confirm(){
        let _options: ReqOption<ParameterName.addLoanApplyRecord> = {
            data: this.state.data,
            fail: (error)=>{
                this.setState({
                    error: error.ErrMsg
                })
            },
            succeed: ()=>{
                this.props.onChangeDataState(this.props.name, true);
                this.props.onChangeStep('applyList');
            }
        }
        req(ParameterName.addLoanApplyRecord, _options);
    }
    render(){
        return <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div>
                {this.state.error && <div style={{color: 'red'}}>
                    {this.state.error}
                </div>}
                <div style={{color: '#333', fontWeight: 'bold', 
                    padding: '20px', textAlign:'center'}}>
                    申请借款信息
                </div>
                <div style={{width: '360px', margin:'auto'}}>
                    <div style={{marginTop: '20px'}}>
                        <ApplyInput type='text' text='申请金额' 
                            onChange={(e)=>this.inputChange('ApplyMoney', e.target.value)}
                            name={'ApplyMoney'} value={this.state.data.ApplyMoney} />
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <ApplyInput type='text' text='申请周期' 
                            onChange={(e)=> this.inputChange('Period', e.target.value)}
                            name={'Period'} value={this.state.data.Period} />
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <ApplyInput type='text' text='用途' disabled={true} value={this.state.data.Remark}/>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <CancelButton 
                    onClick={()=>this.props.onChangeStep('applyList')}
                    style={{height: '40px', borderRadius:'0', width: '50%'}} >
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm} style={{height: '40px', borderRadius:'0', width: '50%'}} >
                    {!this.state.isLoading ? '确认' : <InnerProgress hidden={false} height='32px' />}
                </PrimaryButton>
            </div>
    </div>
    }
}
type CertificationProps = {
    onChangeStep: (str: string)=>void;
    onChangeDataState: (str: string, status: boolean) => void;
    IDCard: string;
    name: string;
}
type CertificationState = {
    isLoading: boolean;
    data: Parameter<ParameterName.uploadBorrowerImage>;
    error: string;
}
function getBlobFile(_canvas: HTMLCanvasElement) {
    let _url = _canvas.toDataURL("image/jpeg", 0.8);
    _url = _url.replace('data:image/jpeg;base64,','');
    let byteString = atob(_url);
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia],{type: "image/jpeg"});
}
//实名认证
class Certification extends React.Component <CertificationProps, CertificationState>{
    constructor(props:CertificationProps){
        super(props);
        this.state = {
            isLoading: false,
            data: {},
            error: ''
        }
        this.getData = this.getData.bind(this);
        let _loading = new Loading();
        this.confirm = _loading.run.call(this, this.confirm);
    }
    getData(name: ParameterSummary[ParameterName.uploadBorrowerImage], value: any){
        let _data = getBlobFile(value);
        let data = this.state.data;
        data[name] = _data;
        this.setState({
            data: data,
            error: ''
        });
    }
    confirm(){
        let _form:any =  new FormData();
        let k: ParameterSummary[ParameterName.uploadBorrowerImage];
        for(k in this.state.data){
            _form.set(k, this.state.data[k])
        }
        _form.set('IDCard', this.props.IDCard);
        let _options: ReqOption<ParameterName.uploadBorrowerImage> = {
            data: _form,
            fail: (e)=>{
                this.setState({
                    error: e.ErrMsg
                })
            },
            succeed: (e)=>{
                //console.log(e.Value);
                this.props.onChangeDataState(this.props.name, true);
                this.props.onChangeStep('applyList')
            }
        }
        req(ParameterName.uploadBorrowerImage, _options);
    }
    render(){
        return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            {this.state.error 
                && <div className='z-index-100' style={{color: 'red', position:'absolute', 
                width: '490px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.49)'}}>{this.state.error}</div>}
            <div style={{height: '620px', overflow:'auto'}}>
                <ImageFile getData={this.getData} loading={false} name='zheng.jpg' >
                    身份证正面
                </ImageFile>
                <ImageFile  getData={this.getData} loading={false} name='fan.jpg' >
                    身份证反面
                </ImageFile>
                <ImageFile  getData={this.getData} loading={false} name='shou.jpg' >
                    手持身份证
                </ImageFile>
            </div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton 
                    onClick={()=>this.props.onChangeStep('applyList')}
                    style={{height: '40px', borderRadius:'0', width: '50%'}} >
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm} style={{height: '40px', borderRadius:'0', width: '50%'}} >
                    {!this.state.isLoading ? '确认' : <InnerProgress hidden={false} height='32px' />}
                </PrimaryButton>
            </div>
        </div>
    }
}

type BorrowerInfoProps = {
    card: string;
    userId:string;
    name: string;
    isExit: boolean;
    onChangeStep: (str: string) => void;
    onChangeDataState: (str: string, status: boolean) => void;
}

type BorrowerInfoState = {
    data: Parameter<ParameterName.updateBorrowPersonInfo>;
    isLoading: boolean;
    error: string;
}

//借款人信息
class BorrowerInfo extends React.Component <BorrowerInfoProps, BorrowerInfoState> {
    constructor(props: any){
        super(props);
        this.state = {
            data: {
                
            },
            isLoading: false,
            error: ''
        }
        let loading = new Loading();
        this.inputChange = this.inputChange.bind(this);
        this.confirm = loading.run.call(this, this.confirm);
        this.getInfo = loading.run.call(this, this.getInfo);
    }
    componentDidMount(){
        if(this.props.isExit){
            this.getInfo();
        }
    }
    getInfo(){
        let _options: ReqOption<ParameterName.getBorrowerBaseInfo> = {
            data: {
                BorrowerId: this.props.userId,
                Token: '123123'
            },
            fail: (e)=>{
                alert(e.ErrMsg)
            },
            succeed: (e)=>{
                let _data: any = {
                    "Id": "5110385289942694150",//借款人基本信息Id
                    "RealName": '测试',//借款人真实姓名
                    "IDCardNo": "12313",//借款人身份证号码
                    "Mobile": '123123',//借款热手机号
                    "Birthday": null,//借款人出生日期
                    "Sex": false,//性别：false男，true女，默认是男
                    "Status": 2,//借款人状态 ，1冻结，2正常，3作废
                    "HouseholdAddress": '123',//借款人地址
                    "Email": '123'//借款人邮箱
                };
                this.setState({
                    data: _data,
                    isLoading: false
                })
            }
        }
        req(ParameterName.getBorrowerBaseInfo, _options);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        if(this.state.isLoading){
            return;
        }
        let _data = this.state.data;
        let _name = e.target.name as ParameterSummary[ParameterName.updateBorrowPersonInfo];
        _data[_name] = e.target.value;
        this.setState({
            data: _data
        })
    }
    getBirthAndSexByCardId(card: string){
        let _birth = card.substring(6, 10) + "-" + card.substring(10, 12) + "-" + card.substring(12, 14);
        let _sex = parseInt(card.substr(16, 1)) % 2 !== 1;
        return {
            birth: _birth,
            sex: _sex
        }
    }
    confirm(){
        let _data = this.state.data;
        let _birthAndSex = this.getBirthAndSexByCardId(this.props.card);
        _data.Birthday = _birthAndSex.birth;
        _data.Sex = _birthAndSex.sex;
        _data.IDCardNo = this.props.card;
        let _options: ReqOption<ParameterName.updateBorrowPersonInfo> = {
            data: _data,
            fail: (e)=>{
                this.setState({
                    isLoading: false,
                    error: e.ErrMsg
                })
            },
            succeed: ()=>{
                this.props.onChangeStep('applyList');
                this.props.onChangeDataState(this.props.name, true)
            }
        }
        req(ParameterName.updateBorrowPersonInfo, _options)
    }
    render(){
        return <div style={{display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div style={{width: '360px', margin: '0 auto'}}>
                <div style={{color: '#333', fontWeight: 'bold', 
                    padding: '20px', textAlign:'center'}}>
                    借款人信息
                </div>
                <div style={{marginTop: '15px'}}>
                    <ApplyInput
                        onChange={this.inputChange}
                        text='真实姓名' name={'RealName'} value={this.state.data.RealName} />
                </div>
                <div style={{marginTop: '15px'}}>
                    <ApplyInput 
                        onChange={this.inputChange}
                        text='手机号码' name='Mobile' value={this.state.data.Mobile} />
                </div>
                <div style={{marginTop: '15px'}}>
                    <ApplyInput 
                        onChange={this.inputChange}
                        text='家庭住址' name='HouseholdAddress' value={this.state.data.HouseholdAddress} /> 
                </div>
                <div style={{marginTop: '15px'}}>
                    <ApplyInput 
                        onChange={this.inputChange}
                        text='个人邮箱' name='Email' value={this.state.data.Email} />
                </div>
                
            </div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton 
                    onClick={()=>this.props.onChangeStep('applyList')}
                    style={{height: '40px', borderRadius:'0', width: '50%'}} >
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm} style={{height: '40px', borderRadius:'0', width: '50%'}} >
                    {!this.state.isLoading ? '确认' : <InnerProgress hidden={false} height='32px' />}
                </PrimaryButton>
            </div>
        </div>
    }
}


type BorrowerInfoDetailState = {
    type : 'contactInfo' | 'otherInfo' | 'companyInfo',
    data ?: Parameter<ParameterName.addBorrowerDetailInfo>
}

//借款人信息详情
class BorrowerInfoDetail extends React.Component <any, BorrowerInfoDetailState> {
    constructor(props: any){
        super(props);
        this.state = {
            type: 'contactInfo',
            data: {}
        }
        this.getDom = this.getDom.bind(this);
        this.changeType = this.changeType.bind(this);
    }
    changeType(type: BorrowerInfoDetailState['type']){
        if(this.state.type === type){
            return;
        }
        if(this.setData.run){
            //this.setData.run();
            let data = this.setData.run();
            let _data = {};
            Object.assign(_data, data);
            this.setState({
                data: _data,
                type: type
            })
        }else{
            this.setState({
                type: type
            })
        }
        
    }
    setData: {
        run:any
    } = {run: null}
    getDom(){
        switch(this.state.type){
            case 'contactInfo': 
                return <ContactInfo />;
            case 'companyInfo':
                return <CompanyInfo name={'BorrowerCompany'} 
                    watcher={this.setData}
                    data={this.state.data.BorrowerCompany} />;
            case 'otherInfo':
                return <OtherInfo />;
        }
    }
    render(){
        return <div style={{display: 'flex', 
            flexDirection:'column',
            position: 'relative',
            justifyContent: 'space-between', height:'100%'}}>
            <div style={{display: 'flex'}}>
                <TabButton 
                    onClick={()=>this.changeType('contactInfo')}
                    clicked={this.state.type === 'contactInfo'}>
                    联系人信息
                </TabButton>
                <TabButton 
                    onClick={()=>this.changeType('otherInfo')}
                    clicked={this.state.type === 'otherInfo'}>
                    其他信息
                </TabButton>
                <TabButton 
                    onClick={()=>this.changeType('companyInfo')}
                    clicked={this.state.type === 'companyInfo'}>
                    公司信息
                </TabButton>
            </div>
            <div style={{flex: '10', overflow: 'auto'}}>
                {this.getDom()}
            </div>
            <div style={{display: 'flex', height: '40px'}}>
                <CancelButton style={{width:'50%', borderRadius: '0'}}>
                    取消
                </CancelButton>
                <PrimaryButton style={{width:'50%', borderRadius: '0'}}>
                    确认
                </PrimaryButton>
            </div>
        </div>
    }
}
type ContactInfoState = {
    type: string;
    data: any[];
    editData: any;
    sub: any;
}
//联系人信息
class ContactInfo extends React.Component <any, ContactInfoState>{
    constructor(props: any){
        super(props)
        this.state = {
            type: '',
            data: [],
            editData: {},
            sub: ''
        }
        this.getDom = this.getDom.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeData = this.changeData.bind(this);
        this.edit  = this.edit.bind(this);
        this.del = this.del.bind(this);
    }
    changeType(type: string){
        this.setState({
            type: type
        })
    }
    edit(data:any, key: any){
       this.setState({
            editData: data,
            sub: key,
            type: 'edit'
        }) 
    }
    del(key: any){
        let _data = this.state.data;
        _data.splice(key, 1);
        this.setState({
            data: _data
        })
    }
    changeData(data: any){
        let _data = this.state.data;
        let _sub = this.state.sub;
        if(_sub || _sub === 0){
            _data[parseInt(_sub)] = data;
        }else{
            _data.push(data);
        }
        this.setState({
            type: '',
            data: _data,
            editData: '',
            sub : ''
        })
    }
    list = [{
        text: '父母',
        value: '0'
    },{
        text: '配偶',
        value: '1'
    },{
        text: '朋友',
        value: '2'
    },{
        text: '亲戚',
        value: '3'
    }]
    setting:any = [{
        attr: 'contactName',
        head: '姓名'
    }, {
        attr: 'contactMobile',
        head: '手机号'
    }, {
        attr: 'contactAddress',
        head: '地址'
    }, {
        attr: 'contactRelation',
        head: '关系',
        format: (data:any, attr: any)=>{
            let _data = data[attr];
            let _list = this.list;
            console.log(_data);
            for(let i=0; i< _list.length; i++){
                if(_list[i].value === _data){
                    return _list[i].text
                }
            }
        }
    },{
        attr: 'contactName',
        head: '操作',
        format:(data: any, attr: any, key: number)=>{
            return <div style={{display: 'inline-flex', width: '100px'}}>
                <HrefButton onClick={()=>this.edit(data, key)}>编辑</HrefButton>
                <HrefButton onClick={()=>this.del(key)} >删除</HrefButton>
            </div>
            
        }
    }]
    getDom(){
        switch(this.state.type){
            case 'edit':
            case 'add': {
                return <AddContactInfo 
                    data={this.state.editData}
                    cancel={()=>this.changeType('')} confirm={this.changeData} />
            }
            default: {
                let Tab = Table.CommonTable; 
                 return <div>
                    <PrimaryButton style={{width: '140px', 
                        margin: '15px 0',
                        height: '35px'}} onClick={()=>this.changeType('add')}>
                        添加联系人
                    </PrimaryButton>
                    <Tab setting={this.setting} list={this.state.data} />
                </div>
            }
        }
    }
    render(){
        return this.getDom()
    }
    
}

type OtherInfoState = {
    type: 'edit' | 'add' | '';
}
//其他信息
class OtherInfo extends React.Component <any, OtherInfoState>{
    constructor(props: any){
        super(props);
        this.state = {
            type: ''
        }
        this.changeType = this.changeType.bind(this);
    }
    changeType(str: OtherInfoState['type']){
        this.setState({
            type: str
        })
    }
    list = [{
        text: '未婚',
        value: '0'
    },{
        text:' 已婚',
        value: '1'
    }];
    choicePage(){
        switch(this.state.type){
            case 'add': {
                return <AddRemark cancel={()=>this.changeType('')} />
            }
            default : {
                return <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    width: '360px',
                    paddingTop: '20px',
                    margin: '0 auto'
                }}>
                    
                    <div style={{marginTop: '10px'}}>
                        <ApplySelect text='婚姻情况' list={this.list} />
                    </div>
                    <div 
                        style={{
                            marginTop: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '14px', 
                            marginBottom: '10px', 
                            height: '40px',
                            alignItems: 'center',
                            color: '#777'}}>
                        <span>
                            备注
                        </span>
                        <HrefButton onClick={()=>this.changeType('add')}>
                            添加备注
                        </HrefButton>
                    </div>
                    <div style={{flex: 10, overflow: 'auto'}}>
                        {
                            [1].map(()=>{
                                return <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '14px'
                                }}>
                                    <span style={{flex: 10, wordBreak:'break-all'}}>
                                        备注备注备注备注备注备注备
                                    </span>
                                    <HrefButton style={{background:'#ccc'}} onClick={()=>alert('修改!')}>
                                        修改
                                    </HrefButton>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
            
        }
    }
    render(){
        return this.choicePage();
    }
}

type CompanyInfoState = {
    data: {
        CompanyName ?: string;
        CompanyAddress ?: string;
        Department ?: string;
        Position ?: string;
        Salary ?: string;
    }
}
type CompanyInfoProps = {
    data: string;
    watcher: {
        run: any
    }
    name: string;
}

//公司信息
class CompanyInfo extends React.Component <CompanyInfoProps, CompanyInfoState>{
    constructor(props: CompanyInfoProps){
        super(props);
        let _data = props.data && JSON.parse(props.data);
        this.state = {
            data: _data || {}
        };
        this.inputChange = this.inputChange.bind(this);
        this.props.watcher.run = ()=>{
            let _data:any = {}
            _data[this.props.name] = JSON.stringify(this.state.data)
            return _data
        }
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _name = e.target.name;
        let value = e.target.value;
        let _data = this.state.data;
        _data[_name as 'CompanyName'] = value;
        this.setState({
            data: _data
        })
    }
    componentWillUnmount(){
        this.props.watcher.run = null
    }
    render(){
        let _data = this.state.data;
        return <div 
            style={{
                width: '360px',
                margin: '0 auto',
                paddingTop: '10px'
            }}>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='公司名字' 
                    name='CompanyName'
                    onChange={this.inputChange}
                    value={_data.CompanyName} />
            </div>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='公司地址' 
                    name={'CompanyAddress'}
                    onChange={this.inputChange}
                    value={_data.CompanyAddress} />
            </div>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='部门' 
                    name={'Department'}
                    onChange={this.inputChange}
                    value={_data.Department} />
            </div>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='职位' 
                    name={'Position'}
                    onChange={this.inputChange}
                    value={_data.Position} />
            </div>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='薪水'
                    name={'Salary'}
                    onChange={this.inputChange}
                    value={_data.Salary} />
            </div>
        </div>
    }
}

type  AddContactInfoState = {
    data : {
        contactName ?: string;
        contactMobile ?: string;
        contactAddress ?: string;
        contactRelation ?: string;
    }
}
type AddContactInfoProps = {
    data ?: AddContactInfoState['data'];
    cancel: () => void;
    confirm: (e: any) => void;
}

//添加联系人
class AddContactInfo extends React.Component <AddContactInfoProps, AddContactInfoState> {
    constructor(props: AddContactInfoProps){
        super(props);
        //let _data =  && Object.assign({}, props.data) || {};
        console.log(props.data);
        this.state={
            data: props.data || {}
        }
        this.inputChange = this.inputChange.bind(this);
        this.confirm = this.confirm.bind(this);
        console.log(props.data);
    }
    list = [{
        text: '父母',
        value: '0'
    },{
        text: '配偶',
        value: '1'
    },{
        text: '朋友',
        value: '2'
    },{
        text: '亲戚',
        value: '3'
    }]
    inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        let name = e.target.name;
        let value = e.target.value;
        let _data = this.state.data;
        _data[name as 'contactName'] = value;
        this.setState({
            data: _data
        })
    }
    confirm(){
        let _data = Object.assign({}, this.state.data)
        this.props.confirm(_data)
        this.setState({
            data: {}
        })
    }
    render(){
        return <div className='z-index-1' 
            style={{position: "absolute",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            top: 0, left: 0, background:'#fff',
            height: '100%', width: '100%'}}>
            <div style={{width: '360px', margin:'0 auto', paddingTop: '10px'}}>
                <div style={{color: '#333', fontWeight: 'bold', 
                    padding: '20px', textAlign:'center'}}>
                    添加联系人
                </div>
                <div style={{marginTop: '10px'}}>
                    <ApplyInput text='联系人姓名' 
                        name={'contactName'}
                        onChange = {this.inputChange}
                        value={this.state.data.contactName}/>
                </div>
                <div style={{marginTop: '10px'}}>
                    <ApplyInput text='联系人电话' 
                        name={'contactMobile'}
                        onChange = {this.inputChange}
                        value={this.state.data.contactMobile} />
                </div>
                <div style={{marginTop: '10px'}}>
                    <ApplyInput text='联系人地址' 
                        name={'contactAddress'}
                        onChange = {this.inputChange}
                        value={this.state.data.contactAddress} />
                </div>
                <div style={{marginTop: '10px'}}>
                    <ApplySelect text='联系人关系' 
                        name={'contactRelation'}
                        onChange = {this.inputChange}
                        list={this.list} 
                        value={this.state.data.contactRelation} />
                </div>
            </div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton onClick={this.props.cancel}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    确认
                </PrimaryButton>
            </div>
        </div>
    }
}

type AddRemarkProps = {
    cancel: ()=>void
}
//添加备注
class AddRemark extends React.Component <AddRemarkProps, any>{
    constructor(props: any){
        super(props);
        this.state = {

        }
    }
    confirm(){
        alert(1);
    }
    render(){
        return <div className='z-index-1' 
        style={{position: "absolute",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        top: 0, left: 0, background:'#fff',
        height: '100%', width: '100%'}}>
        <div style={{width: '360px', margin:'0 auto', paddingTop: '10px'}}>
            <div style={{color: '#333', fontWeight: 'bold', 
                padding: '20px', textAlign:'center'}}>
                添加备注
            </div>
            <textarea></textarea>
        </div>
        <div style={{height: '40px', display: 'flex'}}>
            <CancelButton onClick={this.props.cancel}>
                取消
            </CancelButton>
            <PrimaryButton onClick={this.confirm}>
                确认
            </PrimaryButton>
        </div>
    </div>
    }
}