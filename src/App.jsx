import { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";


import TodoItem from "./components/TodoItem";

const App = () => {
  const [tasks, setTasks] = useState([]);
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
  return (
    <main className="app">
      <h1 className="app__title">TO-DO</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          onChange={(e) => setWrite(e.target.value)}
          value={write}
          type="text"
          placeholder="Add a task..."
        />

        <button type="submit">
          <MdOutlineAddCircleOutline />
        </button>
      </form>

      <ul className="todo-list">
        {
          tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              startEditTask={startEditTask}
              saveEditTask={saveEditTask}
            />
          ))
        }
      </ul>
    </main>
  )
};

export default App;