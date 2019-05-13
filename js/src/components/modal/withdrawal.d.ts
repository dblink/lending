import * as React from 'react';
import { ParameterName, Parameter } from '../request/setting';
interface Props {
    modal: {
        show: any;
        cancel: any;
    };
    getInfo: () => void;
}
interface State {
    data: Parameter<ParameterName.applyWithdraw>;
    type: 'bankList' | 'withdrawal' | 'detail' | 'transform';
    productType?: any;
    isOpen: boolean;
    isLoading: boolean;
}
export declare class Withdrawal extends React.Component<Props, State> {
    constructor(props: Props);
    cancel(bool?: boolean): void;
    getId(id: string): void;
    showModal(page?: 'bankList' | 'transform' | 'withdrawal' | 'detail', productType?: '1' | '2'): void;
    inputChange(e: React.ChangeEvent<HTMLInputElement>): void;
    confirm(): void;
    getDom(): JSX.Element;
    render(): JSX.Element;
}
export {};
