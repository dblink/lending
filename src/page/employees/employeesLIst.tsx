import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Paging } from '../../components/paging/paging';
import { Table } from '../../components/table/commonTable';
import { ParameterName, Parameter } from '../../components/request/setting';

interface Props {}

interface State {
    data: Parameter<ParameterName.getUserAllInfo>;
    callbackData: any;
}

export class EmployeesList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {
                Token: '123',
                PageIndex: '1',
                PageSize: '10'
            },
            callbackData:[]
        };
    }

    render() {
        return <View>
            <div style={{height: '40px', width: '100%', background: '#fff'}}>

            </div>
            <div>

            </div>
        </View>
    }
}

class EmployeesTable extends React.Component {
    render(){
        let Tab = Table.CommonTable;
        return <div>
            这边是列表
        </div>
    }
}