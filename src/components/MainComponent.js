import React from "react";
import { Container, Row } from "reactstrap";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';


import LogIn  from "./LogInComponent";
import SignUp from "./SignUpComponent"
import UserPage from "./UserComponent";
import ModalForm  from "./FormComponent";
// import Header from "./HeaderComponent";
// import Home from "./HomeComponent";

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

        const User = ({match}) => {
            return <UserPage userId={match.params.userId} />
        }

        const Modal = () => {
            return <ModalForm />
        }
        
        // const HomePage = () => {
        //     return <Home />
        // }

        return(
            <div >
                <Switch>
                    {/* <Route path='/home' component={ModalForm} /> */}
                    <Route path='/home' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/todo-manager/user/:userId' component={User} />
                    <Redirect to='/home' />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Main);