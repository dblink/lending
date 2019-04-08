import * as React from 'react';
import './baseModal.css';
interface Props {
    children:any;
    isOpen :boolean;
    style ?:React.CSSProperties;
}

interface State {}

export class BaseModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        let {isOpen, ...other} = this.props;
        return isOpen ? <div className='curtain'>
            {...this.props.children}
        </div> : ''
    }
}