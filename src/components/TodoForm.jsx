import { MdOutlineAddCircleOutline } from "react-icons/md";

const TodoForm = ({ write, setWrite, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                onChange={(e) => setWrite(e.target.value)}
                value={write}
                type="text"
                placeholder="Add a task..."
            />

            <button type="submit">
                <MdOutlineAddCircleOutline />
            </button>
        </form>
    );
};

export default TodoForm;