import * as React from 'react';
export interface OperateTempState {
    shouldUpdate?: boolean;
    style?: React.CSSProperties;
    className?: string;
}
export interface BaseOperateProps {
    style?: React.CSSProperties;
    className?: string;
    mouseHover?: React.CSSProperties | string;
    mouseDown?: React.CSSProperties | string;
}
export declare class OperateTemp<P, S extends OperateTempState> extends React.Component<BaseOperateProps & P, OperateTempState & S, any> {
    constructor(props: P);
    _onMouseRestoreHandler(e: any): void;
    _onMouseEnterHandler(e: any): void;
    updateClassName(className: string): void;
    updateStyle(style: React.CSSProperties): void;
    _onMouseDownHandler(e: any): void;
    _onMouseUpHandler(e: any): void;
    isHover(): React.HTMLAttributes<any>;
    isDown(): React.HTMLAttributes<any>;
}
