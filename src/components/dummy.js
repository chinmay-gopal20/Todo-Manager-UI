{this.state.isViewForm ? 
    <ModalHeader toggle={this.toggleModal}>Task Info</ModalHeader> : 
    <ModalHeader toggle={this.toggleModal}>Add Task</ModalHeader>
}
    <ModalBody>
        <Form onChange={this.state.isViewForm ? "" : this.handleChange} 
                    onSubmit={this.state.isViewForm ? "" : this.handleSubmit}>
            <FormGroup>
                <Label htmlFor="task">Task</Label>
                <Input type="text" id="task"  name="task" value={this.state.task} placeholder="Enter Task"></Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="category">Category</Label>
                <Input type="text" id="category" name="category" value={this.state.category} placeholder="Enter Category"></Input>
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
            {this.state.isViewForm ? 
                <React.Fragment>
                    <FormGroup>
                        <Label htmlFor="dueDate">Due Date</Label><br />
                        <DatePicker
                            name="dueDate"
                            id="dueDate"
                            selected={this.state.dueDate}
                            dateFormat="yyyy-M-dd"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="createdDate">Created Date</Label><br />
                        <DatePicker
                            name="createdDate"
                            id="createdDate"
                            selected={this.state.createdDate}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lastModifiedDate">Created Date</Label><br />
                        <DatePicker
                            name="lastModifiedDate"
                            id="lastModifiedDate"
                            selected={this.state.lastModifiedDate}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </FormGroup>
                    <Button type="submit"  value="submit" color="primary">Ok</Button>
                </React.Fragment>
                : 
                <React.Fragment>
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
                </React.Fragment>
            }
        </Form>
</ModalBody>