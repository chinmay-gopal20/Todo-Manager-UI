import React from "react";
import { Container, Jumbotron, Navbar, NavbarBrand, Button } from "reactstrap";
import { Link } from "react-router-dom";

import "../App.css"

class Header extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <React.Fragment>
                {/* <Navbar color="warning" expand="md">
                    <NavbarBrand>Todo Manager</NavbarBrand>
                </Navbar> */}
                <Jumbotron fluid className="shadow-lg p-3 mb-5 bg-warning rounded">
                    <Container className="text-left">
                        <h1 style={{color: "white", fontFamily: "iowan old style", fontSize: 80}}>ToDo Manager</h1>
                        <p style={{color: "white", fontSize: 20}}><i>Stay organized and manage your day-to-day.</i></p>
                    </Container>
                    <Container className="text-right" style={{marginLeft: "250px"}}> 
                        <Link to='/login' >
                            <Button style={{width: "100px", fontSize: 20, backgroundColor: "black"}}>Log in</Button> &nbsp;
                        </Link>
                        <Link to='/signup'>
                            <Button style={{width: "100px", fontSize: 20, backgroundColor: "black"}}>Sign up</Button>
                        </Link>
                    </Container>
                </Jumbotron>
            </React.Fragment>
        )
    }
}

export default Header;