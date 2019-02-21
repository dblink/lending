import * as React from 'react';
import { BaseInput } from "./base/input";
import { config } from "./config";

interface Props extends React.InputHTMLAttributes<any>{
    
}

export const UserInput = (props: Props) =>{
    return <BaseInput {...config.userInput} {...props}/>
};

export const UserInputPassword = (props: Props) =>{
    return <BaseInput {...config.userInputPassword} {...props}/>
};