import * as React from 'react';
import {chineseLowerToUpper} from "./chineseIdeograph";

export const lowerToUpper = (value: any)=>{
    if(typeof value === "number"){
        return chineseLowerToUpper(value)
    }
    console.error('不是数字无法转换')
    //return typeof value === "number" &&  ;
};