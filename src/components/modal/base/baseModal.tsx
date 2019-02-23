import * as React from 'react';
import './baseModal.scss';
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
            <div {...other} />
        </div> : ''
    }
}