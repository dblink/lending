import * as React from 'react';
import './button.scss';
interface ButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
    type?: 'button';
}
interface TabButtonProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
    clicked?: boolean;
}
interface PagingButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
    intro: string;
}
export declare const PrimaryButton: (props: ButtonProps) => JSX.Element;
export declare const CancelButton: (props: ButtonProps) => JSX.Element;
export declare const TabButton: (props: TabButtonProps) => JSX.Element;
export declare const HrefButton: (props: ButtonProps) => JSX.Element;
export declare const PagingButton: (props: PagingButtonProps) => JSX.Element;
export {};
