import * as React from 'react';
import {Route, Router, Switch} from "react-router";
import { createBrowserHistory } from 'history';
import { Menu } from '../components/menu/menu';
import './css/layout.scss';
import { Login } from '../page/login';
import { Application } from '../page/application/application';
import { AuditList } from '../page/audit/auditList';
import { ContractList } from '../page/contract/contractList';
import { EmployeesList } from '../page/employees/employeesLIst';
import { GongXinBaoSuccess } from '../page/success/gongXinBaoSuccess';


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
                <Route path={'/logged/*'}>
                    <div className='layout-curtain'>
                        <Menu />
                        <div style={{width: '100%', position: 'relative'}}>
                            <Switch>
                                <Route path='/logged/application' component={Application} />
                                <Route path='/logged/auditList' component={AuditList} />
                                <Route path='/logged/contractList' component={()=><ContractList Status={1} />} />
                                <Route path='/logged/employees' component={EmployeesList} />
                            </Switch>
                        </div>
                    </div>
                </Route>
            </Switch>
        </Router>
    }
}