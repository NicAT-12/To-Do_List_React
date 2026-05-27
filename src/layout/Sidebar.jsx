import { FaCheck } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const Sidebar = ({
    filter,
    setFilter,
    categories,
    categoryName,
    setCategoryName,
    addCategory,
    showCategoryInput,
    setShowCategoryInput,
    activeCategory,
    setActiveCategory,
    deleteCategory,
    tasks
}) => {
    return (
        <aside className="sidebar">
            <div className="sidebar__brand">
                <div className="sidebar__logo">
                    T
                </div>

                <h2 className="sidebar__title">TaskFlow</h2>
            </div>

            <nav className="sidebar__nav">
                <h3 className="sidebar__subtitle">
                    General
                </h3>

                <div className="sidebar__filters">
                    <button
                        onClick={() => {
                            setFilter('all');
                            setActiveCategory('');
                        }}
                        className={
                            filter === 'all' && activeCategory === ''
                                ? 'sidebar__link sidebar__link--active'
                                : 'sidebar__link'
                        }
                    >
                        All Tasks
                    </button>

                    <button
                        onClick={() => {
                            setFilter('pending');
                            setActiveCategory('');
                        }}
                        className={
                            filter === 'pending' && activeCategory === ''
                                ? 'sidebar__link sidebar__link--active'
                                : 'sidebar__link'
                        }
                    >
                        Pending
                    </button>

                    <button
                        onClick={() => {
                            setFilter('completed');
                            setActiveCategory('');
                        }}
                        className={
                            filter === 'completed' && activeCategory === ''
                                ? 'sidebar__link sidebar__link--active'
                                : 'sidebar__link'
                        }
                    >
                        Completed
                    </button>
                </div>
            </nav>

            <div className="sidebar__categories">
                <div className="sidebar__categories-header">
                    <h3 className="sidebar__subtitle">
                        Categories
                    </h3>

                    <button
                        className="sidebar__add-category-btn"
                        onClick={() => setShowCategoryInput(!showCategoryInput)}
                    >
                        +
                    </button>
                </div>

                {
                    showCategoryInput && (
                        <div className="sidebar__category-form">
                            <input
                                onChange={(e) => setCategoryName(e.target.value)}
                                value={categoryName}
                                type="text"
                                placeholder="New category..."
                            />

                            <button
                                className="sidebar__category-submit"
                                onClick={addCategory}
                            >
                                <FaCheck />
                            </button>
                        </div>
                    )
                }

                {
                    categories.length === 0
                        ? (
                            <p className="sidebar__empty-categories">
                                No categories yet
                            </p>
                        )
                        : (
                            categories.map((category) => {

                                const quantityTasksIntoCategory = tasks.filter((task) => {
                                    return task.category === category;
                                }).length;

                                return (
                                    <div
                                        key={category}
                                        className={
                                            activeCategory === category
                                                ? 'sidebar__category sidebar__category--active'
                                                : 'sidebar__category'
                                        }
                                    >
                                        <button
                                            onClick={() => setActiveCategory(category)}
                                            className="sidebar__category-name"
                                        >
                                            {category} ({quantityTasksIntoCategory})
                                        </button>

                                        <button
                                            onClick={() => deleteCategory(category)}
                                            className="sidebar__category-delete"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                );
                            })
                        )
                }
            </div>
        </aside>
    )
};

export default Sidebar;