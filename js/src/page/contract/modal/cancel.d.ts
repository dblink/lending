import * as React from 'react';
import { Parameter, ParameterName } from '../../../components/request/setting';
declare type CancelProps = {
    contractId: string;
    cancel: (bool?: boolean) => void;
};
declare type CancelState = {
    data: Parameter<ParameterName.cancelContract>;
    isLoading: boolean;
};
export declare class Cancel extends React.Component<CancelProps, CancelState> {
    constructor(props: any);
    confirm(): void;
    cancel(): void;
    render(): JSX.Element;
}
export {};
