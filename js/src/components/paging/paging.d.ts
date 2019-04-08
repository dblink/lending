import * as React from 'react';
import './paging.css';
interface Props {
    changePage: (index: number) => void;
    index: string;
    lastPage: string;
    totalSize: number;
    isLoading?: boolean;
}
interface State {
}
export declare class Paging extends React.Component<Props, State> {
    constructor(props: Props);
    changePage(num: number): void;
    render(): JSX.Element;
}
export {};
