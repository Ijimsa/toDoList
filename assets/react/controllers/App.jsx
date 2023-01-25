import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import TaskContainer from "./components/TaskContainer";
import Row from "react-bootstrap/esm/Row";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useEffect, useState } from "react";

import "./App.css";

export default function App() {
    const [tasks, setTasks] = useState(null);
    const [editTask, setEditTask] = useState(null);

    // TODO Get all Tasks in the Initial Render.

    // Watch for editTask and update the form with its values.
    useEffect(() => {
        if (editTask) {
            const form = document.getElementById("task-form");
            form.taskName.value = editTask.title;
            form.taskImportance.value = editTask.importance;
            form.taskButton.innerText = "Edit Task";
        }
    }, [editTask]);

    async function handleSubmit(e) {
        e.preventDefault();

        const formFunction = e.target.getAttribute("data-function");

        // If editTask is not defined. Form function is to add a new task.
        if (!editTask) {
            const newTask = {
                id: uuidv4(),
                title: e.target.taskName.value,
                importance: e.target.taskImportance.value,
                date: new Date().toString(),
            };

            // TODO Save in the server.

            // Save in the client.
            setTasks(tasks.concat(newTask));

            // If editTask is defined. Form function is to update the task given.
        } else {
            // Get data from form.
            const updatedTask = {
                ...editTask,
                title: e.target.taskName.value,
                grade: e.target.taskImportance.value,
            };

            // TODO Update in the server.

            // Update in the client.
            setTasks(
                tasks.map((item) => {
                    if (item.id === updatedTask.id) {
                        item.name = e.target.taskName.value;
                        item.importance = e.target.taskImportance.value;
                    }
                    return item;
                })
            );

            // Reset form
            e.target.taskName.value = "";
            for (let i = 0; i < e.target.taskImportance.length; i++) {
                e.target.taskImportance[i].checked = false;
            }
            e.target.taskButton.innerText = "Add Task";
            setEditTask(null);
        }
    }

    const radiosLength = new Array(5);

    return (
        <div>
            <Container>
                <Row>
                    <Col className="d-flex align-items-start justify-content-center">
                        <Form
                            fluid={"true"}
                            onSubmit={(e) => handleSubmit(e)}
                            className="p-3 mt-5 border rounded border-primary"
                            id="task-form"
                        >
                            <Form.Label className="fw-bold">
                                Create new task:
                            </Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="taskName"
                                placeholder="Name of the task"
                                className="my-2"
                            />
                            <Form.Label>Importance: </Form.Label>
                            {radiosLength.fill("0").map((type, index) => (
                                <Form.Check
                                    key={"inline-radio-" + index}
                                    id={"inline-radio-" + index}
                                    inline
                                    label={index + 1}
                                    name="taskImportance"
                                    type="radio"
                                    value={index + 1}
                                    required
                                />
                            ))}
                            <br />
                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-2"
                                name="taskButton"
                            >
                                Add Task
                            </Button>
                        </Form>
                    </Col>
                    <Col md className="mt-4 overflow-scroll tasks-container">
                        {tasks && (
                            <TaskContainer
                                tasks={tasks}
                                setTasks={setTasks}
                                setEditTask={setEditTask}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
