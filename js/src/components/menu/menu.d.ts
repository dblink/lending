import * as React from 'react';
import { ShowModal } from '../modal/changePassword';
interface Props {
    location?: any;
}
interface State {
    showId: string;
}
export declare class Menu extends React.Component<Props, State> {
    constructor(props: Props);
    list: {
        "Id": string;
        "Icon": string;
        "MenuName": string;
        "Url": string;
        "ParentId": string;
        "Items": {
            "Id": string;
            "Icon": string;
            "MenuName": string;
            "Url": string;
            "ParentId": string;
        }[];
    }[];
    modal: ShowModal;
    showChildren(id: string): void;
    closeChildren(): void;
    render(): JSX.Element;
}
export {};
