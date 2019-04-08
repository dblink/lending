/// <reference types="react" />
declare type ImageFileProps = {
    getData: (name: string, data: any, file: any) => void;
    canvasId?: string;
    name: string;
    loading: boolean;
    children: any;
};
export declare const ImageFile: (props: ImageFileProps) => JSX.Element;
export {};
