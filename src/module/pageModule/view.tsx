import * as React from 'react';
interface Props {}

interface State {}

export class View extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div style={{padding: '30px', background: '#F9F9F9', height: '100%'}}>
            {this.props.children}
        </div>
    }
}