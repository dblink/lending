import * as React from 'react';
interface Props {
    ContractId: string;
    closeModal: any;
}
interface State {
    page: 'list' | 'showImage' | 'showRemark' | 'postImage' | 'addRemark';
    data: any;
    recordId: string;
}
export declare class PostLoan extends React.Component<Props, State> {
    constructor(props: Props);
    changePage(page: State['page'], recordId?: string, data?: string): void;
    getDom(): JSX.Element;
    render(): JSX.Element;
}
export {};
