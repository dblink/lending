import * as React from 'react';
import { Parameter, ParameterName, Callback } from '../../../components/request/setting';
import { sessionData } from '../../../components/sessionData/sessionData';
import { load } from '../../../components/loading/loading';
import { ReqOption, req } from '../../../components/request';
import { logOut } from '../../../components/fail/logOut';
import { PageLoading, InnerProgress } from '../../../components/progress/progress';
import { CancelButton, PrimaryButton } from '../../../components/button';
import { LoanAgreement } from '../../../module/contractHtml/loanAgreement';

type SignatureProps = {
    contractId: string;
    name:string;
    cardNo: string;
    period: string;
    serviceMoney: string;
    cancel: (bool?: boolean)=>void;
}
type SignatureState = {
    data: Parameter<ParameterName.signature>;
    isPageLoading: boolean;
}

export class Signature extends React.Component<SignatureProps, SignatureState> {
    constructor(props: SignatureProps){
        super(props);
        this.state = {
            data: {
                ReturnUrl: 'http://lotus.hehuadata.com/contract/success',
                Token: sessionData.getData('Token'),
                ContractId: this.props.contractId,
            },
            isPageLoading: true,
        }
        this.getInfo = load.run.call(this, this.getInfo, 'isPageLoading');
        this.confirm = load.run.call(this, this.confirm, 'isPageLoading');
    }
    form: HTMLFormElement;
    componentDidMount(): void {
        this.getInfo();
    }
    getInfo(){
        let _req: ReqOption<ParameterName.signature>;
        _req = {
            data: this.state.data,
            fail: logOut((e:Callback)=>{
                alert(e);
            }, location.pathname),
            succeed: (e)=>{
                this.setState({
                    isPageLoading: false
                })
                let _form = this.form,
                    _strData = '',
                    _data = e.Value;
                _form.setAttribute('method', 'post');
                _form.setAttribute('action', 'https://hqb.95epay.com/sloan/paySignature.action')
                for(let k in e.Value){
                    _strData += `<input name=${k} value=${_data[k] ? _data[k] : ''} />`;
                }
                _form.innerHTML = _strData;
                _form.submit();
            }
        }
        req(ParameterName.signature, _req);
    }
    num = 0;
    confirm(){
        if(localStorage.getItem('isServiceSign') !== 'true'){
            alert('请签署双方服务协议！');
            this.setState({
                isPageLoading: false
            })
            return;
        }
        localStorage.setItem('isServiceSign', '');
        let _req: ReqOption<ParameterName.getSignatureState>;
        _req ={
            data: {
                ContractId: this.props.contractId,
                Token: sessionData.getData('Token')
            },
            fail: logOut((e:Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                if(e.Value.Status.toString() === '0'){
                    alert('签约成功！');
                    this.props.cancel(true);
                }else if(e.Value.Status.toString() === '-1'){
                    if(this.num !== 0){
                        alert(e.Value.ErrorMessage);
                        this.props.cancel();
                    }else{
                        this.num = this.num + 1;
                        setTimeout(()=>{
                            this.setState({
                                isPageLoading: false
                            },this.confirm)
                        }, 10000)
                    }
                }
            }   
        }
        req(ParameterName.getSignatureState, _req);
    }
    render(){
        return <div style={{background: '#FFF', height:'90%',
            width: '90%',
            position:'relative',
            flexDirection: 'column', display:'flex'}}>
            <PageLoading show={this.state.isPageLoading} />
            <form ref={e=>this.form = e} target='iframe' hidden></form>
            <div>
                <a href={`/service/${this.props.name}/${this.props.cardNo}/${this.props.period}/${this.props.serviceMoney}`} target='_blank'>
                    点击签署双方服务协议
                </a>
            </div>
            <iframe name='iframe' style={{border: 0, width: '100%', height: '100%'}}>
            
            </iframe>
            <div style={{display: 'flex', minHeight: '40px'}}>
                <CancelButton onClick={()=>this.props.cancel()}>取消</CancelButton>
                <PrimaryButton onClick={this.confirm}>确认</PrimaryButton>
            </div>
        </div>
    }
}

function getBlobFile(base64: string) {
    let _url = base64.replace('data:image/png;base64,','');
    let byteString = atob(_url);
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia],{type: "image/png"});
}

//汇付签章
export class SignatureCT extends React.Component<SignatureProps, any>{
    constructor(props: any){
        super(props);
        this.state = {
            backInfo: {},
            isPageLoading: true,
            isLoading: false,
            file: ''
        }
        this.getServiceInfo = load.run.call(this, this.getServiceInfo);
        this.form = new FormData();
        this.createSign = this.createSign.bind(this);
        this.confirm = load.run.call(this, this.confirm);
        this.cancel = load.isLoading.call(this, this.props.cancel);
    }
    form: FormData;
    num = 0;
    cancel(){};
    componentDidMount(){
        this.getServiceInfo()
    }
    createSign(img: any){
        this.setState({
            file: getBlobFile(img)
        })
    }
    confirm(){
        if(localStorage.getItem('isServiceSign') !== 'true'){
            alert('请签署双方服务协议！');
            this.setState({
                isPageLoading: false
            })
            return;
        }
        localStorage.setItem('isServiceSign', '');
        if(!this.state.file){
            alert('请签名！');
            this.setState({
                isLoading: false
            })
        }
        let _req: ReqOption<ParameterName.signatureWidthHF | any>;
        let _form = this.form;
        _form.append('Token', sessionData.getData('Token'));
        _form.append('ContractId', this.props.contractId);
        _form.append('BigAmount', document.getElementById('bigAmount').innerHTML);
        _form.append('img.png', this.state.file, 'img.png')
        _req = {
            data: _form,
            fail: (e)=>{
                alert(e.ErrMsg);
                this.form = new FormData();
                this.setState({
                    isLoading: false
                })
            },
            succeed: (e)=>{
                alert('签名成功！');
                this.props.cancel(true);
            }
        }
        req(ParameterName.signatureWidthHF, _req);
    }
    getServiceInfo(){
        let _req: ReqOption<ParameterName.getWaitSignContractInfo>;
        _req = {
            data: {
                ContractId:this.props.contractId,
                Token: sessionData.getData('Token')
            },
            fail: (e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false,
                    isPageLoading: false
                })
            },
            succeed: (e)=>{
                this.setState({
                    backInfo: e.Value,
                    isLoading: false,
                    isPageLoading: false
                })
            }
        }
        req(ParameterName.getWaitSignContractInfo, _req);
    }
    render(){
        return <div style={{background: '#FFF', height:'90%',
            width: '90%',
            position:'relative',
            flexDirection: 'column', display:'flex'}}>
        <PageLoading show={this.state.isPageLoading} />
        <div>
            <a href={`/service/${this.props.name}/${this.props.cardNo}/${this.props.period}/${this.props.serviceMoney}`} target='_blank'>
                点击签署双方服务协议
            </a>
        </div>
        {this.state.backInfo.RealName
            ? <LoanAgreement data={this.state.backInfo} success={this.createSign} />
            :  ''
        }
        <div style={{display: 'flex', minHeight: '40px'}}>
            <CancelButton onClick={this.cancel}>取消</CancelButton>
            <PrimaryButton onClick={this.confirm}>{
                this.state.isLoading 
                    ? <InnerProgress height='32px' />
                    : '确认'
            }</PrimaryButton>
        </div>
    </div>
    }
}