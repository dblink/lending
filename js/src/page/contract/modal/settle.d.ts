import * as React from 'react';
import { Parameter, ParameterName } from "../../../components/request/setting";
declare type SettleProps = {
    contractId: string;
    type: 'local' | 'online';
    cancel: (bool?: boolean) => void;
};
declare type SettleState = {
    data: Parameter<ParameterName.applyRepayOfflineClearing>;
    isLoading: boolean;
};
export declare class Settle extends React.Component<SettleProps, SettleState> {
    constructor(props: SettleProps);
    inputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    confirm(): void;
    render(): JSX.Element;
}
export {};
