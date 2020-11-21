import React from "react";
import { Container, Row } from "reactstrap";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';


import LogIn  from "./LogInComponent";
import SignUp from "./SignUpComponent"
import Header from "./HeaderComponent";

class Main extends React.Component{
    constructor(){
        super();
    }
    render(){

        const Signup = () => {
            return <SignUp />
        }

        const Login = () => {
            return <LogIn />
        }

        return(
            <div >
                <Header />
                <Switch>
                    <Route path='/home' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <Redirect to='/home' />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Main);