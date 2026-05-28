import { MdOutlineAddCircleOutline } from "react-icons/md";

const TodoForm = ({
    write,
    setWrite,
    handleSubmit,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority
}) => {
    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="todo-form__field">
                <small>Task</small>
                <input
                    onChange={(e) => setWrite(e.target.value)}
                    value={write}
                    type="text"
                    placeholder="Add a task..."
                />
            </div>

            <div className="todo-form__field">
                <small>Category</small>
                <select
                    value={selectedCategory}
                    onChange={
                        (e) => setSelectedCategory(e.target.value)
                    }
                >
                    <option value="">
                        No category
                    </option>
                    {
                        categories.map((category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="todo-form__field">
                <small>Priority</small>
                <select
                    value={selectedPriority}
                    onChange={
                        (e) => setSelectedPriority(e.target.value)
                    }
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            <button type="submit">
                <MdOutlineAddCircleOutline />
            </button>
        </form>
    );
};

export default TodoForm;