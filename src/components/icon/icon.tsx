import * as React from 'react';

interface Props {
    [index: string] :any;
}

interface State {}

export class Icon extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        let {className, ...other} = this.props;
        className = `${className || ''} lending`;
        return <span className={className} {...other} />
    }
}