import * as React from 'react';
import { ModalTitle } from './title';
import { ApplyInput } from '../input';
import { BaseModal } from './base/baseModal';
import { CancelButton, PrimaryButton } from '../button';
import { Parameter, ParameterName, CallbackSummary, ParameterSummary, Callback } from '../request/setting';
import { sessionData } from '../sessionData/sessionData';
import { ReqOption, req } from '../request';
import { logOut } from '../fail/logOut';
import { ApplySelect } from '../select';
import { PageLoading, InnerProgress } from '../progress/progress';
import { load } from '../loading/loading';
import * as md5 from 'md5';
import { ErrorMessage } from '../error/errorMessage';
import { ChangePassword, ChangePasswordModule } from './changePassword';

export interface EmployeesModalOperate{
    showModal: (type: State['page'], data ?: any)=>void;
    closeModal: ()=>void;
}
interface Props {
    modalOperate: EmployeesModalOperate,
    getList: ()=>void;
}

interface State {
    show: boolean;
    page: '' | 'add' | 'edit' | 'editPassword';
    data ?: any;
}

export class EmployeesModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            page: '',
            show: false
        };
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.props.modalOperate.showModal = this.showModal;
        this.props.modalOperate.closeModal = this.closeModal;
        this.getDom = this.getDom.bind(this);
    }
    showModal(type: 'add' | 'edit', data: any = ''){
        this.setState({
            page: type,
            show: true,
            data: data
        })
    }
    closeModal(isFresh ?: boolean){
        this.setState({
            show: false,
        },()=>{
            if(typeof isFresh === 'boolean'){
                this.props.getList()
            }
        })
    }
    getDom(){
        switch(this.state.page){
            case 'add' : return <OperateEmployee type='add' closeModal={this.closeModal} />
            case 'edit': return <OperateEmployee employeeId={this.state.data.employeeId} type='edit' closeModal={this.closeModal} />
            case 'editPassword': return <ChangePasswordModule id={this.state.data.employeeId} cancelModal={this.closeModal} />
        }
    }
    render() {
        return <BaseModal isOpen={this.state.show}>
            {this.getDom()}
        </BaseModal>
    }
}
type AddEmployeeProps = {
    closeModal: (isRefresh ?: boolean)=>void;
    type : 'add' | 'edit';
    employeeId ?: string; 
    //editData ?: Parameter<ParameterName.applyAccount>;
}
type AddEmployeeState = {
    data: Parameter<ParameterName.applyAccount>;
    isLoading: boolean;
    isPageLoading: boolean;
    error: string;
    editorData: Parameter<ParameterName.getUserSingleInfo>;
}
class  OperateEmployee extends React.Component<AddEmployeeProps, AddEmployeeState>{
    constructor(props: AddEmployeeProps){
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),  
            },
            isLoading: false,
            isPageLoading: false,
            error: '',
            editorData: {
                Token: sessionData.getData('Token'),
                EmployeeId: this.props.employeeId
            }
        }
        this.confirm = load.run.call(this, this.confirm, 'isLoading') ;
        this.closeModal = load.isLoading.call(this, this.closeModal, 'isLoading');
    }
    data: CommonEmployeeData = {
        getData: ()=>{},
        closeError : ()=>{
            this.setState({
                error: ''
            })
        },
        setData: ()=>{}
    }
    closeModal(isRefresh ?: boolean){
        this.props.closeModal(isRefresh)
    }
    fail = logOut((e: Callback)=>{
        this.setState({
            error: e.ErrMsg,
            isLoading: false
        })
    });
    confirm(){
        let _data = Object.assign({}, this.state.data, this.data.getData()),
            _req: ReqOption<ParameterName.modifyUserInfo | ParameterName.applyAccount>;
        
        
        if(this.props.type === 'add'){
            if(!_data.LoginPass){
                this.fail({ErrMsg: '密码不能为空',Status: 'FAILURE'})
                return;
            }
            _data.LoginPass = md5(_data.LoginPass);
            _data.UserStatus = '1';
            _req = {
                data: _data,
                fail: this.fail,
                succeed: (e)=>{
                    alert('添加成功！');
                    this.setState({
                        isLoading: false
                    }, ()=>this.closeModal(true))
                }
            }
            req(ParameterName.applyAccount, _req);
        }else if(this.props.type === 'edit'){
            _data.Id = this.props.employeeId;
            _req = {
                data: _data,
                fail: logOut((e: Callback)=>{
                    this.setState({
                        error: e.ErrMsg,
                        isLoading: false
                    })
                }),
                succeed: (e)=>{
                    alert('修改成功！');
                    this.setState({
                        isLoading: false
                    }, ()=>this.closeModal(true))
                }
            }
            req(ParameterName.modifyUserInfo, _req);
        }

        
    }
    render(){
        return <div>
             <div style={{background: '#FFF', 
                display: 'flex',
                justifyContent: 'space-between',
                width: '600px',
                height: '90%',
                flexDirection: 'column'}}>   
                <div style={{paddingBottom: '10px',}}>
                    <ModalTitle>
                        {this.props.type === 'edit' ? '编辑' : '添加'}员工
                    </ModalTitle>
                    <ErrorMessage >
                        {this.state.error}
                    </ErrorMessage>
                    <div style={{position: 'relative',padding: '0 70px',
                         height: '500px', overflow: this.state.isPageLoading ? 'hidden' :'auto'}}>
                        <PageLoading show={this.state.isPageLoading} />
                        <CommonEmployee error={this.state.error} employeeId={this.props.employeeId}
                            data={this.data} isShowStatus={this.props.type === 'edit'} />
                    </div>
                </div>
                <div style={{display: 'flex', height: '40px'}}>
                    <CancelButton onClick={()=>this.closeModal()}>
                        取消
                    </CancelButton>
                    <PrimaryButton onClick={this.confirm}>
                        {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'} 
                    </PrimaryButton>
                </div>
            </div>
        </div>
    }
}
type CommonEmployeeData = {
    getData: ()=> any;
    closeError: ()=>any;
    setData: (data: CommonEmployeeState['data'])=> void;
}
type CommonEmployeeProps = {
    employeeId: string;
    data: CommonEmployeeData;
    isShowStatus: boolean;
    error: string;
}
type CommonEmployeeState = {
    data: Parameter<ParameterName.modifyUserInfo>
    Store: {text: '',value: ''}[];
    Role: {text: '', value: ''}[];
    ParentId: {text: '', value: ''}[];
    isLoading: boolean;
}
class CommonEmployee extends React.Component<CommonEmployeeProps, CommonEmployeeState>{
    constructor(props: CommonEmployeeProps){
        super(props);
        let _data: CommonEmployeeState['data'] = {
            LoginName: '',
            LoginPass: '',
            RealName: '',
            RoleId: '',
            SecureMobile: '',
            ParentId: '',
            StoreId: '',
            UserStatus: '',
        }
        this.state = {
            data: _data,
            Store: [],
            Role : [],
            ParentId: [],
            isLoading: true,
        }
        this.props.data.getData = ()=>this.state.data;
        this.props.data.setData = 
        this.getRole = this.getRole.bind(this);
        this.getStoreId = this.getStoreId.bind(this);
        this.getParentId = this.getParentId.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.setData = this.setData.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    componentDidMount(){
        this.getStoreId()
    }
    setData(data: CommonEmployeeState['data']){
        let _data = this.state.data,
            k : ParameterSummary[ParameterName.modifyUserInfo];
        for(k in _data){
            _data[k] = data[k];
        }
        this.setState({
            data: _data
        })
    }
    getRole(){
        let _req:ReqOption<ParameterName.getRoleItems> = {
            data: {
                Token: sessionData.getData('Token')
            },
            fail: logOut((e:Callback)=>{
                alert(e.Value);
                this.setState({
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                let _list;
                _list = e.Value.map((val: any)=>{
                    return {
                        text: val.RoleName,
                        value: val.Id
                    }
                });
                if(this.props.isShowStatus){
                    this.setState({
                        Role: _list,
                        //isLoading: false
                    }, this.getUserInfo)
                }else{
                    this.setState({
                        Role: _list,
                        isLoading: false
                    })
                }
                
            }
        }
        req(ParameterName.getRoleItems, _req);
    }
    getParentId(){
        let _req: ReqOption<ParameterName.getUserInfo>;
        _req = {
            data: {
                Token: sessionData.getData('Token')
            },
            fail: logOut((e:Callback)=>{
                alert(e.ErrMsg)
                this.setState({
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                let _list;
                _list = e.Value.map((val: any)=>{
                    return {
                        text: val.RealName,
                        value: val.Id
                    }
                }); 
                this.setState({
                    ParentId: _list
                }, this.getRole)
            }
        }
        req(ParameterName.getUserInfo, _req);
    }
    getStoreId(){
        let _req:ReqOption<ParameterName.getStore> = {
            data: {
                Token: sessionData.getData('Token')
            },
            fail: logOut((e:Callback)=>{
                alert(e.Value);
                this.setState({
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                let _list;
                _list = e.Value.map((val: any)=>{
                    return {
                        text: val.StoreName,
                        value: val.Id
                    }
                });
                this.setState({
                    Store: _list
                }, this.getParentId)
            }
        }
        req(ParameterName.getStore, _req);
    }
    getUserInfo(){
        let _req: ReqOption<ParameterName.getUserSingleInfo>;
        _req = {
            data: {
                EmployeeId: this.props.employeeId,
                Token: sessionData.getData('Token')
            },
            fail: logOut((e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                let _data = this.state.data,
                k : ParameterSummary[ParameterName.modifyUserInfo];
                for(k in _data){
                    _data[k] = e.Value[k];
                }
                console.log(_data);
                this.setState({
                    data: _data,
                    isLoading: false
                })
            }
        }
        req(ParameterName.getUserSingleInfo, _req);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        let _name = e.target.name,
            _value = e.target.value,
            _data = this.state.data;
        _data[_name as 'RealName'] = _value;
        this.setState({
            data: _data
        }, ()=>{
            if(this.props.error){
                this.props.data.closeError()
            }
        })
    }
    render(){
        return this.props.isShowStatus ? [
            <ApplySelect 
                text= '状态'
                name = 'UserStatus'
                key = {0}
                list = {[{
                    value: '0',
                    text: '未激活'
                },{
                    value: '1',
                    text: '正常'
                },{
                    value: '2',
                    text: '冻结'
                }]}
                onChange={this.inputChange}
                value={this.state.data.UserStatus}
            />,
            <ApplyInput text='真实姓名'
                name = 'RealName'
                key = {5} onChange={this.inputChange}
                value={this.state.data.RealName}
            />,
            <ApplySelect text='角色' 
                name = 'RoleId'
                key = {7} onChange={this.inputChange}
                list = {this.state.Role}
                value = {this.state.data.RoleId}
            />,
            <ApplySelect text='上级'
                name = 'ParentId'
                key = {8} onChange={this.inputChange}
                list = {this.state.ParentId}
                value={this.state.data.ParentId}
            />,
            <PageLoading key={9} show={this.state.isLoading} />
        ] : [
            <ApplyInput text='登陆账号'
                name = {'LoginName'}
                key = {1} onChange={this.inputChange}
                value={this.state.data.LoginName}
                />,
            <ApplyInput text='登陆密码' 
                name  = {'LoginPass'}
                key = {2} onChange={this.inputChange}
                value = {this.state.data.LoginPass}
                />,
            <ApplyInput text='手机号'
                name  = 'SecureMobile'
                key = {3} onChange={this.inputChange}
                value = {this.state.data.SecureMobile}
                />,
            <ApplyInput text='真实姓名'
                name = 'RealName'
                key = {5} onChange={this.inputChange}
                value={this.state.data.RealName}
            />,
            <ApplySelect text='门店' 
                name  = 'StoreId'
                key = {6} onChange={this.inputChange}
                list = {this.state.Store}
                value = {this.state.data.StoreId}
            />,
            <ApplySelect text='角色' 
                name = 'RoleId'
                key = {7} onChange={this.inputChange}
                list = {this.state.Role}
                value = {this.state.data.RoleId}
            />,
            <ApplySelect text='上级'
                name = 'ParentId'
                key = {8} onChange={this.inputChange}
                list = {this.state.ParentId}
                value={this.state.data.ParentId}
            />,
            <PageLoading key={9} show={this.state.isLoading} />
        ]
    }
}
