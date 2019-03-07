import * as React from 'react';
import {Route, Router, Switch, Redirect} from "react-router";
import { createBrowserHistory } from 'history';
import { Menu } from '../components/menu/menu';
import './css/layout.scss';
import { Login } from '../page/login';
import { Application } from '../page/application/application';
import { AuditList } from '../page/audit/auditList';
import { ContractList } from '../page/contract/contractList';
import { EmployeesList } from '../page/employees/employeesLIst';
import { GongXinBaoSuccess } from '../page/success/gongXinBaoSuccess';
import { sessionData } from '../components/sessionData/sessionData';
import { LoggedRoute } from './logged';
import { LendingList } from '../page/detail/lendingList';
import { ReceivableList } from '../page/detail/receivableList';
import { CalendarInput } from '../components/input';
import { RechargeList } from '../page/recharge/recharge';


export const browserHistory = createBrowserHistory();
interface Props {}

interface State {}

export class IndexRoute extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Router history={browserHistory}>
            <Switch>
                <Route exact path={'/'} component={Login} />
                <Route path={'/success/:token'} component={GongXinBaoSuccess} />
                <Route path={'/logged/*'} >
                    <div className='layout-curtain'>
                        <Menu {...this.props} />
                        <div style={{width: '100%', position: 'relative'}}>
                            <Switch>
                                
                                <LoggedRoute path='/logged/application' component={Application} /> {/*ok*/}
                                <LoggedRoute path='/logged/auditList' component={AuditList} />
                                <LoggedRoute path='/logged/contractList' component={(props: any)=><ContractList Status={'-1'} {...props} />} />
                                <LoggedRoute path='/logged/signList' component={(props: any)=><ContractList Status={1} {...props} />} />
                                <LoggedRoute path='/logged/agreementList' component={(props: any)=><ContractList Status={2} {...props} />} />
                                <LoggedRoute path='/logged/overdueList' component={(props: any)=> <ContractList Status={3} {...props} />} />
                                <LoggedRoute path='/logged/settleList' component={(props: any) => <ContractList Status={4} {...props} />} />
                                <LoggedRoute path='/logged/employees' component={EmployeesList} />
                                <LoggedRoute path='/logged/loanList'  component={LendingList} />
                                <LoggedRoute path='/logged/returnList' component={ReceivableList} />
                                <LoggedRoute path='/logged/recharge' component={RechargeList} />
                            </Switch>
                        </div>
                    </div>
                </Route>
            </Switch>
        </Router>
    }
}