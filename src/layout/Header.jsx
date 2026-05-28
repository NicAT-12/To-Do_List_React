const Header = ({ search, setSearch, priorityFilter, setPriorityFilter }) => {
    return (
        <header className="header">
            <div>
                <p className="header__subtitle">Welcome</p>
                <h1 className="header__title">Manage your tasks</h1>
            </div>

            <div className="header__search">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            
            <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="header__priority-filter"
            >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </header>
    );
};

export default Header;