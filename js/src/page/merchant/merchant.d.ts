import * as React from 'react';
import { Parameter, ParameterName, RequestCallback, CallbackSummary } from '../../components/request/setting';
import './merchant.css';
declare type InterfaceName = ParameterName.getMerchantChargeDetail;
declare type MerchantParameter = Parameter<InterfaceName>;
declare type MerchantCallback = RequestCallback<InterfaceName>;
declare type MerchantCallbackSummary = CallbackSummary[InterfaceName];
interface Props {
}
interface State {
    data: MerchantParameter;
    callbackData: MerchantCallback;
    isLoading: boolean;
}
export declare class MerchantDetail extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    getList(): void;
    modal: any;
    list: {
        text: string;
        value: MerchantCallbackSummary;
    }[];
    render(): JSX.Element;
}
export {};
