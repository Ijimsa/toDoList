import Task from "./Task";

function TaskContainer({ tasks, setTasks, setEditTask }) {
    const renderTasks = tasks
        .map((task) => (
            <Task
                key={task.id}
                task={task}
                setTasks={setTasks}
                tasks={tasks}
                setEditTask={setEditTask}
            />
        ))
        .reverse();

    return <>{renderTasks}</>;
}

export default TaskContainer;
