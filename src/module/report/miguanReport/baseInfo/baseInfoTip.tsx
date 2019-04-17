import * as React from 'react';

interface Props {
    valid : boolean;
    style ?: React.CSSProperties;
}

interface State {}

export class BaseInfoTip extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            valid: props.valid
        };
    }

    render() {
        let {style} = this.props;
        return <span className='font-12 color-fff' 
            style={{padding: '5px 8px', 
                backgroundColor: this.props.valid ? '#0e9577' : '#db3951', 
                borderRadius: '4px',
                ...style
            }}>
        {this.props.children}
    </span>
    }
}