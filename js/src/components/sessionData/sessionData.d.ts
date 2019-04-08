declare class SessionData {
    private data;
    constructor(str: string);
    setData(data: any): void;
    addData(key: any, data: any): void;
    getData(str: 'Token' | 'UserInfo' | 'UserMenuItems' | 'MerchantItem'): any;
    clear(): void;
}
export declare const sessionData: SessionData;
export declare const sessionInfo: SessionData;
export {};
