import * as React from 'react';
import './input.scss';
interface Props extends React.InputHTMLAttributes<any> {
}
interface BankCardInput extends React.InputHTMLAttributes<any> {
    borderNone?: boolean;
}
interface ApplyInputProps extends React.InputHTMLAttributes<any> {
    text: string;
    error?: string;
    sendMessage?: any;
}
export declare const BankCardInput: (props: BankCardInput) => JSX.Element;
export declare class ApplyInput extends React.Component<ApplyInputProps, any> {
    constructor(props: ApplyInputProps);
    updatestyle: any;
    changeInputStyle(style: React.CSSProperties): void;
    componentWillUpdate(nextProps: ApplyInputProps): void;
    render(): JSX.Element;
}
interface SearchInputProps extends Props {
    text: string;
}
export declare const SearchInput: (props: SearchInputProps) => JSX.Element;
export declare class CalendarInput extends React.Component<SearchInputProps, any> {
    constructor(props: SearchInputProps);
    componentDidMount(): void;
    closeModal(): void;
    showModal(e: React.ChangeEvent<HTMLInputElement>): void;
    componentWillUnmount(): void;
    getCalendar(name: string, value: any): void;
    render(): JSX.Element;
}
export {};
