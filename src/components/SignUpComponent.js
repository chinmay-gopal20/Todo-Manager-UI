import React from "react";
import { Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";

class SignUp extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <Container >
                <Row >
                    <Col style={{display: "flex", justifyContent: "center", height: "60vh", alignItems: "center", margin: "0 auto"}}>
                        <Form>
                            <h2 className="text-center"><b>Sign Up</b></h2> <hr/>
                            <FormGroup  className="text-left">
                                <Label><b>First name</b></Label>
                                <Input type="firstname" name="firstname" id="firstname" placeholder="Enter Firstname" style={{width: "350px"}}/>
                            </FormGroup>
                            <FormGroup  className="text-left">
                                <Label><b>Last name</b></Label>
                                <Input type="lastname" name="lastname" id="lastname" placeholder="Enter Lastname" style={{width: "350px"}}/>
                            </FormGroup>
                            <FormGroup  className="text-left">
                                <Label><b>Email address</b></Label>
                                <Input type="email" name="email" id="email" placeholder="Enter email" style={{width: "350px"}}/>
                            </FormGroup>
                            <FormGroup className="text-left">
                                <Label><b>Password</b></Label>
                                <Input type="password" name="password" id="password" placeholder="Enter password" style={{width: "350px"}}/>
                            </FormGroup>
                            <button type="submit" className="btn btn-primary btn">Sign Up</button>
                        </Form>
                    </Col>
                </Row>
                </Container>
        )
    }
}

export default SignUp;