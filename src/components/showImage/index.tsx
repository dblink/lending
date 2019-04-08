import * as React from 'react';
import {ImageFileView} from "./view";
type ImageFileProps = {
    getData  : (name:string, data:any, file: any)=> void;
    canvasId ?: string;
    name     : string;
    loading  : boolean;
    children : any;
}

export const ImageFile = (props:ImageFileProps) => <ImageFileView {...props} />;