import { ParameterName, Parameter, Callback } from "./setting";
export interface ReqOption<T extends ParameterName> {
    type?: string;
    data?: Parameter<T>;
    succeed?: (data: Callback, xml?: any) => void;
    fail?: (errorText?: Callback, xml?: any) => void;
    [index: string]: any;
}
export declare const req: (reqName: ParameterName, option: ReqOption<ParameterName>) => {
    close: () => void;
};
