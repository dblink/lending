import * as React from 'react';
import { BankCardInput } from '../../components/input';
import { ApplyContent } from '../../components/menu/applyContent';
import { CancelButton, PrimaryButton } from '../../components/button';
interface ApplyContentListProps {
    onChangeStep: (str: string) => void;
    setType: (str: string) => void;
    dataState: any;
    card: string;
    name: string;
    close: ()=>void;
    confirm: ()=>void;
}

//状态列表
export class ApplyContentList extends React.Component <ApplyContentListProps ,any>{
    constructor(props: ApplyContentListProps){
        super(props);
        this.onChangeStep = this.onChangeStep.bind(this);
        this.close = this.close.bind(this);
    }
    onChangeStep(str: string, name: string){
        this.props.setType(name);
        this.props.onChangeStep(str);
    }
    close(){
        this.props.close();
    }
    render(){
        return <div style={{width: '500px', 
                height: '660px', 
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                background: '#Fff'}}>
                <div>
                    <BankCardInput value={this.props.card} disabled={true} borderNone={true} />
                    <ApplyContent 
                        name={this.props.name}
                        dataState={this.props.dataState}
                        onChangeStep={this.onChangeStep} />
                </div>
                <div style={{display: 'flex'}}>
                    <CancelButton 
                        onClick={()=>this.props.onChangeStep('inputCard')} 
                        style={{
                            borderRadius: '0', 
                            height: '40px',
                            width: '33%'}} >
                        返回
                    </CancelButton>
                    <CancelButton onClick={this.close}
                        style={{borderRadius: '0',
                            height: '40px',
                            width: '34%'
                            }}>
                        关闭
                    </CancelButton>
                    <PrimaryButton style={{borderRadius: '0',
                        height: '40px',
                        width: '33%'}} onClick={this.props.confirm}>
                        确认
                    </PrimaryButton>
                </div>
        </div>
    }
}