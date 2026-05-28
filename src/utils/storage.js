export function loadTasks() {
    const savedTasks = localStorage.getItem('savedTasks');

    return savedTasks ? JSON.parse(savedTasks) : [];
}

export function saveTasks(tasks) {
    localStorage.setItem(
        'savedTasks',
        JSON.stringify(tasks)
    );
}

export function loadCategories() {
    const savedCategories = localStorage.getItem('savedCategories');

    return savedCategories
        ? JSON.parse(savedCategories)
        : [];
}

export function saveCategories(categories) {
    localStorage.setItem(
        'savedCategories',
        JSON.stringify(categories)
    );
}