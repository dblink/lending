import * as React from 'react';
import { Icon } from '../../icon/icon';
import './vertical.scss';

interface Props {
    iconName ?: string;
    text: string;
    isMust ?: boolean;
    //default ?: any;
    style ?: React.CSSProperties;
    className ?: string;
    onClick ?: any;
}

interface State {}

export class Vertical extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className={`vertical ${this.props.className || ''}`} style={this.props.style} onClick={this.props.onClick}>
            <div style={{color: 'inherit'}}>
                {
                    this.props.iconName 
                    && <Icon style={{color: '#1B8DEF'}}>{this.props.iconName}</Icon>
                }
                <span style={{marginLeft: '20px', color: 'inherit', verticalAlign: 'middle'}}>
                    {this.props.text}
                    {this.props.isMust && <span style={{color: 'red'}}>&lowast;</span>}
                </span>
            </div>
            {
                this.props.children
            }
        </div>
    }
}