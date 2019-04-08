import * as React from 'react';
import { ApplyInput } from '../../components/input';
import { Parameter, ParameterName } from '../../components/request/setting';

interface Props {
    inputChange: (...props: any)=>void;
    error: Parameter<ParameterName.login>
    data: Parameter<ParameterName.login>
}

interface State {}


export const NormalLogin = (props:Props) =>{
    return <div>
        <ApplyInput text={'商户号'}
            name='MerchantNo'
            onChange={props.inputChange}
            error={props.error.MerchantNo}
            value={props.data.MerchantNo} />
        <ApplyInput text={'账号'}  
            name='LoginName'
            onChange={props.inputChange}
            error={props.error.LoginName}
            value={props.data.LoginName}/>
        <ApplyInput text={'密码'} 
            name='Password'
            autoComplete='off'
            onChange={props.inputChange}
            error={props.error.Password}
            value={props.data.Password} type='password' />
    </div>
}

export const AreaLogin = (props: Props) => {
    return <div>
        <ApplyInput text={'账号'}  
            name='LoginName'
            onChange={props.inputChange}
            error={props.error.LoginName}
            value={props.data.LoginName}/>
        <ApplyInput text={'密码'} 
            name='Password'
            autoComplete='off'
            onChange={props.inputChange}
            error={props.error.Password}
            value={props.data.Password} type='password' />
    </div>
}