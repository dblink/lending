import * as React from 'react';
import { Parameter, ParameterName, ParameterSummary } from '../../../components/request/setting';
import { load } from '../../../components/loading/loading';
import { ReqOption, req } from '../../../components/request';
import { ImageFile } from '../../../components/showImage';
import { CancelButton, PrimaryButton } from '../../../components/button';
import { InnerProgress } from '../../../components/progress/progress';
import { sessionData } from '../../../components/sessionData/sessionData';

type CertificationProps = {
    onChangeStep: (str: string, type : string)=>void;
    onChangeDataState: (str: string, status: boolean) => void;
    IDCard: string;
    name: string;
}
type CertificationState = {
    isLoading: boolean;
    data: Parameter<ParameterName.uploadBorrowerImage>;
    error: string;
}
export function getBlobFile(_canvas: HTMLCanvasElement) {
    let _url = _canvas.toDataURL("image/jpeg", 1);
    _url = _url.replace('data:image/jpeg;base64,','');
    let byteString = atob(_url);
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia],{type: "image/jpeg"});
}
//实名认证
export class Certification extends React.Component <CertificationProps, CertificationState>{
    constructor(props:CertificationProps){
        super(props);
        this.state = {
            isLoading: false,
            data: {
                Token: sessionData.getData('Token')
            },
            error: ''
        }
        this.getData = this.getData.bind(this);
        this.confirm = load.run.call(this, this.confirm);
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
                    error: e.ErrMsg,
                    isLoading: false
                })
            },
            succeed: (e)=>{
                //console.log(e.Value);
                this.props.onChangeDataState(this.props.name, true);
                this.props.onChangeStep('applyList', '')
            }
        }
        req(ParameterName.uploadBorrowerImage, _options);
    }
    render(){
        return <div style={{display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
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
                    onClick={()=>this.props.onChangeStep('applyList', '')}
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