import * as React from 'react';
export interface BaseSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
interface State {}

export class BaseSelect extends React.Component<BaseSelectProps, State> {
    constructor(props: BaseSelectProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <select {...this.props} />
    }
}