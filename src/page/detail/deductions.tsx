import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Table } from '../../components/table/commonTable';
import { Parameter, ParameterName, RequestCallback } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { getIntervalDate } from '../../components/calendar/dateFunction';

interface Props {}

interface State {
    data: Parameter<ParameterName.getReportChargeItems>;
    callbackData: RequestCallback<ParameterName.getReportChargeItems>[];
}

export class Deductions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let obj = getIntervalDate(new Date(), 1);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                Status: '-1',
                EndTime: obj.endTime,
                StartTime : obj.startTime,
                PageIndex: '1',
                ReportType: '-1',
                PageSize: '10',
                BorrowerName: '',
            },
            callbackData: []
        };
    }

    render() {
        return <View>
            <DeductionsTable data={this.state.callbackData} /> 
        </View>
    }
}

interface DeductionsTableProps {
    data: any[]
}

class DeductionsTable extends React.Component<DeductionsTableProps, State>{
    setting: {
        head: string;
        attr: string;
        format ?: any;
    }[] = [{
        head: '',
        attr: '',
    }]
    render(){
        let Tab = Table.CommonTable;
        return <Tab list={this.props.data} setting={this.setting} />
    }
}