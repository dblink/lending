import * as React from 'react';
interface ApplyContentListProps {
    onChangeStep: (str: string) => void;
    setType: (str: string) => void;
    dataState: any;
    card: string;
    name: string;
    close: () => void;
    changeShow: any;
}
interface ApplyContentListState {
    isLoading: boolean;
}
export declare class ApplyContentList extends React.Component<ApplyContentListProps, ApplyContentListState> {
    constructor(props: ApplyContentListProps);
    onChangeStep(str: string, name: string): void;
    close(): void;
    confirm(): void;
    render(): JSX.Element;
}
export {};
