import * as React from 'react';
import './progress.css';
export declare const Progress: (props: {
    hidden: boolean;
}) => JSX.Element;
declare type InnerProgressProps = {
    hidden?: boolean;
    width?: string;
    height: string;
    color?: string;
    num?: number;
};
export declare const InnerProgress: (props: InnerProgressProps) => JSX.Element;
declare type PageLoadingProps = {
    show: boolean;
    icon?: any;
    hideIcon?: boolean;
    hideContent?: boolean;
};
export declare class PageLoading extends React.Component<PageLoadingProps, any> {
    constructor(props: PageLoadingProps);
    isEnd: boolean;
    componentDidUpdate(nextProps: PageLoadingProps): void;
    end(): void;
    render(): JSX.Element | "";
}
export {};
