class Loading{
    state: any;
    setState: any;
    parameter: string;
    run(func ?: any, parameter:any = 'isLoading'){
        this.parameter = parameter;
        return ()=>{
            if(this.state[parameter]){
                return;
            }
            let _data:any = {};
            _data[parameter] = true;
            this.setState(_data,()=>{
                typeof func === 'function' && func.call(this);
            })
        }
    };
    isLoading(func ?: any){
       return ()=>{
            if(this.state[this.parameter]){
                return;
            }
            func();
       }
        
    }
}
export const load = new Loading();