import React from "react";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';


import LogIn  from "./LogInComponent";
import SignUp from "./SignUpComponent"
import UserPage from "./UserComponent";

class Main extends React.Component{
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