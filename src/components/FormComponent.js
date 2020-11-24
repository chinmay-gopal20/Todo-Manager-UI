import React  from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker  from "react-datepicker";
import { BaseUrl } from "../static/BaseURL";

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

async function addTask(userId, data){
    const url = BaseUrl + 'user/' + userId + '/tasks';
    console.log('add task url - ', url);

    const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:  {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            credentials: 'same-origin'
        })
        .then(response => response)
    return response;
}

async function editTask(userId, taskId, data){
    const url = BaseUrl + 'user/' + userId + '/tasks?taskId=' + taskId;
    console.log('update task url - ', url);
    console.log('reqest-body', data);
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:  {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        credentials: 'same-origin'
    })
    .then(response => response)
    return response;
}

async function deleteTask(userId, taskId){
    const url = BaseUrl + 'user/' + userId + '/tasks?taskId=' + taskId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers:  {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        credentials: 'same-origin'
    })
    .then(response => response)
    return response;
}

async function deleteAllTask(userId){
    const url = BaseUrl + 'user/' + userId + '/tasks';
    const response = await fetch(url, {
        method: 'DELETE',
        headers:  {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        credentials: 'same-origin'
    })
    .then(response => response)
    return response;
}

class ModalForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: props.taskDetails.userId ? props.taskDetails.userId : '',
            task: props.taskDetails.task ? props.taskDetails.task : '',
            priority: props.taskDetails.priority ? props.taskDetails.priority : '',
            category: props.taskDetails.category ? props.taskDetails.category : '',
            dueDate: props.taskDetails.dueDate ? props.taskDetails.dueDate : '',
            lastModifiedDate: props.taskDetails.lastModifiedDate ? props.taskDetails.lastModifiedDate : '',
            createdDate: props.taskDetails.createdDate ? props.taskDetails.createdDate : '',
            taskId: props.taskDetails.taskId ? props.taskDetails.taskId : '',

            isViewForm: props.isViewForm,
            isEditForm: props.isEditForm,
            isDeleteForm: props.isDeleteForm,
            isDeleteAllForm: props.isDeleteAllForm,
            isModalOpen: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
        this.handleDeleteFormSubmit = this.handleDeleteFormSubmit.bind(this);
        this.handleDeleteAllFormSubmit = this.handleDeleteAllFormSubmit.bind(this);
        this.handleCancelFormSubmit = this.handleCancelFormSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    getUpdatedTaskDate(){
        return{
            "task": this.state.task,
                    "priority": this.state.priority,
                    "category": this.state.category,
                    "due_date": this.state.dueDate.toString()
        }
    }

    getNewTaskData(){
        return {
            "todo":[
                {
                    "task": this.state.task,
                    "priority": this.state.priority,
                    "category": this.state.category,
                    "due_date": this.state.dueDate.toString()
                }
            ]
        }
    }

    handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })

        console.log(name, value);
    }

    handleDateChange(date){
        console.log('date change')
        this.setState({
            dueDate: date
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.toggleModal()
        alert('Task - ' + this.state.task + '\ncategory - ' + this.state.category + 
            '\nPriority - ' + this.state.priority + '\nDue date - ' + this.state.dueDate);
        addTask(this.state.userId, this.getNewTaskData())
        .then(response => response)
        .then(response => {
            if(response.ok){
                return response;
            }else{
                var error = new Error('Error ' + response.status + ' - ' + response.statusText);
                error.message = response
                throw error;
            }
        }, error => {
            throw error;
        })
        .then(response => {
            alert('Task Successfully added')
            window.location.href=`/todo-manager/user/${this.state.userId}`
        })
        .catch(error => {
            alert(error.message + 'Error while adding task.\nPlease Re-try')
        })
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleEditFormSubmit(event){
        event.preventDefault();
        this.toggleModal()
        alert('Task - ' + this.state.task + '\nPriority - ' + this.state.priority + 
            '\ncategory - ' + this.state.category + '\nDue date - ' + this.state.dueDate);
        editTask(this.state.userId, this.state.taskId, this.getUpdatedTaskDate())
            .then(response => response)
            .then(response => {
                if(response.ok){
                    return response;
                }else{
                    console.log('err response - ', response.json())
                    var error = new Error('Error ' + response.status + ' - ' + response.statusText);
                    error.message = response
                    // console.log('error - ', error)
                    throw error;
                }
            }, error => {
                throw error;
            })
            .then(response => {
                alert('Task Successfully Updated.')
                window.location.href=`/todo-manager/user/${this.state.userId}`
            })
            .catch(error => {
                alert(error + '\nError while updating task.\nPlease Re-try')
            })
    }

    handleDeleteFormSubmit(event){
        event.preventDefault();
        this.toggleModal()
        alert('Task - ' + this.state.task + '\nPriority - ' + this.state.priority + 
            '\ncategory - ' + this.state.category + '\nDue date - ' + this.state.dueDate);
        deleteTask(this.state.userId, this.state.taskId)
            .then(response => response)
            .then(response => {
                if(response.ok){
                    return response;
                }else{
                    var error = new Error('Error ' + response.status + ' - ' + response.statusText);
                    error.message = response
                    throw error;
                }
            }, error => {
                throw error;
            })
            .then(response => {
                alert('Task Successfully Deleted.')
                window.location.href=`/todo-manager/user/${this.state.userId}`
            })
            .catch(error => {
                alert(error + '\nError while deleting task.\nPlease Re-try')
            })
    }

    handleDeleteAllFormSubmit(event){
        event.preventDefault();
        this.toggleModal()
        deleteTask(this.state.userId, this.state.taskId)
            .then(response => response)
            .then(response => {
                if(response.ok){
                    return response;
                }else{
                    var error = new Error('Error ' + response.status + ' - ' + response.statusText);
                    error.message = response
                    throw error;
                }
            }, error => {
                throw error;
            })
            .then(response => {
                alert('Tasks Successfully Deleted.')
                window.location.href=`/todo-manager/user/${this.state.userId}`
            })
            .catch(error => {
                alert(error + '\nError while deleting tasks.\nPlease Re-try')
            })
    }

    handleCancelFormSubmit(event){
        event.preventDefault();
        this.toggleModal()
        alert('Form submission canceled.');
    }

    render(){

        const TaskInfoForm = <div className="container">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Task Info</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="task">Task</Label>
                                <Input readOnly type="text" id="task"  name="task" value={this.state.task} placeholder="Enter Task"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="category">Category</Label>
                                <Input readOnly type="text" id="category" name="category" value={this.state.category} placeholder="Enter Category"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="priority">Priority</Label>
                                <Input type="select" name="priority" id="priority" disabled>
                                    <option value="DEFAULT">{this.state.priority}</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="dueDate">Due Date</Label><br />
                                <DatePicker
                                    readOnly
                                    name="dueDate"
                                    id="dueDate"
                                    selected={this.state.dueDate}
                                    dateFormat="yyyy-M-dd"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="createdDate">Created Date (GMT)</Label><br />
                                <DatePicker
                                    readOnly
                                    name="createdDate"
                                    id="createdDate"
                                    selected={this.state.createdDate}
                                    showTimeSelect
                                    dateFormat="yyyy-M-dd h:mm aa"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastModifiedDate">Last Modified Date (GMT)</Label><br />
                                <DatePicker
                                    readOnly
                                    name="lastModifiedDate"
                                    id="lastModifiedDate"
                                    selected={this.state.lastModifiedDate}
                                    showTimeSelect
                                    dateFormat="yyyy-M-dd h:mm aa"
                                />
                            </FormGroup>
                            <Button type="submit"  value="submit" color="primary">Ok</Button>
                        </Form>
                    </ModalBody>
                    </Modal>
                    </div>

        const AddTaskForm = <div className="container">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.state.isEditForm ? 'Edit Task' : 'Add Task'}</ModalHeader>
                    <ModalBody>
                            <Form onChange={this.handleChange} 
                                        onSubmit={this.state.isEditForm ? this.handleEditFormSubmit : this.handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="task">Task</Label>
                                    <Input type="text" id="task"  name="task" 
                                        value={this.state.task} placeholder="Enter Task"></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="category">Category</Label>
                                    <Input type="text" id="category" name="category" 
                                        value={this.state.category} placeholder="Enter Category"></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="priority">Priority</Label>
                                    <Input type="select" name="priority" id="priority">
                                        value={this.state.priority}
                                        <option value="DEFAULT">{this.state.priority}</option>
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="dueDate">Due Date</Label><br />
                                    <DatePicker
                                        name="dueDate"
                                        id="dueDate"
                                        selected={this.state.dueDate}
                                        onChange={this.handleDateChange}
                                        dateFormat="yyyy-M-dd"
                                    />
                                </FormGroup>
                                <Button type="submit"  value="submit" color="primary">Submit</Button>
                            </Form>
                        </ModalBody>
                        </Modal>
                        </div>

        const DeleteTaskForm = <div className="container">
                                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                        <ModalHeader toggle={this.toggleModal}>Delete Task</ModalHeader>
                                        <ModalBody>
                                            <span className="fa fa-question-circle fa-lg"/> {'  '}
                                            Are you sure you want to delete this task?
                                        </ModalBody>
                                        <ModalFooter>
                                            <div>
                                                <Button  type="submit"  value="cancel" color="primary"
                                                    onClick={this.handleCancelFormSubmit}>Cancel</Button> {'    '}
                                                <Button  type="submit"  value="Delete" color="danger" 
                                                    onClick={this.handleDeleteFormSubmit}>Delete</Button>
                                            </div>
                                        </ModalFooter>
                                    </Modal>
                               </div>

        const DeleteAllTaskForm = <div className="container">
                                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                            <ModalHeader toggle={this.toggleModal}>Delete All Tasks</ModalHeader>
                                            <ModalBody>
                                                <span className="fa fa-question-circle fa-lg"/> {'  '}
                                                Are you sure you want to delete all the tasks?
                                            </ModalBody>
                                            <ModalFooter>
                                                <div>
                                                    <Button  type="submit"  value="cancel" color="primary"
                                                       onClick={this.handleCancelFormSubmit}>Cancel</Button> {'    '}
                                                    <Button  type="submit"  value="Delete" color="danger" 
                                                        onClick={this.handleDeleteAllFormSubmit}>Delete</Button>
                                                </div>
                                            </ModalFooter>
                                        </Modal>
                                </div>

        return(
            <React.Fragment>
                    {this.state.isDeleteAllForm ? 
                        DeleteAllTaskForm : (this.state.isDeleteForm ? 
                                                DeleteTaskForm : (this.state.isViewForm ? 
                                                                        TaskInfoForm : AddTaskForm)
                                            )
                    }
            </React.Fragment>
        )
    }
}

export default ModalForm;