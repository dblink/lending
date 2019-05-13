import * as React from 'react';
import { Parameter, ParameterName } from '../../components/request/setting';
interface Props {
}
interface State {
    type: 'user' | 'areaUser';
    data: Parameter<ParameterName.login>;
    error: Parameter<ParameterName.login>;
    isLoading: boolean;
}
export declare class LoginMobile extends React.Component<Props, State> {
    constructor(props: Props);
    changePage(type: State['type']): void;
    getButtonList(): JSX.Element[];
    inputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    confirm(): void;
    render(): JSX.Element;
}
export {};
