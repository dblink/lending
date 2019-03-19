import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { ModalTitle } from './title';
import { ApplyInput } from '../input';
import { ParameterName, Parameter, Callback } from '../request/setting';
import { sessionData } from '../sessionData/sessionData';
import { CancelButton, PrimaryButton } from '../button';
import { ReqOption, req } from '../request';
import { logOut } from '../fail/logOut';
import * as md5 from 'md5';
import { InnerProgress } from '../progress/progress';
import { load } from '../loading/loading';

export type ShowModal = {
    showModal: ()=>void;
    closeModal: ()=>void;
}
interface Props {
    modal: ShowModal;
    id ?: string;
}

interface State {
    show: boolean;
}

export class ChangePassword extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false
        };
        this.showModal = this.showModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.props.modal.closeModal = this.cancelModal;
        this.props.modal.showModal = this.showModal;
    }
    showModal(){
        this.setState({
            show: true
        })
    }
    cancelModal(){
        this.setState({
            show: false
        })
    }
    render() {
        return <BaseModal isOpen={this.state.show}>
            <ChangePasswordModule id={this.props.id} cancelModal={this.cancelModal} />
        </BaseModal>
    }
}
type ChangePasswordModuleState= {
    data : Parameter<ParameterName.modifyPassword>;
    isLoading: boolean;
}
type ChangePasswordModuleProps= {
    id: string;
    cancelModal: ()=>void
}
export class ChangePasswordModule extends React.Component<ChangePasswordModuleProps, ChangePasswordModuleState>{
    constructor(props: ChangePasswordModuleProps){
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                UserId: props.id || sessionData.getData('UserInfo').UserId,
                Password: ''
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm.bind(this)) ;
        this.inputChange = load.isLoading.call(this, this.inputChange.bind(this));
    }
    confirm(){
        let _req: ReqOption<ParameterName.modifyPassword>;
        let data = Object.assign({},this.state.data);
        if(!data.Password){
            alert('密码不能为空！');
            this.setState({
                isLoading: false
                //show: false
            })
            return;
        }
        data.Password = md5(data.Password);
        _req = {
            data: data,
            fail: logOut((e:Callback)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                alert('修改成功！')
                this.setState({
                    isLoading: false
                }, this.props.cancelModal)
            }
        }
        req(ParameterName.modifyPassword, _req);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _data = this.state.data,
            _name = e.target.name,
            _value = e.target.value;
        _data[_name as 'Password'] = _value;
        this.setState({
            data: _data
        })
    }
    render(){
        return <div style={{background:'#fff', width: '500px',
                height: '300px',
                display: 'flex',
                flexDirection:'column',
                justifyContent: 'space-between',
            }}>
        <div>
            <ModalTitle>
                修改密码
            </ModalTitle>
            <div style={{padding: '10px 70px'}}>
                <ApplyInput text={'新密码'}
                    name='Password' value={this.state.data.Password}
                    onChange={this.inputChange}
                />
            </div>
        </div>
        <div style={{display: 'flex', height: '40px'}}>
            <CancelButton onClick={this.props.cancelModal}>
                取消
            </CancelButton>
            <PrimaryButton onClick={this.confirm}>
                {!this.state.isLoading ? '确认' : <InnerProgress height ='32px' />}
            </PrimaryButton>
        </div>
        </div>
    }
}