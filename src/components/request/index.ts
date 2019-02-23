import {main} from "./main";
import {Key, RequestParameter} from "./setting";


export interface ReqOption <T extends RequestParameter[Key]> {
    type ?: string;
    data ?: T;
    succeed ?: (data: any, xml?: any) => void;
    fail ?: (errorText ?:any, xml ?: any) => void;
    [index: string] : any;
}

/*export const req = function(reqName: Key, option: ReqOption<Key>){
    return main()(reqName, option);
};*/

export const req: (reqName: Key, option: ReqOption<RequestParameter[Key]>)=>any = main();
