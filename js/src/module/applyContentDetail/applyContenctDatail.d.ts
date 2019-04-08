import * as React from 'react';
import { ApplyModalState } from '../../components/modal/applyModal';
import { CallbackSummary, ParameterName } from '../../components/request/setting';
declare type ApplyContentDetailProps = {
    card: string;
    dataState: any;
    type: CallbackSummary[ParameterName.getBorrowerStatus];
    onChangeStep: (step: ApplyModalState['step']) => void;
    setType: (e: string) => void;
    onChangeDataState: (e: CallbackSummary[ParameterName.getBorrowerStatus], status: boolean) => void;
};
export declare class ApplyContentDetail extends React.Component<ApplyContentDetailProps, any> {
    constructor(props: ApplyContentDetailProps);
    changeStep(step: ApplyModalState['step'], name: string): void;
    getTypePage(): JSX.Element;
    render(): JSX.Element;
}
export {};
