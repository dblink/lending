import * as React from 'react';
export interface BaseSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
}
interface State {
}
export declare class BaseSelect extends React.Component<BaseSelectProps, State> {
    constructor(props: BaseSelectProps);
    render(): JSX.Element;
}
export {};
