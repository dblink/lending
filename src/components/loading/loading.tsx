class Loading{
    state: any;
    setState: any;
    parameter: string;
    run(func ?: any, parameter:any = 'isLoading'){
        this.parameter = parameter;
        return (...props:any)=>{
            if(this.state[parameter]){
                return;
            }
            let _data:any = {};
            _data[parameter] = true;
            this.setState(_data,()=>{
                typeof func === 'function' && func.call(this, ...props);
            })
        }
    };
    isLoading(func ?: any, parameter:any = this.parameter){
       return (...props: any)=>{
            //console.log(this.state[this.parameter]);
            if(this.state[parameter]){
                return;
            }
            //console.log(...props,1)
            func.call(this, ...props);
       }
        
    }
}
export const load = new Loading();