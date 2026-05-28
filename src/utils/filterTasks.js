export function filterTasks({
    tasks,
    filter,
    activeCategory,
    priorityFilter,
    search
}) {
    return tasks.filter((task) => {
        const matchesFilter =
            filter === 'all' ||
            filter === 'completed' && task.completed ||
            filter === 'pending' && !task.completed;

        const matchesCategory =
            activeCategory === '' || task.category === activeCategory;

        const matchesPriority =
            priorityFilter === 'all' ||
            task.priority === priorityFilter;

        const normalizedText = task.text.toLowerCase();
        const normalizedSearch = search.trim().toLowerCase();

        const matchesSearch = normalizedText.includes(normalizedSearch);

        return matchesFilter && matchesSearch && matchesCategory && matchesPriority;
    });
}