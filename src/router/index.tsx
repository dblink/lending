import * as React from 'react';
import {Route, Router, Switch, Redirect, StaticRouter} from "react-router";
import { createBrowserHistory } from 'history';
import { Menu } from '../components/menu/menu';
import './css/layout.scss';
import { Login } from '../page/login/login';
import { Application } from '../page/application/application';
import { AuditList } from '../page/audit/auditList';
import { ContractList } from '../page/contract/contractList';
import { EmployeesList } from '../page/employees/employeesLIst';
import { GongXinBaoSuccess } from '../page/success/gongXinBaoSuccess';
import { LoggedRoute, TestMobile, TestPC } from './logged';
import { LendingList } from '../page/detail/lendingList';
import { ReceivableList } from '../page/detail/receivableList';
import { RechargeList } from '../page/recharge/recharge';
import { Report } from '../module/report/report';
import { ServiceAgreement } from '../module/contractHtml';
import { Repayment } from '../page/repayment/repayment';
import { Welcome } from '../page';
import { getIntervalDate } from '../components/calendar/dateFunction';
import { MerchantDetail } from '../page/merchant/merchant';
import { LocalRepayConfirm } from '../page/repayment/localRepayConfirm';
import { LoanAgreement } from '../module/contractHtml/loanAgreement1';
import { LoginMobile } from '../page/login/loginMobile';
import { MobileApplication } from '../page/application/mobileApplication';


export const browserHistory = createBrowserHistory();
interface Props {}

interface State {}

export class IndexRoute extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return <StaticRouter >
            <Router history={browserHistory}>
                <Switch>
                    <TestMobile exact path={'/'} component={Login} />
                    <Route path={'/success/:token'} component={GongXinBaoSuccess} />
                    <TestPC exact path='/Mobile/' component={LoginMobile} />
                    <LoggedRoute path={'/Mobile/application'} component={MobileApplication} />
                    <Route path={'/logged/*'} >
                        <div className='layout-curtain' >
                            <Menu {...this.props} />
                            <div style={{width: '100%', position: 'relative'}} >
                                <Switch>
                                    {
                                        //<LoggedRoute path='/logged/welcome' component={()=><div><img src='img/welcome.jpg' style={{width: '100%'}} /></div>}/>
                                    }
                                    <LoggedRoute path='/logged/welcome' component={Welcome}/>
                                    <LoggedRoute path='/logged/application' component={Application} /> {/*ok*/}
                                    <LoggedRoute path='/logged/auditList' component={AuditList} />
                                    <LoggedRoute path='/logged/contractList' component={(props: any)=><ContractList Status={'-1'} {...props} />} />
                                    <LoggedRoute path='/logged/signList' component={(props: any)=><ContractList Status={1} {...props} />} />
                                    <LoggedRoute path='/logged/agreementList' component={(props: any)=><ContractList Status={3} {...props} />} />
                                    <LoggedRoute path='/logged/overdueList' component={(props: any)=> <ContractList Status={4} {...props} />} />
                                    <LoggedRoute path='/logged/settleList' component={(props: any) => <ContractList Status={5} {...props} />} />
                                    <LoggedRoute path='/logged/waitLendList' component={(props: any) => <ContractList Status={2} {...props} />} />
                                    <LoggedRoute path='/logged/cancelList' component={(props: any) => <ContractList Status={6} {...props} />} />
                                    <LoggedRoute path='/logged/employees' component={EmployeesList} />
                                    <LoggedRoute path='/logged/loanList'  component={LendingList} />
                                    <LoggedRoute path='/logged/returnList' component={ReceivableList} />
                                    <LoggedRoute path='/logged/recharge' component={RechargeList} />
                                    <LoggedRoute path='/logged/repayList' component={Repayment} />
                                    <LoggedRoute path='/logged/repayListToday' component={()=><Repayment time={getIntervalDate(new Date, 0, 'date')}/>} />
                                    <LoggedRoute path='/logged/auditListToday' component={()=><AuditList time={getIntervalDate(new Date(), 0, 'date')} />} />
                                    <LoggedRoute path='/logged/overdueListInWeek' component={()=><ContractList Status={1} Time={'weekIn'}/>} />
                                    <LoggedRoute path='/logged/overdueListOutWeek' component={()=><ContractList Status={2} Time={'weekOut'} /> } />
                                    <LoggedRoute path='/logged/merchant' component={MerchantDetail} />
                                    <LoggedRoute path='/logged/localRepayConfirm' component={LocalRepayConfirm} />
                                </Switch>
                            </div>
                        </div>
                    </Route>
                    <LoggedRoute path='/service/:name/:idCard/:period/:serviceFee' component={ServiceAgreement} />
                    <LoggedRoute path='/report' component={Report} />
                    <LoggedRoute path='/service/LoanAgreement' component={LoanAgreement} />
                </Switch>
            </Router>
        </StaticRouter> 
    }
}