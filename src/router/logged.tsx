import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { sessionData } from '../components/sessionData/sessionData';

type Props = {
    component: any;
    type ?: 'pc' | 'mobile' ;
    [index:string]: any;
}

export class LoggedRoute extends React.Component<Props, any>{
    constructor(props: any){
        super(props);
    }
    render(){
        let {component: Component, type = 'pc' , ...other} = this.props;
        return <Route {...other} render={
            props=>{
                //console.log(props.location, 'logged');
                return (
                    sessionData.getData('Token') 
                        ? <Component {...props} />
                        :<Redirect to={{
                            pathname: '/',
                            state: {
                                from: props.location.pathname
                            }
                        }} />
                )
            }
        } />
    }
}

export const isPhone = (e?: string)=>{
    e = e || window.navigator.userAgent;
    return e.indexOf('Mobile') !== -1
}

export const TestMobile = ({component: Component, ...other}: any) =>{
    return <Route {...other} render={
        props=>{
            return (
                isPhone(window.navigator.userAgent) ? 
                <Redirect to={{
                    pathname: `/Mobile${props.match.path}`,
                        state: {
                            from: props.location.pathname
                        }
                    }} />
                :
                <Component {...props} />
            )
        }
    } />
}
export const TestPC = ({component: Component, ...other}: any)=>{
    return <Route {...other} render={
        props=>{
            return (
                !isPhone(window.navigator.userAgent) ? 
                <Redirect to={{
                    pathname: props.match.path.replace('/Mobile', ''),
                        state: {
                            from: props.location.pathname
                        }
                    }} />
                :
                <Component {...props} />
            )
        }
    } />
}