import {main} from "./main";
import {Key, Parameter} from "./setting";


export interface ReqOption <T extends Key> {
    type ?: string;
    data ?: Parameter<T>;
    succeed ?: (data: any, xml?: any) => void;
    fail ?: (errorText ?:any, xml ?: any) => void;
    [index: string] : any;
}

/*export const req = function(reqName: Key, option: ReqOption<Key>){
    return main()(reqName, option);
};*/

export const req: (reqName: Key, option: ReqOption<Key>)=>any = main();
