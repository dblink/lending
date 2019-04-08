import * as React from 'react';
declare type AddContactInfoState = {
    data: {
        contactName?: string;
        contactMobile?: string;
        contactAddress?: string;
        contactRelation?: string;
    };
};
declare type AddContactInfoProps = {
    data?: AddContactInfoState['data'];
    cancel: () => void;
    confirm: (e: any) => void;
};
export declare class AddContactInfo extends React.Component<AddContactInfoProps, AddContactInfoState> {
    constructor(props: AddContactInfoProps);
    inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
    confirm(): void;
    render(): JSX.Element;
}
export {};
