class Loading{
    state: any;
    setState: any;
    run(func ?: any){
        return ()=>{
            if(this.state.isLoading){
                return;
            }
            this.setState({
                isLoading: true
            },()=>{
                typeof func === 'function' && func.call(this);
            })
        }
    }
}
export const load = new Loading();