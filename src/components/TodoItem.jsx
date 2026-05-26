import { FaPencilAlt, FaTrashAlt, FaCheckCircle } from "react-icons/fa";

const TodoItem = ({
    task,
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
        <li
            className={
                task.completed
                    ? 'todo-item todo-item--completed'
                    : 'todo-item'
            }
        >
            {
                editingId === task.id
                    ? (
                        <div className="todo-item__edit">
                            <input
                                onChange={(e) => setEditText(e.target.value)}
                                value={editText}
                                type="text"
                                placeholder="Editar..."
                            />

                            <button
                                className="todo-item__save-btn"
                                onClick={() => saveEditTask(task.id)}
                            >
                                Save
                            </button>

                            <button
                                className="todo-item__cancel-btn"
                                onClick={cancelEditTask}
                            >
                                Cancel
                            </button>
                        </div>
                    )
                    : (
                        <>
                            <div className="todo-item__content">
                                <span>{task.text}</span>

                                <small>
                                    {task.completed ? 'Completed Task' : 'Pending Task'}
                                </small>
                                {
                                    task.category && (
                                        <span className="todo-item__category">
                                            {task.category}
                                        </span>
                                    )
                                }
                            </div>

                            <div className="todo-item__actions">
                                <button
                                    onClick={() => startEditTask(task)}
                                    className="todo-item__edit-btn"
                                >
                                    <FaPencilAlt />
                                </button>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="todo-item__delete-btn"
                                >
                                    <FaTrashAlt />
                                </button>

                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className="todo-item__toggle-btn"
                                >
                                    <FaCheckCircle />
                                </button>
                            </div>
                        </>
                    )
            }
        </li>
    )
};

export default TodoItem;