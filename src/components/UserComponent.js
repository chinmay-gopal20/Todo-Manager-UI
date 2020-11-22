import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavbarBrand, NavItem, Button} from 'reactstrap';
import logo from '../todo_logo.png' 


class UserPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: props.userId,
            isNavOpen: false,
        };

        // this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(isVisible){
        this.setState({
            isNavOpen: isVisible
          })
      }

    render(){
        return(
            <React.Fragment>
                <Navbar color="warning" dark expand="md" style={{paddingTop: "20px", justifyContent: "center"}}>
                    <div>
                        <NavbarBrand href="/" >
                            <img src={logo} width="40" height="25" alt="Todo-manager"  style={{marginLeftt: "auto"}}/> {'  '}
                            <span style={{'color': "black", fontFamily: "iowan old style", fontSize: "25px"}}>ToDo Manager</span>
                        </NavbarBrand>
                    </div>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/home">
                                <Button style={{width: "100px", fontSize: 15, backgroundColor: "black"}}>
                                    <span className="fa fa-sign-in fa-lg" style={{color: "white"}}/>{'  '}Logout
                                </Button>
                            </Link>
                        </NavItem>
                    </Nav>
              </Navbar>
            </React.Fragment>
        )
    }
}

export default UserPage;
