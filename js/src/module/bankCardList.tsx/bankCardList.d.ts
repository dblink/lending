import * as React from 'react';
declare type CardProperty = {
    Id?: string;
    Mobile?: string;
    BankCode?: string;
    BankCardNo?: string;
    [index: string]: string;
};
interface Props {
    list: CardProperty[];
    choiceCard: (value: CardProperty) => any;
    editorCard?: (value: CardProperty) => any;
}
interface State {
}
export declare class BankCardList extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element[];
}
export {};
