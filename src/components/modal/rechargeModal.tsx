import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { ApplyInput } from '../input';
import { CancelButton, PrimaryButton } from '../button';
import { Parameter, ParameterName, Callback, ParameterSummary } from '../request/setting';
import { sessionData } from '../sessionData/sessionData';
import { ReqOption, req } from '../request';
import { logOut } from '../fail/logOut';
import { ModalTitle } from './title';
import { ImageFile } from '../showImage';
import { getBlobFile } from '../../module/applyContentDetail/certification/certification';
import { PageLoading, InnerProgress } from '../progress/progress';
import { any } from 'prop-types';
import { load } from '../loading/loading';

interface Props {
    controller: {
        showModal  : any;
        cancelModal ?: any;
        //id: any;
    },
    getList: any;
}
export type RechargePage = 'apply' | 'upload';


interface State {
    //data  : Parameter<ParameterName.applyRechargeLoanBalance>;
    isOpen: boolean;
    page : RechargePage;
    data : any;
}

export class RechargeModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            page: 'apply',
            data: any
        };
        this.showModal = this.showModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.props.controller.showModal = this.showModal;
        this.props.controller.cancelModal = this.cancelModal;
        this.getDom = this.getDom.bind(this);
        
    }
    showModal(page: RechargePage, data ?: any){
        this.setState({
            isOpen: true,
            data: data,
            page: page
        })
    }
    cancelModal(bool ?: boolean){
        this.setState({
            isOpen: false
        }, ()=>{
            if(typeof bool === 'boolean' ){
                if(bool){
                    this.props.getList();
                }
            }
        })
    }
    getDom(){
        switch(this.state.page){
            case 'apply': return <RechargeApply cancelModal={this.cancelModal} />;
            case 'upload' : return <UploadCredentials cancel={this.cancelModal} id={this.state.data.id} />
        }
    }
    render() {
        return <BaseModal isOpen={this.state.isOpen}>
            {this.getDom()}
        </BaseModal>
    }
}

type RechargeApplyProps = {
    cancelModal: (bool ?: boolean) =>void;
    type ?: 'transform'
}
type RechargeApplyState = {
    data: Parameter<ParameterName.applyRechargeLoanBalance>;
    isLoading: boolean;
}
export class RechargeApply extends React.Component <RechargeApplyProps, RechargeApplyState>{
    constructor(props: any){
        super(props);
        this.state = {
            data: {
                Money: '',
                Token: sessionData.getData('Token')
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm);
        this.inputChange = load.isLoading.call(this, this.inputChange);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let name = e.target.name,
            value = e.target.value,
            _data = this.state.data;
        _data[name as 'Money'] = value;
        this.setState({
            data: _data
        })
    }
    confirm(){
        let _req:ReqOption<ParameterName.applyRechargeLoanBalance>;
        let _transform = ParameterName.applyRechargeLoanBalance;
        if(this.props.type === 'transform'){
            _transform = ParameterName.applyWithdrawLoanBalance
        }
        _req = {
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg)
            }),
            succeed: (e)=>{
                this.props.cancelModal(true)
            }
        };
        req(_transform, _req);
    }
    render(){
        return <div style={{background: '#fff', display: 'flex', 
            flexDirection: 'column', justifyContent: 'space-between',
            height: '300px', maxWidth: '500px', width: '90%'}}>
            <ModalTitle>
                购买债权
            </ModalTitle>
            <div style={{padding: '0 70px'}}>
                <ApplyInput text={'购买金额'} 
                    name='Money'
                    onChange={this.inputChange}
                    value={this.state.data.Money}
                    />
            </div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton onClick={()=>this.props.cancelModal()}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'} 
                </PrimaryButton>
            </div>
        </div>
    }
}
type UploadCredentialsProps ={
    cancel: (bool ?: boolean)=>void;
    id: string;
}
type UploadCredentialsState = {
    data: Parameter<ParameterName.uploadCertificateImage>;
    isLoading: boolean;
}
class UploadCredentials extends React.Component <UploadCredentialsProps, UploadCredentialsState>{
    constructor(props: any){
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                RechargeId: this.props.id
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm);
        this.getImageData = load.isLoading.call(this, this.getImageData);
    }
    getImageData(name:ParameterSummary[ParameterName.uploadCertificateImage], value:any, file: any){
        let _file = getBlobFile(value),
            _data = this.state.data;
        _data[name] = file;
        this.setState({
            data: _data
        })
    }
    confirm(){
        let _form = new FormData(),
            _req: ReqOption<ParameterName.uploadCertificateImage>,
            k: ParameterSummary[ParameterName.uploadCertificateImage] ;
        for(k in this.state.data){
            _form.set(k, this.state.data[k]);
        }
        _req = {
            data: _form as Parameter<ParameterName.uploadCertificateImage>,
            fail: logOut((e:Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: ()=>{
                this.props.cancel(true)
            }
        }
        req(ParameterName.uploadCertificateImage, _req);
    }
    render(){
        return <div style={{background: '#fff', display: 'flex', 
        flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative',
        height: '90%', maxWidth: '500px', width: '90%'}}>
            <PageLoading show={this.state.isLoading} />
            <ImageFile loading={this.state.isLoading} name={'certificate.jpg'} getData={this.getImageData} >
                上传凭证
            </ImageFile>
            <div>
                <CancelButton onClick={()=>this.props.cancel()}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    确认
                </PrimaryButton>
            </div>
        </div>
    }
}