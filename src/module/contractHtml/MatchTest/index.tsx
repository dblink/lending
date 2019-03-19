import * as React from 'react';

 class MatchTest {
    value: any;
    isNumber(){
        return /^[0-9]+(.[0-9]+)|.?$/.test(this.value);
    }
}

export const matchTest = (()=>{
     let _test = new MatchTest();
     return (value: any)=> {
         _test.value = value;
         return _test
     }
})();