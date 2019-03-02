import * as React from 'react';
import './progress.css';

export const Progress = (props: {hidden: boolean}) => (
    <div className="progress" 
        style={{display: `${ !props.hidden? 'block' :'none'}`}}>
        <div className="loading" role="progressbar" >
            {/*<span className="sr-only">60% Complete</span>*/}
        </div>
        <div style={{clear: 'both'}}></div>
    </div>
);
type InnerProgressProps = {
    hidden : boolean;
    width  ?: string;
    height : string;
    color  ?: string;
    num ?: number;
}
export const InnerProgress = (props: InnerProgressProps) => {
    let _arr = new Array(props.num || 4);
    _arr.fill(0);
    return <div className='inner-progress' style={{ height: props.height || '100%'}}>
        {
            _arr.map((value, key)=>{
                return <div className='inner-loading' style={{
                    background: props.color || '#fff',
                    width: props.width || '3px',
                    height: '100%',
                    animationDelay: 0 + `.${key}s`
                }}></div>
            })
        }
        
    </div>
}
type PageLoadingProps = {
    
}
//页面loading图
export const PageLoading = (props: PageLoadingProps) => {
    return <div className={'loading'}>

    </div>
}