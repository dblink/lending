import * as React from 'react';
import { Parameter, ParameterName } from '../../components/request/setting';
interface Props {
    location: any;
}
interface State {
    error: Parameter<ParameterName.login>;
    data: Parameter<ParameterName.login>;
    isLoading: boolean;
    serverError: string;
    type: 'normal' | 'other';
}
export declare class Login extends React.Component<Props, State> {
    constructor(props: Props);
    login(): void;
    inputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    getLocation(): any;
    render(): JSX.Element;
}
export {};
