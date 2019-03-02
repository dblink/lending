import * as React from 'react';

interface Props {}

interface State {}

export class ModalTitle extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div style={{color: '#333', fontWeight: 'bold', 
            padding: '20px', textAlign:'center'}}>
            {this.props.children}
        </div>
    }
}