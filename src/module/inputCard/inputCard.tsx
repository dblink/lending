import * as React from 'react';
import { load } from '../../components/loading/loading';
import { ReqOption, req } from '../../components/request';
import { ParameterName } from '../../components/request/setting';
import { BankCardInput } from '../../components/input';
import { PrimaryButton, CancelButton } from '../../components/button';
import { InnerProgress } from '../../components/progress/progress';
import { sessionData } from '../../components/sessionData/sessionData';
import { ErrorMessage } from '../../components/error/errorMessage';
interface InputCardProps {
    onChangeStep: (str: string)=>void;
    setDataState: (data: any) =>void;
    setCard: (str: string) => void;
    close: ()=>void;
}
interface InputCardState {
    data: {
        card: string;
    },
    isLoading: boolean;
    error: string;
}

//输入身份证模块
export class InputCard extends React.Component<InputCardProps, InputCardState> {
    constructor(props: InputCardProps) {
        super(props);
        this.state = {
            data: {
                card: '',
            },
            isLoading: false,
            error: ''
        };
        this.changeInput = this.changeInput.bind(this);
        this.searchCard = load.run.call(this, this.searchCard);
    }
    changeInput(name: 'card', value: any){
        let _data = this.state.data;
        _data[name] = value;
        this.setState({
            error: '',
            data: _data
        })
    }
    searchCard(){
        let _options:ReqOption<ParameterName.getBorrowerStatus> = {
            data: {
                IDCardNo: this.state.data.card,
                Token: sessionData.getData('Token')
            },
            fail: (error)=>{
                this.setState({
                    error: error.ErrMsg,
                    isLoading: false
                })
            },
            succeed: (callBack)=>{
                console.log(callBack.Value);
                this.setState({
                    isLoading: false
                });
                //设置状态;
                this.props.setDataState(callBack.Value);
                this.props.setCard(this.state.data.card); 
                //跳转
                this.props.onChangeStep('applyList');
            }
        }
        
        req(ParameterName.getBorrowerStatus, _options);
    }
    render() {
        return <div
            style={{
                background: '#fff', padding: '35px', width: '330px'
            }}>           
            <ErrorMessage > 
                {this.state.error}    
            </ErrorMessage>
            <BankCardInput
                placeholder='请输入身份证' name='card' 
                value={this.state.data.card}
                onChange={(e)=>this.changeInput('card', e.target.value)} />
            <PrimaryButton 
                style={{height: '48px',marginTop: '20px'}}
                onClick={this.searchCard}>
                {!this.state.isLoading ? '查询身份证' :  
                <InnerProgress hidden={false} height={'32px'} />} 
            </PrimaryButton>
            <CancelButton
                onClick={this.props.close}
                style={{height: '48px',marginTop: '20px'}}>
                关闭
            </CancelButton>
        </div>
    }
}