import React from "react";
import { Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";

import { BaseUrl } from "../static/BaseURL";
import Header from "./HeaderComponent";


class LogIn extends React.Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            isAuthorized: false,
            userId: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        // console.log(name, value)
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        const url = BaseUrl + "/verify-user?email=" + this.state.email + "&password=" + this.state.password;
        fetch(url)
            .then(response => response)
            .then(response => {
                if(response.ok || response.status === 401){
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ' - ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            }, error => {
                throw error;
            })
            .then(response => response.json())
            .then(response => {
                if (response.user_id){
                    this.setState({
                        isAuthorized: true,
                        userId: response.user_id
                    })
                    // alert("Logging in....")
                    window.location.href=`/todo-manager/user/${this.state.userId}`
                }
                else{
                    alert(response.message)
                }
            })
            .catch(error => {
                alert(error.message)
            })
        event.preventDefault();
    }

    render(){
        return(
            <React.Fragment>
            <Header />
                <Container >
                    <Row >
                        <Col style={{display: "flex", justifyContent: "center", height: "40vh", alignItems: "center", margin: "0 auto"}}>
                            <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                                <h2 className="text-center"><b>Login</b></h2> <hr/>
                                <FormGroup  className="text-left">
                                    <Label><b>Email address</b></Label>
                                    <Input type="email" name="email" id="email" placeholder="Enter email" style={{width: "350px"}}/>
                                </FormGroup>
                                <FormGroup className="text-left">
                                    <Label><b>Password</b></Label>
                                    <Input type="password" name="password" id="password" placeholder="Enter password" style={{width: "350px"}}/>
                                </FormGroup>
                                <button type="submit" className="btn btn-primary btn">Login</button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default LogIn;