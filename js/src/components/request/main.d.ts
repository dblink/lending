import { Callback, ParameterName, Parameter } from "./setting";
export interface OptionType<T extends ParameterName> {
    type?: string;
    dataType?: string;
    data?: Parameter<T>;
    url?: string;
    succeed?: (data: any, xml?: any) => void;
    fail?: (errorText?: Callback, xml?: any) => void;
    error?: Parameter<T>;
    [index: string]: any;
}
export interface ErrorCallback {
    Status: 'FAILURE' | 'SUCCESS';
    ErrMsg: any;
    Value: any;
}
declare class AjaxRequest {
    options: OptionType<ParameterName>;
    private xhr;
    sendMessage(): void;
    closeXHR(): void;
    callBack(): void;
}
declare class Ajax extends AjaxRequest {
    options: OptionType<ParameterName>;
    type: ParameterName;
    date: Date;
    startTime: number;
    closeArray: any[];
    action: (options: any) => void;
    /**
     * 获取options.data数据
     * @param data options.data
     */
    getData(data: any): (name: string) => any;
    /**
     * 设置options.data数据
     * @param data options.data
     */
    setData(data: any): (name: string, value: string) => void;
    errorDetection(): void;
    _main(): void;
    main(): void;
    then(func: any): void;
    private closeFunc;
    close(): void;
    failure(func: any): (data: Callback<any>) => void;
    timer: any;
    succeed(func: any): (data: Callback<any>) => void;
}
export declare function main(): (type: ParameterName, options: OptionType<ParameterName>) => Ajax;
export {};
