import * as React from 'react';
import { ParameterName, Parameter, RequestCallback, PageInfo } from '../../components/request/setting';
declare namespace RepayConfirmSpace {
    type InterfaceName = ParameterName.selectRepayDetail;
    type GetListParameter = Parameter<InterfaceName>;
    type InterfaceCallback = RequestCallback<InterfaceName>;
    interface Props {
    }
    interface State {
        data: GetListParameter;
        callbackData: InterfaceCallback[];
        pageInfo: PageInfo;
        isLoading: boolean;
        isPageLoading: boolean;
    }
    class RepayConfirm extends React.Component<Props, State> {
        constructor(props: Props);
        componentDidMount(): void;
        changePage(num: any): void;
        modal: any;
        getList(): void;
        render(): JSX.Element;
    }
}
export declare const LocalRepayConfirm: typeof RepayConfirmSpace.RepayConfirm;
export {};
