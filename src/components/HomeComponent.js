import React from 'react';

import Header from "./HeaderComponent";
import SignUp from "./SignUpComponent"

class Home extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <React.Fragment>
                <Header />
                <SignUp />
            </React.Fragment>
        )
    }
}

export default Home