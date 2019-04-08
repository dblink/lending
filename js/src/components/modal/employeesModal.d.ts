import * as React from 'react';
export interface EmployeesModalOperate {
    showModal: (type: State['page'], data?: any) => void;
    closeModal: () => void;
}
interface Props {
    modalOperate: EmployeesModalOperate;
    getList: () => void;
}
interface State {
    show: boolean;
    page: '' | 'add' | 'edit' | 'editPassword';
    data?: any;
}
export declare class EmployeesModal extends React.Component<Props, State> {
    constructor(props: Props);
    showModal(type: 'add' | 'edit', data?: any): void;
    closeModal(isFresh?: boolean): void;
    getDom(): JSX.Element;
    render(): JSX.Element;
}
export {};
