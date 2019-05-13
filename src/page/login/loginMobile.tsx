import * as React from 'react';
import { LoginLogo } from './logo';
import { HrefButton, PrimaryButton } from '../../components/button';
import { NormalLogin, AreaLogin } from './loginForm';
import { Parameter, ParameterName, ParameterSummary } from '../../components/request/setting';
import { config } from '../../components/config';
import { ReqOption, req } from '../../components/request';
import * as md5 from 'md5';
import { browserHistory } from '../../router';
import { load } from '../../components/loading/loading';
import { InnerProgress } from '../../components/progress/progress';
import { sessionData } from '../../components/sessionData/sessionData';
const img = require('../../img/mobileBanner.jpg');

interface Props {}

interface State {
    type: 'user' | 'areaUser' ;
    data: Parameter<ParameterName.login>;
    error: Parameter<ParameterName.login>;
    isLoading: boolean;
}

export class LoginMobile extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            type: 'user',
            data: {},
            error: {},
            isLoading: false
        };
        this.getButtonList = this.getButtonList.bind(this);
        this.inputChange =  load.isLoading.call(this, this.inputChange);
        this.changePage = load.isLoading.call(this, this.changePage);
        this.confirm = load.run.call(this, this.confirm);
    }
    changePage(type: State['type']){
        this.setState({
            type: type,
            data: {}
        })
    }
    getButtonList(){
        switch(this.state.type){
            case 'user': return [
                <span style={{fontWeight: 'bold', lineHeight: '40px',
                    textAlign: 'center', width: '100px'}}>
                    普通登录
                </span>
                ,<HrefButton onTouchEnd={()=>this.changePage('areaUser')}>区域总登录</HrefButton>];
            case 'areaUser': return [
                <span style={{fontWeight: 'bold', lineHeight: '40px',
                     textAlign: 'center', width: '100px'}}>
                    区域总登录
                </span>
                ,<HrefButton onTouchEnd={()=>this.changePage('user')}>
                    普通登录
                </HrefButton>];
        }
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _value = e.target.value,
            _data = this.state.data,
            _name = e.target.name;
        _data[_name as ParameterSummary[ParameterName.login]] = _value;
        this.setState({
            data: _data
        })
    }
    confirm(){
        let _data = Object.assign({},this.state.data);
        _data.Password = _data.Password ? md5(_data.Password) : '';
        let _options: ReqOption<ParameterName.login> = {
            data: _data,
            fail: (e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            },
            succeed: (e)=>{
                sessionData.setData(e.Value);
                browserHistory.push('/Mobile/application');
            }
        }
        if(this.state.type === 'user'){
            req(ParameterName.login, _options);
        }else{
            req(ParameterName.regionalManagerLogin, _options)
        }
    }
    render() {
        return <div style={{height: config.HEIGHT + 'px', position: 'relative', overflow: 'hidden'}}>
            <div style={{height: '40%', width:'100%', overflow: 'hidden',
                    display: 'flex',justifyContent: 'center', background:'#a9d4fd'}}>
                <img src={img} style={{height: '100%'}} />
            </div>
            <div style={{height: '65%', position: 'relative', top: '-5%',
                padding: '0 20px 20px', display: 'flex', flexDirection: 'column',
                justifyContent:'space-between',borderTopLeftRadius: '12px', borderTopRightRadius: '12px', color: '#333', background: '#FFF'}}>
                <LoginLogo style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '20px',
                    padding: '10px',
                    borderRadius: '10px',
                    boxShadow:'0px 3px 6px rgba(39,149,253,0.3)',
                    background: '#FFF', 
                    width: '80px', 
                    height: '80px'}} />
                <div style={{textAlign: 'right', height: '40px',
                    display: 'flex', justifyContent: 'flex-end'}}>
                    {this.getButtonList()}
                </div>
                {
                    this.state.type === 'user'
                    ? <NormalLogin style={{display: 'flex', 
                        height: '60%',
                        flexDirection: 'column',
                        background: '#FFF',
                        justifyContent: 'space-around'}} 
                        data={this.state.data} inputChange={this.inputChange} error={this.state.error} />
                    : <AreaLogin style={{display: 'flex', 
                        height: '60%',
                        flexDirection: 'column',
                        background: '#FFF',
                        justifyContent: 'space-around'}} 
                        data={this.state.data} inputChange={this.inputChange} error={this.state.error} />
                }
                <PrimaryButton style={{height: '48px'}} onClick={this.confirm}>
                    { this.state.isLoading ? <InnerProgress height='32px' /> : '登录' } 
                </PrimaryButton>
            </div>
        </div>
    }
}