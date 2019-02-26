import * as React from 'react';
import { BaseSelect, BaseSelectProps } from './base/select';
import './select.scss';

interface ApplySelect extends BaseSelectProps{
    text: string;
    list: {value: string, text: string}[];
}

export const ApplySelect = (props: ApplySelect) => {
    let {value, text, list, ...other} = props
    return <div>
        <div style={{fontSize: '14px', marginBottom: '10px', color: '#777'}}>
            {text}
        </div>
        <BaseSelect className='apply-select' {...other} 
            value={value} style={{color: value ? '#777' : '#ccc'}} >
            <option selected={true} disabled={true}>
                请选择{text}
            </option>
            {list.map((value, key)=>{
                return <option value={value.value} key={key}>
                    {value.text}
                </option>
            })}
        </BaseSelect>
    </div>
}