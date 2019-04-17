import * as React from 'react';

interface Props {
    text: string;
}

interface State {
    text: string;
}

export class BaseInfoTitle extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    render() {
        return <p className='display-flex-end color-666' 
            style={{backgroundColor: '#eeeeee', 
            padding: '10px', width: '100px'}}>
        {this.state.text}
    </p>
    }
}