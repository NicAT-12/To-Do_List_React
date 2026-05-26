import { MdOutlineAddCircleOutline } from "react-icons/md";

const TodoForm = ({
    write,
    setWrite,
    handleSubmit,
    categories,
    selectedCategory,
    setSelectedCategory
}) => {
    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                onChange={(e) => setWrite(e.target.value)}
                value={write}
                type="text"
                placeholder="Add a task..."
            />

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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

            <button type="submit">
                <MdOutlineAddCircleOutline />
            </button>
        </form>
    );
};

export default TodoForm;