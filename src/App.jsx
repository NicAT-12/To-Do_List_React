import { useState } from "react";
import { filterTasks } from './utils/filterTasks';

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import StatsCard from "./components/StatsCard";

import { useTasks } from "./hooks/useTasks";
import { useCategories } from "./hooks/useCategories";

const App = () => {
  const {
    tasks,
    toggleTask,
    createTask,
    deleteTask,
    editTask,
    clearTasksCategory
  } = useTasks();

  const {
    categories,
    categoryName,
    setCategoryName,
    showCategoryInput,
    setShowCategoryInput,
    activeCategory,
    setActiveCategory,
    addCategory,
    deleteCategory
  } = useCategories();

  const [write, setWrite] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [editPriority, setEditPriority] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  function handleSubmit(e) {
    e.preventDefault();

    createTask({
      text: write,
      category: selectedCategory,
      priority: selectedPriority
    });

    setWrite('');
    setSelectedCategory('');
    setSelectedPriority('medium');
  };

  const startEditTask = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditCategory(task.category);
    setEditPriority(task.priority);
  };

  function saveEditTask(idToEdit) {
    if (editText.trim() === '') return;

    editTask(idToEdit, {
      text: editText,
      category: editCategory,
      priority: editPriority
    });

    setEditingId(null);
    setEditText('');
    setEditCategory('');
    setEditPriority('medium');
  }

  const completedTasks = tasks.filter((task) => {
    return task.completed
  });

  const pendingTasks = tasks.filter((task) => {
    return !task.completed
  });

  const cancelEditTask = () => {
    setEditingId(null);
    setEditText('');
  };

  const visibleTasks = filterTasks({
    tasks,
    filter,
    activeCategory,
    priorityFilter,
    search
  });

  return (
    <main className="todo-app">
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        addCategory={addCategory}
        showCategoryInput={showCategoryInput}
        setShowCategoryInput={setShowCategoryInput}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        deleteCategory={deleteCategory}
        tasks={tasks}
        clearTasksCategory={clearTasksCategory}
      />

      <section className="todo-main">
        <Header
          search={search}
          setSearch={setSearch}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
        <section className="stats">
          <StatsCard title="Total Tasks" value={tasks.length} />
          <StatsCard title="Completed" value={completedTasks.length} />
          <StatsCard title="Pending" value={pendingTasks.length} />
        </section>
        <div className="app">
          <h1 className="app__title">TO DO</h1>

          <TodoForm
            write={write}
            setWrite={setWrite}
            handleSubmit={handleSubmit}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
          />

          <TodoList
            visibleTasks={visibleTasks}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            startEditTask={startEditTask}
            saveEditTask={saveEditTask}
            cancelEditTask={cancelEditTask}
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            categories={categories}
            editPriority={editPriority}
            setEditPriority={setEditPriority}
          />
        </div>
      </section>
    </main>
  )
};

export default App;