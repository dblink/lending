import * as React from 'react';
declare type Props = {
    component: any;
    type?: 'pc' | 'mobile';
    [index: string]: any;
};
export declare class LoggedRoute extends React.Component<Props, any> {
    constructor(props: any);
    render(): JSX.Element;
}
export declare const isPhone: (e?: string) => boolean;
export declare const TestMobile: ({ component: Component, ...other }: any) => JSX.Element;
export declare const TestPC: ({ component: Component, ...other }: any) => JSX.Element;
export {};
