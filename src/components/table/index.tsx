import * as React from 'react';
//import { Table } from './commonTable';
//import {Table} from './commonTable';
import { lazyLoad } from '../loadable/loadable';

export class Table{
    A(a?: any){
        if(a){
            return lazyLoad(() => import(
                /* webpackChunkName: 'Table' */ './commonTable'
                ).then((e)=> e.Table.CommonTable));
        }else{
            return '1';
        }
        
    }
}
export class Some{
    A(){
        return '123';
    }
}