import * as React from 'react';
import { Parameter, ParameterName, Callback } from '../request/setting';
export declare class Input {
    state: any;
    setState: any;
    inputChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
interface Props {
    status: 'Approved' | 'Denied';
    isShowModal: boolean;
    cancelModal: (refresh?: boolean) => void;
    id: string;
}
interface State {
    data: Parameter<ParameterName.auditLoanApply>;
    error?: any;
    isLoading: boolean;
}
export declare class AuditModal extends React.Component<Props, State> {
    constructor(props: Props);
    clearError(): void;
    getData: {
        run: any;
    };
    inputChange: any;
    getDom(): JSX.Element;
    cancelModal(): void;
    confirm(): void;
    fail: (e: Callback<any>) => void;
    render(): JSX.Element;
}
export {};
