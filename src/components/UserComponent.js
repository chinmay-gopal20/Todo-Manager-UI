import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavbarBrand, NavItem, Button, Container, Row, Col, Card, CardBody} from 'reactstrap';
import { BaseUrl } from "../static/BaseURL";
import logo from '../todo_logo.png'; 

import ModalForm from "./FormComponent";

function RenderTaskHeaderCard(){
    return(
        <Card className="task-header-card" >
            <CardBody>
                    <div className="row">  
                        <div className="col-4"> 
                           <b>Task</b>
                        </div>
                        <div className="col-2"> 
                            <b>Due Date</b>
                        </div>
                        <div className="col-2"> 
                            <b>Priority</b>
                        </div>
                        <div className="col-2"> 
                            <b>Edit</b>
                        </div>
                        <div className="col-2">
                            <b>Delete</b>
                        </div>
                    </div>
            </CardBody>
        </Card>
    )
}

async function getAllTasks(userId){
    const url = BaseUrl + '/user/' + userId + '/tasks';
    console.log('url - ', url);
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

class UserPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: props.userId,
            todo: null,
            
            isNewFormModalOpen: false,
            isEditFormModalOpen: false,
        };

        this.RenderTaskCard = this.RenderTaskCard.bind(this);
        this.toggleDisplayModal = this.toggleDisplayModal.bind(this);
        this.toggleEditFormModal = this.toggleEditFormModal.bind(this);
        this.toggleNewFormModal = this.toggleNewFormModal.bind(this);
    }

    task_details = {
        task: '',
        due_date: '',
        priority: '',
        category: '',
        last_modified: '',
        created_date: ''
    };

    //Modal to display contact details
    toggleDisplayModal(){
        this.setState({
            isViewModalOpen: !this.state.isViewModalOpen
        });
    }

    //Editable form with filled values
    toggleEditFormModal(){
        console.log('Inside form modal')
        this.setState({
            isEditFormModalOpen: !this.state.isEditFormModalOpen
        });
    }

    //Modal to add new task
    toggleNewFormModal(){
        this.setState({
            isNewFormModalOpen: !this.state.isNewFormModalOpen
        });
        console.log('is new form modal open - ', this.state.isNewFormModalOpen)
    }

    componentDidMount(){
        getAllTasks(this.state.userId)
            .then(response => response)
            .then(response => response[0]['todo'])
            .then(response => {
                    this.setState({
                        todo: response
                    })
            }) 
    }

    RenderTaskCard({task}){
        return(
            <Card key={task.task_id} className="task-card" >
                <CardBody>
                        <div className="row">  
                            <div className="col-4"> 
                               {task.task} 
                            </div>
                            <div className="col-2"> 
                                {task.due_date.slice(0, -8)} 
                            </div>
                            <div className="col-2"> 
                                {task['priority']} 
                            </div>
                            <div className="col-2"> 
                                <span className="fa fa-pencil-square-o" onClick={this.toggleEditFormModal}/> 
                            </div>
                            <div className="col-2">
                                <span className="fa fa-trash"> </span> 
                            </div>
                        </div>
                </CardBody>
            </Card>
        )
    }

    render(){
        const TaskCard = this.state.todo ? this.state.todo.map((task) => {
                return(
                    <Col md={7}  key={task.task_id} style={{paddingBottom: "10px", paddingTop: "10px"}}>
                        {this.RenderTaskCard({task})}
                    </Col>
                )               
            }) : null;


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
                                <Button style={{width: "100px", fontSize: 17, backgroundColor: "black", 
                                        fontFamily: "iowan old style"}}>
                                    <span className="fa fa-sign-in fa-lg" style={{color: "white"}}/>{'  '}Logout
                                </Button>
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar>
                <Container className="todo-title-container" style={{"justifyContent": "center"}}>
                    <Row>
                        <Col style={{display: "flex", justifyContent: "center", height: "15vh", 
                            alignItems: "center", margin: "0 auto"}}>
                            <h1>To-Do List</h1>
                        </Col>
                    </Row>
                </Container>
                <div>
                    <Button onClick={this.toggleNewFormModal} 
                        style={{backgroundColor: "black", fontSize: 17, fontFamily: "iowan old style"}}> 
                        <span className="fa fa-plus fa-lg" style={{color: "white"}}></span>
                        Add Task
                    </Button>
                </div>
                <Row style={{'display': 'flex', 'flexDirection': 'row', 'flexWrap': 'wrap', 
                        justifyContent: "center", alignItems: "center"}}>
                    <Col md={7}  key='task-header-card' style={{paddingBottom: "10px", paddingTop: "10px"}}>
                        <RenderTaskHeaderCard />
                    </Col>
                </Row>
                <Row style={{'display': 'flex', 'flexDirection': 'row', 'flexWrap': 'wrap', 
                        justifyContent: "center", alignItems: "center"}}>
                    {TaskCard}
                </Row>
                {this.state.isNewFormModalOpen ? <ModalForm userId={this.state.userId}/>: null}
            </React.Fragment>
        )
    }
}

export default UserPage;

// style={{height: "15vh", justifyContent: "right", alignItems: "center", display: "flex", margin: "50"}}