import { FilterList } from "./filter";
import { sessionData } from "../../components/sessionData/sessionData";

export const addMerchantItem: any = (filter: FilterList<any>, merchantNo: any) => {
    let items = sessionData.getData('MerchantItem');
    let data = items.map((e:any)=>{return{text:e.MerchantName, value: e.MerchantNo}})
    filter.push({
            name : 'MerchantNo',
            text : '商户',
            type : 'select',
            value: merchantNo,
            list : data
        })
    return filter
}