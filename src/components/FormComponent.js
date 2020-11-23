import React  from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker  from "react-datepicker";
import { BaseUrl } from "../static/BaseURL";

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

async function addTask(userId, data){
    console.log('request body - ', data);
    const url = BaseUrl + 'user/' + userId + '/tasks';
    console.log('url - ', url);
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

class ModalForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: props.userId,
            task: '',
            priority: 'High',
            category: '',
            dueDate: new Date(),
            lastModifiedDate: new Date(),
            createdDate: new Date(),

            isModalOpen: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
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
        this.setState({
            dueDate: date
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.toggleModal()
        alert('Task - ' + this.state.task + '\nPriority - ' + this.state.priority + 
            '\ncategory - ' + this.state.category + '\nDue date - ' + this.state.dueDate);
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
            alert('Successfully added')
            window.location.href=`/todo-manager/user/${this.state.userId}`
        })
        .catch(error => {
            alert('Error while adding contact.\nPlease Re-try')
        })
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render(){
        console.log('form modal open - ', this.state.isModalOpen)
        return(
            <div className="container">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Task</ModalHeader>
                        <ModalBody>
                            <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="task">Task</Label>
                                    <Input type="text" id="task" name="task" value={this.state.task} placeholder="Enter Task"></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="category">Category</Label>
                                    <Input type="text" id="category" name="category" value={this.state.category} placeholder="Enter Category"></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="priority">Priority</Label>
                                    <Input type="select" name="priority" id="priority">
                                        value={this.state.priority}
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
        )
    }
}

export default ModalForm;