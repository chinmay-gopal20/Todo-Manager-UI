import React from "react";
import { Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";


class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            fields: {
                fristname: '',
                lastname: '',
                email: '',
                password: '',
            },
            errors: {
                fristname: '',
                lastname: '',
                email: '',
                password: '*8-15 chars, atleast 1 lower, upper, numeric, special char',
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitSignUpForm = this.submitSignUpForm.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        var fields = this.state.fields;
        fields[name] = value;
        this.setState({
            fields
        })
    }

    submitSignUpForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields['firstname'] = '';
            fields['lastname'] = '';
            fields['email'] = '';
            fields['password'] = '';
            this.setState({
                fields: fields
            });
            alert("Form submitted");
        }
  
    }

    validateForm(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        // firstname - only alphabets
        if (!fields["firstname"]) {
            formIsValid = false;
            errors["firstname"] = "*Please enter your firstname.";
        }
    
        if (typeof fields["firstname"] !== "undefined") {
            if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["firstname"] = "*Please enter alphabet characters only.";
            }
        }

        // lastname - only alphabets
        if (!fields["lastname"]) {
            formIsValid = false;
            errors["lastname"] = "*Please enter your lastname.";
        }
    
        if (typeof fields["lastname"] !== "undefined") {
            if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["lastname"] = "*Please enter alphabet characters only.";
            }
        }
    
        // email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }
    
        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
            if (!pattern.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email address.";
            }
        }

        // password - between 8 to 15 characters which contain at least one lowercase letter, 
        // one uppercase letter, one numeric digit, and one special character.
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            var pattern=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            if (!fields["password"].match(pattern)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }

        this.setState({
            errors: errors
        });

        return formIsValid;    
    }
  

    render(){
        return(
            <Container >
                <Row >
                    <Col style={{display: "flex", justifyContent: "center", height: "60vh", alignItems: "center", margin: "0 auto"}}>
                        <Form onChange={this.handleChange} onSubmit={this.submitSignUpForm}>
                            <h2 className="text-center"><b>Sign Up</b></h2> <hr/>
                            <FormGroup  className="text-left">
                                <Label><b>First name</b></Label>
                                <Input type="firstname" name="firstname" id="firstname" placeholder="Enter Firstname"/>
                                <div className="errorMsg" style={{color: 'red', fontSize: 15}}>{this.state.errors.firstname}</div>
                            </FormGroup>
                            <FormGroup  className="text-left">
                                <Label><b>Last name</b></Label>
                                <Input type="lastname" name="lastname" id="lastname" placeholder="Enter Lastname"/>
                                <div className="errorMsg" style={{color: 'red', fontSize: 15}}>{this.state.errors.lastname}</div>
                            </FormGroup>
                            <FormGroup  className="text-left">
                                <Label><b>Email address</b></Label>
                                <Input type="email" name="email" id="email" placeholder="Enter email"/>
                                <div className="errorMsg" style={{color: 'red', fontSize: 15}}>{this.state.errors.email}</div>
                            </FormGroup>
                            <FormGroup className="text-left">
                                <Label><b>Password</b></Label>
                                <Input type="password" name="password" id="password" placeholder="Enter password">
                                </Input>
                                <div className="errorMsg" style={{color: 'red', fontSize: 15}}>{this.state.errors.password}</div>
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