import * as React from 'react';
import './button.scss';
declare type Button = React.HTMLAttributes<HTMLSpanElement>;
interface ButtonProps extends Button {
    type?: 'button';
}
interface TabButtonProps extends Button {
    clicked?: boolean;
}
interface PagingButtonProps extends Button {
    intro: string;
}
interface TimerButtonProps extends Button {
    time?: number | string;
    onClick: any;
}
export declare const PrimaryButton: (props: ButtonProps) => JSX.Element;
export declare const CancelButton: (props: ButtonProps) => JSX.Element;
export declare const TabButton: (props: TabButtonProps) => JSX.Element;
export declare const HrefButton: (props: ButtonProps) => JSX.Element;
export declare const PagingButton: (props: PagingButtonProps) => JSX.Element;
export declare class TimerButton extends React.Component<TimerButtonProps, any> {
    constructor(props: TimerButtonProps);
    isTimeDirect(func: any): (...args: any) => void;
    stopTimer(): void;
    timer(): void;
    click: any;
    render(): JSX.Element;
}
export {};
