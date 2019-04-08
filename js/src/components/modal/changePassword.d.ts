import * as React from 'react';
import { ParameterName, Parameter } from '../request/setting';
export declare type ShowModal = {
    showModal: () => void;
    closeModal: () => void;
};
interface Props {
    modal: ShowModal;
    id?: string;
}
interface State {
    show: boolean;
}
export declare class ChangePassword extends React.Component<Props, State> {
    constructor(props: Props);
    showModal(): void;
    cancelModal(): void;
    render(): JSX.Element;
}
declare type ChangePasswordModuleState = {
    data: Parameter<ParameterName.modifyPassword>;
    isLoading: boolean;
};
declare type ChangePasswordModuleProps = {
    id: string;
    cancelModal: () => void;
};
export declare class ChangePasswordModule extends React.Component<ChangePasswordModuleProps, ChangePasswordModuleState> {
    constructor(props: ChangePasswordModuleProps);
    confirm(): void;
    inputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    render(): JSX.Element;
}
export {};
