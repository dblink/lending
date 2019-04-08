import * as React from 'react';
declare type PageType = 'settle' | 'repay' | '';
declare type PageData = {
    id?: string;
};
interface Props {
    modal: {
        showModal: (type: PageType, data: PageData) => void;
        closeModal: (isRefresh: boolean) => void;
    };
    getList: () => void;
}
interface State {
    isOpen: boolean;
    type: PageType;
    data?: PageData;
}
export declare class LocalConfirm extends React.Component<Props, State> {
    constructor(props: Props);
    cancel(isRefresh?: boolean): void;
    show(type: PageType, data: PageData): void;
    render(): JSX.Element;
}
export {};
