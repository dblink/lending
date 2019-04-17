import * as React from 'react';

interface Props {}

interface State {}

export class BaseInfoRow extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className='display-flex-start font-14' 
                style={{padding: '16px 0', flexWrap: 'wrap', minWidth: '320px'}}
            >
            {this.props.children}
        </div>
    }
}