import * as React from 'react';
interface InputCardProps {
    onChangeStep: (str: string) => void;
    setDataState: (data: any) => void;
    setCard: (str: string) => void;
    close: () => void;
}
interface InputCardState {
    data: {
        card: string;
    };
    isLoading: boolean;
    error: string;
}
export declare class InputCard extends React.Component<InputCardProps, InputCardState> {
    constructor(props: InputCardProps);
    changeInput(name: 'card', value: any): void;
    searchCard(): void;
    render(): JSX.Element;
}
export {};
