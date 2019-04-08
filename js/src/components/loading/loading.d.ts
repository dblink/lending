declare class Loading {
    state: any;
    setState: any;
    parameter: string;
    run(func?: any, parameter?: any): (...props: any) => void;
    isLoading(func?: any, parameter?: any): (...props: any) => void;
}
export declare const load: Loading;
export {};
