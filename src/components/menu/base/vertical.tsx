import * as React from 'react';
import { Icon } from '../../icon/icon';
import './vertical.scss';

interface Props {
    iconName ?: string;
    text: string;
    isMust ?: boolean;
    default ?: any;
    onClick ?: any;
}

interface State {}

export class Vertical extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className='vertical' style={{fontSize: '14px'}} onClick={this.props.onClick}>
            <div>
                {
                    this.props.iconName 
                    && <Icon>{this.props.iconName}</Icon>
                }
                <span style={{marginLeft: '20px', color: '#444'}}>
                    {this.props.text}
                    {this.props.isMust && <span style={{color: 'red'}}>&lowast;</span>}
                </span>
            </div>
            <div>
                {
                    this.props.default || ''
                }
                <Icon style={{marginLeft: '15px', color: '#ccc'}}>></Icon>
            </div>
        </div>
    }
}