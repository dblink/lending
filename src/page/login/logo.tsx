import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement>{

}

interface State {}

export class LoginLogo extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div {...this.props}>
            <img src='img/logo.png' style={{width: '100%'}} />
        </div>
            
    }
}