import TodoItem from "./TodoItem";

const TodoList = ({
    visibleTasks,
    deleteTask,
    toggleTask,
    editingId,
    editText,
    setEditText,
    startEditTask,
    saveEditTask,
    cancelEditTask
}) => {
    return (
        <ul className="todo-list">
            {
                visibleTasks.length === 0
                    ? (
                        <li className="todo-list__empty">
                            No tasks found
                        </li>
                    )
                    : (visibleTasks.map((task) => (
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
                            cancelEditTask={cancelEditTask}
                        />
                    )))
            }
        </ul>
    )
};

export default TodoList;