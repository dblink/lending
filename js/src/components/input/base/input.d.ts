import * as React from 'react';
import { OperateTemp, OperateTempState, BaseOperateProps } from '../../template/operateTemp';
export interface BaseInputProps extends BaseOperateProps {
    type: React.HTMLAttributes<'HTMLInputElement'>['itemType'];
    mouseFocus?: string | React.CSSProperties;
    updatestyle?: {
        run: any;
    };
    [index: string]: any;
}
interface State extends OperateTempState {
    data: any;
}
export declare class BaseInput extends OperateTemp<BaseInputProps, State> {
    constructor(props: BaseInputProps);
    mouseEvent: React.DOMAttributes<HTMLInputElement>;
    getMouseEvent(): React.DOMAttributes<HTMLInputElement>;
    onFocusHandler(e: any): void;
    shouldComponentUpdate(nextProps: any, nextState: State): boolean;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    showKeyboard(e: any): void;
    render(): JSX.Element;
}
export {};
