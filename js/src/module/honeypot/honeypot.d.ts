import * as React from 'react';
import { ParameterName, CallbackSummary } from '../../components/request/setting';
import { ApplyModalState } from '../../components/modal/applyModal';
interface Props {
    applyId: string;
    idCardNo: string;
    skip: (str: ApplyModalState['step'], type?: string) => void;
    type: string;
    setDataState: (e: CallbackSummary[ParameterName.getBorrowerStatus], status: boolean) => void;
}
interface State {
    isLoading: boolean;
    isPageLoading: boolean;
}
export declare class Honeypot extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    getStateReq: {
        close: () => void;
    };
    getState(): void;
    getHoneyPotReq: {
        close: () => void;
    };
    getHoneyPot(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
