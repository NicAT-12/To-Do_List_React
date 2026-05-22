import TodoItem from "./TodoItem";

const TodoList = ({
    tasks,
    deleteTask,
    toggleTask,
    editingId,
    editText,
    setEditText,
    startEditTask,
    saveEditTask
}) => {
    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    editingId={editingId}
                    editText={editText}
                    setEditText={setEditText}
                    startEditTask={startEditTask}
                    saveEditTask={saveEditTask}
                />
            ))}
        </ul>
    );
};

export default TodoList;