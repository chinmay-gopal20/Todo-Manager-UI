import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavbarBrand, NavItem, Button, Container, Row, Col, Card, CardBody} from 'reactstrap';
import { BaseUrl } from "../static/BaseURL";
import logo from '../todo_logo.png'; 
import moment from "moment";

import ModalForm from "./FormComponent";

function RenderTaskHeaderCard(){
    return(
        <Card className="task-header-card" >
            <CardBody>
                    <div className="row">  
                        <div className="col-3"> 
                           <b>Task</b>
                        </div>
                        <div className="col-2"> 
                            <b>Due Date</b>
                        </div>
                        <div className="col-2"> 
                            <b>Priority</b>
                        </div>
                        <div className="col-1"> 
                            <b>Edit</b>
                        </div>
                        <div className="col-2">
                            <b>Delete</b>
                        </div>
                        <div className="col-2">
                            <b>Task Info</b>
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
            clickedTaskDetails: null,
            
            isViewModalOpen: false,
            isNewFormModalOpen: false,
            isEditFormModalOpen: false,
            isDeleteFormModalOpen: false,
            isDeleteAllFormModalOpen: false,
        };

        this.RenderTaskCard = this.RenderTaskCard.bind(this);
        this.toggleDisplayModal = this.toggleDisplayModal.bind(this);
        this.toggleEditFormModal = this.toggleEditFormModal.bind(this);
        this.toggleNewFormModal = this.toggleNewFormModal.bind(this);
        this.toggleDeleteFormModal = this.toggleDeleteFormModal.bind(this);
        this.toggleDeleteAllFormModal = this.toggleDeleteAllFormModal.bind(this);
    }

    getDefaultTaskDetails(){
        return {
            userId: this.state.userId,
            taskId: '',
            task: '',
            dueDate: new Date(),
            priority: '',
            category: '',
            lastModifiedDate: new Date(),
            createdDate: new Date()
        };
    }

    setTaskDetails(task){
        return {
            userId: this.state.userId,
            taskId: task.task_id,
            task: task.task,
            dueDate: moment(task.due_date).toDate(),
            priority: task.priority,
            category: task.category,
            lastModifiedDate: moment(task.last_modified).toDate(),
            createdDate: moment(task.created_date).toDate()
        }

    }

    //Modal to display task details
    toggleDisplayModal(task){
        this.setState({
            isViewModalOpen: !this.state.isViewModalOpen,
            clickedTaskDetails: task
        });
    }

    //Editable form with filled values
    toggleEditFormModal(task){
        this.setState({
            isEditFormModalOpen: !this.state.isEditFormModalOpen,
            clickedTaskDetails: task
        });
    }

    //Modal to add new task
    toggleNewFormModal(){
        this.setState({
            isNewFormModalOpen: !this.state.isNewFormModalOpen
        });
    }

    // Modal to delete task
    toggleDeleteFormModal(task){
        this.setState({
            isDeleteFormModalOpen: !this.state.isDeleteFormModalOpen,
            clickedTaskDetails: task
        });
    }

    toggleDeleteAllFormModal(){
        this.setState({
            isDeleteAllFormModalOpen: !this.state.isDeleteAllFormModalOpen
        })
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
            <Card key={task.task_id} className="task-card">
                <CardBody>
                        <div className="row"> 
                            <div className="col-3"> 
                               {task.task}
                            </div>
                            <div className="col-2"> 
                                {task.due_date.slice(0, -8)} 
                            </div>
                            <div className="col-2"> 
                                {task.priority} 
                            </div>
                            <div className="col-1"> 
                                <span style={{cursor: 'pointer'}} className="fa fa-pencil-square-o" 
                                    onClick={() => this.toggleEditFormModal(task)}/> 
                            </div>
                            <div className="col-2">
                                <span style={{cursor: 'pointer'}} className="fa fa-trash"
                                    onClick={() => this.toggleDeleteFormModal(task)}> </span> 
                            </div>
                            <div className="col-2">
                                <span style={{cursor: 'pointer'}} className="fa fa-info-circle" 
                                        onClick={() => this.toggleDisplayModal(task)}> </span> 
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
                <div className="row" style={{alignItems: "center", justifyContent: "center"}}>
                    <div className="col-3">
                        <Button onClick={this.toggleNewFormModal} 
                            style={{backgroundColor: "black", fontSize: 17, fontFamily: "iowan old style"}}> 
                            <span className="fa fa-plus fa-lg" style={{color: "white"}}></span>
                            Add Task
                        </Button>
                    </div>
                    <div className="col-3">
                        <Button onClick={this.toggleDeleteAllFormModal} 
                            style={{backgroundColor: "black", fontSize: 17, fontFamily: "iowan old style"}}> 
                            <span className="fa fa-trash fa-lg" style={{color: "white"}}></span>
                            Delete all Task
                        </Button>
                    </div>
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
                
                {this.state.isNewFormModalOpen ? 
                    <ModalForm taskDetails={this.getDefaultTaskDetails()}/> : 
                    null
                }
                
                {this.state.isEditFormModalOpen ? 
                    <ModalForm taskDetails={this.setTaskDetails(this.state.clickedTaskDetails)} isEditForm={true}/> : 
                    null
                }
                
                {this.state.isViewModalOpen ? 
                    <ModalForm taskDetails={this.setTaskDetails(this.state.clickedTaskDetails)} isViewForm={true}/> :
                    null
                }

                {this.state.isDeleteFormModalOpen ? 
                    <ModalForm taskDetails={this.setTaskDetails(this.state.clickedTaskDetails)} isDeleteForm={true}/> :
                    null
                }

                {this.state.isDeleteAllFormModalOpen ? 
                    <ModalForm taskDetails={{'userId': this.state.userId}} isDeleteAllForm={true}/> :
                    null
                }
            </React.Fragment>
        )
    }
}

export default UserPage;