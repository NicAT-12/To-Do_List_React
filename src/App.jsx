import { useState, useEffect } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('savedTasks');

    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });
  const [write, setWrite] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (write.trim() === '') return;

    setTasks([
      ...tasks,
      {
        text: write,
        completed: false,
        id: Date.now()
      }
    ]);

    setWrite('');
  };

  const deleteTask = (idToDelete) => {
    setTasks(
      tasks.filter((task) => {
        return task.id !== idToDelete;
      })
    );
  };

  const toggleTask = (idToToggle) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === idToToggle) {
          return {
            ...task,
            completed: !task.completed
          }
        };
        return task;
      })
    );
  };

  const startEditTask = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEditTask = (idToEdit) => {
    if (editText.trim() === '') return;

    setTasks(
      tasks.map((task) => {
        if (task.id === idToEdit) {
          return {
            ...task,
            text: editText
          }
        }
        return task
      })
    )
    setEditingId(null);
    setEditText('');
  };

  useEffect(() => {
    localStorage.setItem('savedTasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className="app">
      <h1 className="app__title">TO-DO</h1>

      <TodoForm
        write={write}
        setWrite={setWrite}
        handleSubmit={handleSubmit}
      />

      <TodoList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
        startEditTask={startEditTask}
        saveEditTask={saveEditTask}
      />
    </main>
  )
};

export default App;