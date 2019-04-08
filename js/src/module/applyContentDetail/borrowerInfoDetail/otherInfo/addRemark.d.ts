import * as React from 'react';
declare type AddRemarkProps = {
    cancel: () => void;
    editData: any;
    confirm: (data: any) => void;
};
declare type AddRemarkState = {
    remark: string;
};
export declare class AddRemark extends React.Component<AddRemarkProps, AddRemarkState> {
    constructor(props: AddRemarkProps);
    confirm(): void;
    inputChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    render(): JSX.Element;
}
export {};
