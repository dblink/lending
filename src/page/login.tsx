import * as React from 'react';
import { ApplyInput } from '../components/input';
import { PrimaryButton } from '../components/button';
import { Parameter, ParameterName, ParameterSummary } from '../components/request/setting';
import { ReqOption, req } from '../components/request';
import * as md5 from 'md5';
import { browserHistory } from '../router';
import { sessionData } from '../components/sessionData/sessionData';
import { load } from '../components/loading/loading';
import { InnerProgress } from '../components/progress/progress';
import { ErrorMessage } from '../components/error/errorMessage';
import { Redirect } from 'react-router';

interface Props {
    location: any;
}

interface State {
    error: Parameter<ParameterName.login>;
    data: Parameter<ParameterName.login>;
    isLoading: boolean;
    serverError: string;
}

export class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: {},
            data: {},
            isLoading: false,
            serverError: '',
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
                let _location = this.getLocation();
                browserHistory.push(_location);
            }
        }
        req(ParameterName.login, _options);
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
        let _location = '/logged/welcome';
        console.log(this.props.location)
        if(this.props.location.state){
            let {from} = this.props.location.state;
            _location = from;
        }
        console.log(_location);
        return _location;
    }
    render() {
        if (sessionData.getData('Token')) return <Redirect to={this.getLocation()} />;
        return <div style={{display: 'flex',background: '#ccc', 
            backgroundImage: 'url(img/loginBg.png)',
            alignItems: 'center',justifyContent: 'center', height: '100vh'}}>
            <div style={{
                textAlign: 'center',
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
                    <ApplyInput text={'商户号'}
                        name='MerchantNo'
                        onChange={this.inputChange}
                        error={this.state.error.MerchantNo}
                        value={this.state.data.MerchantNo} />
                    <ApplyInput text={'账号'}  
                        name='LoginName'
                        onChange={this.inputChange}
                        error={this.state.error.LoginName}
                        value={this.state.data.LoginName}/>
                    <ApplyInput text={'密码'} 
                        name='Password'
                        onChange={this.inputChange}
                        error={this.state.error.Password}
                        value={this.state.data.Password} type='password' />
                    <PrimaryButton type={'button'} style={{height: '40px'}}>
                        {!this.state.isLoading ? '登录' : <InnerProgress height='32px' />}
                    </PrimaryButton>
                </form>
            </div> 
        </div> 
        
       
    }
}