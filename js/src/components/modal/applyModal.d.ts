import * as React from 'react';
import { ParameterName, RequestCallback, CallbackSummary } from '../request/setting';
interface Props {
    changeModal: any;
    getList: any;
}
export interface ApplyModalState {
    step: 'inputCard' | 'applyList' | 'applyListDetail' | 'remark';
    dataState: RequestCallback<ParameterName.getBorrowerStatus>;
    card: string;
    type: any;
    showModal: boolean;
    data: any;
}
export declare class ApplyModal extends React.Component<Props, ApplyModalState> {
    constructor(props: Props);
    changeStep(step: 'inputCard' | 'applyList' | 'applyListDetail'): void;
    changeShow(status: boolean, refresh?: boolean, step?: ApplyModalState['step'], data?: any): void;
    setDataState(data: any): void;
    onChangeDataState(name: CallbackSummary[ParameterName.getBorrowerStatus], status: boolean): void;
    setCard(card: string): void;
    getStep(): JSX.Element;
    setType(str: string): void;
    render(): JSX.Element;
}
export {};
