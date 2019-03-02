import * as React from 'react';
import { ApplyInput } from '../components/input';
import { PrimaryButton } from '../components/button';
import { Parameter, ParameterName, ParameterSummary } from '../components/request/setting';
import { ReqOption, req } from '../components/request';
import * as md5 from 'md5';
import { browserHistory } from '../router';
import { sessionData } from '../components/sessionData/sessionData';

interface Props {}

interface State {
    error: Parameter<ParameterName.login>;
    data: Parameter<ParameterName.login>
}

export class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: {},
            data: {}
        };
        this.inputChange = this.inputChange.bind(this);
        this.login = this.login.bind(this);
    }
    login(){
        let _data = this.state.data;
        _data.Password = _data.Password ? md5(_data.Password) : '';
        let _options: ReqOption<ParameterName.login> = {
            data: this.state.data,
            fail: (e)=>{
                if(e.Value){
                    let _error = this.state.error;
                    _error[e.Value as 'LoginName'] = e.ErrMsg;
                    this.setState({
                        error: _error
                    })
                }else{
                    alert(e.ErrMsg);
                }
            },
            succeed: (e)=>{
                sessionData.setData(e.Value);
                browserHistory.push('/logged/welcome');
            }
        }
        req(ParameterName.login, _options);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
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
            error: _error
        })
    }
    render() {
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
                        登录
                    </PrimaryButton>
                </form>
            </div> 
        </div> 
        
       
    }
}