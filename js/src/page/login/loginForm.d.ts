import * as React from 'react';
import { Parameter, ParameterName } from '../../components/request/setting';
interface Props {
    inputChange: (...props: any) => void;
    error: Parameter<ParameterName.login>;
    data: Parameter<ParameterName.login>;
    style?: React.CSSProperties;
}
export declare const NormalLogin: (props: Props) => JSX.Element;
export declare const AreaLogin: (props: Props) => JSX.Element;
export {};
