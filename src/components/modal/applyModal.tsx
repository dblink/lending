import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { req, ReqOption } from '../request';
import { ParameterName, RequestCallback, CallbackSummary } from '../request/setting';
import { ApplyContentDetail } from '../../module/applyContentDetail/applyContenctDatail';
import { ApplyContentList } from '../../module/applyContentList/applyContentList';
import { InputCard } from '../../module/inputCard/inputCard';
import { sessionData } from '../sessionData/sessionData';
import { PageLoading } from '../progress/progress';

interface Props {
    changeModal : any;
    getList : any;
}

export interface ApplyModalState {
    step: 'inputCard' | 'applyList' | 'applyListDetail';
    dataState: RequestCallback<ParameterName.getBorrowerStatus>;
    card: string;
    type: any;
    showModal: boolean;
}

export class ApplyModal extends React.Component<Props, ApplyModalState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            step: 'inputCard',
            dataState: {},
            card: '',
            type: '',
            showModal: false,
        };
        this.changeStep = this.changeStep.bind(this);
        this.setDataState = this.setDataState.bind(this);
        this.onChangeDataState = this.onChangeDataState.bind(this);
        this.setCard = this.setCard.bind(this);
        this.setType = this.setType.bind(this);
        this.changeShow = this.changeShow.bind(this);
        this.props.changeModal.show = this.changeShow;
    }
    changeStep(step: 'inputCard' | 'applyList' | 'applyListDetail'){
        this.setState({
            step: step
        })
    }
    changeShow(status: boolean, refresh ?: boolean){
        this.setState({
            showModal: status,
            step: 'inputCard',
            dataState: {},
            card: '',
            type: '',
        },()=>{
            if(refresh) this.props.getList()
        })
    }
    //设置数据状态
    setDataState(data: any){
        this.setState({
            dataState: data
        })
    }
    onChangeDataState(name: CallbackSummary[ParameterName.getBorrowerStatus], status: boolean){
        let _data = this.state.dataState;
        _data[name] = status;
        this.setState({
            dataState: _data
        })
    }
    setCard(card: string){
        this.setState({
            card: card
        })
    }
    getStep(){
        switch(this.state.step){
            case 'inputCard':{
                return <InputCard
                setDataState={this.setDataState}
                setCard={this.setCard}
                close={()=>this.changeShow(false)}
                onChangeStep={this.changeStep} />
            }
            case 'applyList': {
                return <ApplyContentList
                    dataState={this.state.dataState}
                    card={this.state.card}
                    setType={this.setType}
                    changeShow={this.changeShow}
                    name = {this.state.type}
                    close={()=>this.changeShow(false)}
                    onChangeStep={this.changeStep}/>
            }
            case 'applyListDetail': {
                return <ApplyContentDetail
                    card= {this.state.card}
                    dataState={this.state.dataState}
                    setType={this.setType}
                    type={this.state.type}
                    onChangeDataState={this.onChangeDataState}
                    onChangeStep={this.changeStep} />
            }
        }
    }
    setType(str: string){
        this.setState({
            type: str
        });
    }
    render() {
        return <BaseModal isOpen={this.state.showModal}>
                {this.getStep()}
        </BaseModal>
    }
} 







