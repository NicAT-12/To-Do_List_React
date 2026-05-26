const Header = ({search, setSearch}) => {
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
        </header>
    );
};

export default Header;