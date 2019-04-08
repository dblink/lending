import * as React from 'react';
import { CancelButton, PrimaryButton } from '../../../components/button';
import { InnerProgress, PageLoading } from '../../../components/progress/progress';
import { ApplyInput } from '../../../components/input';
import { req, ReqOption } from '../../../components/request';
import { ParameterName, ParameterSummary, Parameter } from '../../../components/request/setting';
import { load } from '../../../components/loading/loading';
import { ModalTitle } from '../../../components/modal/title';
import { sessionData } from '../../../components/sessionData/sessionData';
import { logOut } from '../../../components/fail/logOut';
type BorrowerInfoProps = {
    card: string;
    userId:string;
    name: string;
    isExit: boolean;
    onChangeStep: (str: string, type: string) => void;
    onChangeDataState: (str: string, status: boolean) => void;
}

type BorrowerInfoState = {
    data: Parameter<ParameterName.updateBorrowPersonInfo>;
    isLoading: boolean;
    error: string;
    pageLoading: boolean;
}

//借款人信息
export class BorrowerInfo extends React.Component <BorrowerInfoProps, BorrowerInfoState> {
    constructor(props: any){
        super(props);
        this.state = {
            data: {},
            isLoading: false,
            error: '',
            pageLoading: false
        }
        this.inputChange = this.inputChange.bind(this);
        this.confirm = load.run.call(this, this.confirm);
        this.getInfo = load.run.call(this, this.getInfo, 'pageLoading');
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
                Token: sessionData.getData('Token')
            },
            fail: (e)=>{
                alert(e.ErrMsg)
            },
            succeed: (e)=>{
                this.setState({
                    data: e.Value,
                    pageLoading: false
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
        _data.Token = sessionData.getData('Token');
        _data.Id = this.props.userId;
        let _options: ReqOption<ParameterName.updateBorrowPersonInfo> = {
            data: _data,
            fail: logOut((e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false,
                    error: e.ErrMsg
                })
            }),
            succeed: ()=>{
                this.props.onChangeStep('applyList', '');
                this.props.onChangeDataState(this.props.name, true)
            }
        }
        req(ParameterName.updateBorrowPersonInfo, _options)
    }
    render(){
        return <div style={{display: 'flex', position: 'relative',
                height: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
            <PageLoading show={this.state.pageLoading} />
            <div style={{width: '360px', margin: '0 auto'}}>
                <ModalTitle >
                    借款人信息
                </ModalTitle>
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
