import * as React from 'react';
import { PagingButton } from '../button';
import './paging.css';
import { InnerProgress } from '../progress/progress';
interface Props {
    changePage: (index: number)=>void;
    index: string;
    lastPage: string;
    totalSize: number;
    isLoading ?: boolean
}

interface State {}

export class Paging extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
        this.changePage = this.changePage.bind(this);
    }
    changePage(num : number){
        //alert(1);
        if(num <= 0 
            || num === parseInt(this.props.index)
            || num >  parseInt(this.props.lastPage)){
            return;
        }
        this.props.changePage(num);
    }
    render() {
        let _index = parseInt(this.props.index),
            _lastPage = parseInt(this.props.lastPage);
        
        return <div className={'paging'}>
            <span style={{fontSize: '14px'}}>
                当前{this.props.index}-共{this.props.lastPage}页/{this.props.totalSize}条
            </span>
            <PagingButton intro='首页' onClick={()=>this.changePage(1)}>
                firstPage
            </PagingButton>
            <PagingButton intro='上一页' onClick={()=>this.changePage(_index - 1)}>
                prevPage
            </PagingButton>
            <PagingButton intro='下一页' onClick={()=>this.changePage(_index + 1)} >nextPage</PagingButton>
            <PagingButton intro='末页' onClick={()=>this.changePage(_lastPage)}>lastPage</PagingButton>
        </div>
    }
}
