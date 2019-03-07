import * as React from 'react';
import { browserHistory } from '../../router';

class Fail{
    private src:string;
    constructor(src: string){
        this.src = src;
    }
    skip(from: string){
        browserHistory.replace(this.src, {from: from});
    }
}
export const overdueToken = new Fail('/');