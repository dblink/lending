import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { sessionData } from '../components/sessionData/sessionData';

export const LoggedRoute = ({component: Component, ...other} : any)=>{
    return <Route {...other} render={
        props=>{
            //console.log(props.location, 'logged');
            return (
                sessionData.getData('Token') ? 
                <Component {...props} />:
                <Redirect to={{
                    pathname: '/',
                    state: {
                        from: props.location.pathname
                    }
                }} />
            )
        }
    } />
}