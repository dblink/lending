import * as React from 'react';
interface Props {
    cardNo: string;
    mobile: string;
    bankCode: string;
}
interface State {
    cardNo: string;
    cardName: string;
    mobile: string;
}
export declare class BankCard extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
