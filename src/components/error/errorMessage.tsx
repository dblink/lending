import * as React from 'react';
import './css/errorMessage.css';
interface Props {
    children: string;
}

interface State {}

export class ErrorMessage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div title={this.props.children} className='error-message'
            style={{height: `${this.props.children ? '22px' : '0'}`}} >
            {this.props.children}
        </div>
    }
}