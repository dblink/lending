import * as React from 'react';
import './progress.css';
import { Icon } from '../icon/icon';

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
    hidden ?: boolean;
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
                return <div className='inner-loading' key={key} style={{
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
    show : boolean; 
    icon ?: any;
    hideIcon ?: boolean;
    hideContent ?: boolean;
}
//页面loading图

export class PageLoading extends React.Component <PageLoadingProps, any>{
    constructor(props: PageLoadingProps){
        super(props);
        this.state ={
            end: false
        }
        this.end = this.end.bind(this);
    }
    isEnd: boolean;
    componentDidUpdate(nextProps: PageLoadingProps){
        if(this.props.show && this.state.end){
            this.setState({
                end: false
            })
        }
    }
    end(){
        this.setState({
            end: true
        })
    }
    render(){
        let props = this.props;
        return !this.state.end ? <div onAnimationEnd={this.end} className={`page-loading ${props.show ? '' : 'hidden'}`}>
             { 
               !this.props.hideIcon && (this.props.icon || <Icon style={{fontSize: '40px',color: '#ccc', marginRight:'10px'}} className='rotating'>
                    loading
                </Icon>)}
            <div>
                {
                    !this.props.hideContent && (this.props.children || '读取中...')
                }
                
            </div>
        </div> : ''
    }
}