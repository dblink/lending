import * as React from 'react';
export declare class Sign extends React.Component<{
    success?: any;
    [index: string]: any;
}, any> {
    constructor(props: any);
    dom: HTMLImageElement;
    input: HTMLElement;
    componentDidMount(): void;
    paste(e: any): void;
    touch(e: TouchEvent): void;
    signFinish(canvas: HTMLCanvasElement): void;
    closeSign(): void;
    render(): JSX.Element[];
}
