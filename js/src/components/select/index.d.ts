/// <reference types="react" />
import { BaseSelectProps } from './base/select';
import './select.scss';
interface ApplySelect extends BaseSelectProps {
    text: string;
    list: {
        value: string;
        text: string;
    }[];
}
export declare const ApplySelect: (props: ApplySelect) => JSX.Element;
interface SearchSelectProps extends BaseSelectProps {
    text: string;
    list: {
        value: string;
        text: string;
    }[];
}
export declare const SearchSelect: (props: SearchSelectProps) => JSX.Element;
export {};
