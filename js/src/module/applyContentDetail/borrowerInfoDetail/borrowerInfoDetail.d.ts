import * as React from 'react';
import { ParameterName, Parameter } from "../../../components/request/setting";
declare type BorrowerInfoDetailState = {
    type: 'contactInfo' | 'otherInfo' | 'companyInfo';
    data?: Parameter<ParameterName.addBorrowerDetailInfo>;
    isLoading: boolean;
    pageLoading: boolean;
};
declare type BorrowerInfoDetailProps = {
    name: string;
    borrowerId: string;
    isExit: boolean;
    onChangeStep: (str: string) => void;
    onChangeDataState: (str: string, status: boolean) => void;
};
export declare class BorrowerInfoDetail extends React.Component<BorrowerInfoDetailProps, BorrowerInfoDetailState> {
    constructor(props: any);
    changeType(type: BorrowerInfoDetailState['type']): void;
    setData: {
        contactInfo?: {
            run?: any;
            setData?: any;
        };
        companyInfo?: {
            run?: any;
            setData?: any;
        };
        otherInfo?: {
            run?: any;
            setData?: any;
        };
    };
    request: any;
    getDom(): JSX.Element;
    componentDidMount(): void;
    confirm(): void;
    getInfo(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
