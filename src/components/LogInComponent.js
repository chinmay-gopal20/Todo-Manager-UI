import React from "react";
import { Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class LogIn extends React.Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        console.log('name - ', name, '\tvalue - ', value)
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <Container >
                <Row >
                    <Col style={{display: "flex", justifyContent: "center", height: "60vh", alignItems: "center", margin: "0 auto"}}>
                        <Form onChange={this.handleChange}>
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
        )
    }
}

export default LogIn;