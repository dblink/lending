import * as React from 'react';
interface Props {
    title: string;
}

interface State {}

export class MerchantModule extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className='merchant-module'>
            <div style={{background: '#F6FBFF', height:'48px', lineHeight: '48px', width: '100%'}}>
                <div style={{fontSize: '16px', fontWeight: 'bold', color: '#1B8DEF', paddingLeft: '20px'}}>
                    {this.props.title}
                </div>
            </div>
            <div style={{padding: '10px 0',background:'#FFF' ,borderTop: '1px solid #D6E8F6'}}>
                {this.props.children}
            </div>
            
        </div>
    }
}