export function sortTasks(tasksToSort) {
    const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
    };

    return tasksToSort.toSorted((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed - b.completed;
        }

        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}