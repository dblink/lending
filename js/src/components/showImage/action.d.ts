import * as React from 'react';
import { ChangeEvent } from "react";
export declare class OnChangeImage extends React.Component<any, any> {
    constructor(props: any);
    dom: HTMLCanvasElement;
    fileOnchange(e: ChangeEvent<HTMLInputElement>): void;
}
