import * as React from 'react';
import { OperateTemp, BaseOperateProps } from '../../template/operateTemp';
export interface BaseButtonProps extends BaseOperateProps {
    [index: string]: any;
}
export declare class BaseButton extends OperateTemp<BaseButtonProps, any> {
    constructor(props: BaseButtonProps);
    mouseEvent: React.DOMAttributes<HTMLSpanElement>;
    getMouseEvent(): React.DOMAttributes<HTMLSpanElement>;
    shouldComponentUpdate(nextProps: any, nextState: any): any;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
