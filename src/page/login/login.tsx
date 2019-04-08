import * as React from 'react';
import { ApplyInput } from '../../components/input';
import { PrimaryButton, HrefButton } from '../../components/button';
import { Parameter, ParameterName, ParameterSummary } from '../../components/request/setting';
import { ReqOption, req } from '../../components/request';
import * as md5 from 'md5';
import { browserHistory } from '../../router';
import { sessionData } from '../../components/sessionData/sessionData';
import { load } from '../../components/loading/loading';
import { InnerProgress } from '../../components/progress/progress';
import { ErrorMessage } from '../../components/error/errorMessage';
import { Redirect } from 'react-router';
import { NormalLogin, AreaLogin } from './loginForm';

interface Props {
    location: any;
}

interface State {
    error: Parameter<ParameterName.login>;
    data: Parameter<ParameterName.login>;
    isLoading: boolean;
    serverError: string;
    type: 'normal' | 'other'
}

export class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: {},
            data: {},
            isLoading: false,
            serverError: '',
            type: 'normal'
        };
        this.inputChange = this.inputChange.bind(this);
        this.login = this.login.bind(this);
        this.login  = load.run.call(this, this.login);
        this.getLocation = this.getLocation.bind(this);
    }
    login(){
        let _data = Object.assign({},this.state.data);
        _data.Password = _data.Password ? md5(_data.Password) : '';
        let _options: ReqOption<ParameterName.login> = {
            data: _data,
            fail: (e)=>{
                let _error = this.state.error,
                    _serverError = this.state.serverError;
                if(e.Value){
                    _error[e.Value as 'LoginName'] = e.ErrMsg;
                }else{
                   _serverError = e.ErrMsg;
                }
                this.setState({
                    isLoading: false,
                    error: _error,
                    serverError: _serverError
                })
            },
            succeed: (e)=>{
                sessionData.setData(e.Value);
                console.log(sessionData.getData('MerchantItem'))
                let _location = this.getLocation();
                browserHistory.push(_location);
            }
        }
        if(this.state.type === 'normal'){
            req(ParameterName.login, _options);
        }else{
            req(ParameterName.regionalManagerLogin, _options)
        }
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        if(this.state.isLoading){
            return;
        }
        let _name: ParameterSummary['login'] = e.target.name as 'LoginName';
        let _value = e.target.value;
        let _data =this.state.data;
        let _error = this.state.error;
        if(_error[_name]){
            _error[_name] = '';
        }
        _data[_name] = _value;
        this.setState({
            data: _data,
            error: _error,
            serverError: ''
        })
    }
    getLocation(){
        let _location,
            _menuList = sessionData.getData('UserMenuItems');
        if(typeof _menuList === 'object'){
            _location = _menuList[0].Url || _menuList[0].Items[0].Url;
            if(this.props.location.state){
                let {from} = this.props.location.state;
                for(let menu = 0; menu < _menuList.length; menu++){
                    //console.log(_menuList[menu].url);
                    if(typeof _menuList[menu].url === 'undefined' 
                        || _menuList[menu].url === null){
                        let _list = _menuList[menu].Items;
                        for(let innerMenu = 0;innerMenu<_list.length; innerMenu++){
                            if(_list[innerMenu].Url === from){
                                _location = from;
                            }
                        }
                    }else{
                        if(_menuList[menu].Url === from){
                            _location = from;
                        }
                    }
                }
            }
        }else{
            alert('未配置菜单')
            _location = '/';
        }
        return _location;
    }
    
    render() {
        if (sessionData.getData('Token')) return <Redirect to={this.getLocation()} />;
        return <div style={{display: 'flex',background: '#ccc', 
            backgroundImage: 'url(img/loginBg.jpg)',
            alignItems: 'center',justifyContent: 'center', height: '100vh'}}>
            <div style={{
                textAlign: 'center', position: 'relative',
                padding: '0 59px 79px', background: '#fff', 
                height: '60%', width: '500px'}}>
                <div style={{display: 'inline-block', 
                    width: '100px',
                    marginTop: '-50px',
                    padding: '20px', borderRadius: '50%', background: '#Fff'}}>
                    <img src='img/logo.png' style={{width: '100%'}} />
                </div>
                <ErrorMessage>
                    {this.state.serverError}
                </ErrorMessage>
                <form style={{height: '100%', display: 'flex', 
                    textAlign:'left',
                    justifyContent: 'space-around', flexDirection:'column'}}
                    onSubmit={(e)=>{e.preventDefault(); this.login()}}
                    >
                    <div style={{
                        position:'absolute',
                        top: '30px',
                        fontSize: '14px',
                        right: '30px'
                    }}>
                        {
                            this.state.type === 'normal' 
                                ?<HrefButton style={{display: 'inline'}} onClick={()=>{
                                    this.setState({
                                        type: 'other',
                                        data: {},
                                        error: {}
                                    })
                                }}>
                                    区域总登录
                                </HrefButton>
                                :<HrefButton style={{display: 'inline'}} onClick={()=>{
                                    this.setState({
                                        type: 'normal'
                                    })
                                }}>
                                    普通登录
                                </HrefButton>
                        }
                        
                    </div>
                    
                    {
                        this.state.type === 'normal' 
                        ? <NormalLogin data={this.state.data} inputChange={this.inputChange} error={this.state.error} />
                        : <AreaLogin data={this.state.data} inputChange={this.inputChange} error={this.state.error} />
                    }
                    <PrimaryButton type={'button'} style={{height: '40px'}}>
                        {!this.state.isLoading ? '登录' : <InnerProgress height='32px' />}
                    </PrimaryButton>

                    <div style={{
                        left: '0',
                        position: 'absolute', bottom: '10px',width: '100%',
                        fontSize: '14px', color: '#ccc', textAlign:'center'}}>
                        苏ICP备18048568号-1
                    </div>
                </form>
            </div> 
        </div> 
    }
}