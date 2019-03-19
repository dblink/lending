import * as React from 'react';
import { ModalTitle } from './title';
import { CancelButton } from '../button';

type RemarkModalProps = {
    text: string;
    cancelModal: ()=>void
}

export class RemarkModal extends React.Component<RemarkModalProps, any>{
    render(){
        return <div style={{padding: '0 50px', width: '500px',
                 height: '400px', background:'#FFF', display: 'flex', flexDirection: 'column'}}> 
                <ModalTitle>备注</ModalTitle>
                <div style={{flex: 'auto'}}>
                    <div>
                        {this.props.text}
                    </div>     
                 </div>
                <div style={{height: '40px'}}>
                    <CancelButton style={{height: '100%'}} onClick={this.props.cancelModal}>关闭</CancelButton>
                </div>
            </div>
    }
}