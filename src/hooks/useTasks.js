import { useEffect, useState } from 'react';
import { sortTasks } from '../utils/sortTasks';
import { loadTasks, saveTasks } from '../utils/storage';

export function useTasks() {
    const [tasks, setTasks] = useState(loadTasks);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    function createTask(taskData) {
        if (taskData.text.trim() === '') return;

        const newTask = {
            id: crypto.randomUUID(),
            text: taskData.text,
            completed: false,
            category: taskData.category,
            priority: taskData.priority
        };

        const newTasks = [
            ...tasks,
            newTask
        ];

        setTasks(sortTasks(newTasks));
    }

    function toggleTask(idToToggle) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === idToToggle) {
                return {
                    ...task,
                    completed: !task.completed
                };
            };

            return task;
        });

        setTasks(sortTasks(updatedTasks));
    };

    function deleteTask(idToDelete) {
        setTasks(
            tasks.filter((task) => {
                return task.id !== idToDelete;
            })
        );
    }

    function editTask(idToEdit, updatedData) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === idToEdit) {
                return {
                    ...task,
                    ...updatedData
                };
            }

            return task;
        });

        setTasks(sortTasks(updatedTasks));
    }

    function clearTasksCategory(categoryToRemove) {
        const updatedTasks = tasks.map((task) => {
            if (task.category === categoryToRemove) {
                return {
                    ...task,
                    category: ''
                };
            }

            return task;
        });

        setTasks(updatedTasks);
    };

    return {
        tasks,
        toggleTask,
        createTask,
        deleteTask,
        editTask,
        clearTasksCategory
    }
};