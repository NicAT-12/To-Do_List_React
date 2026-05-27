import { useState, useEffect } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import StatsCard from "./components/StatsCard";

const App = () => {
  const [write, setWrite] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('savedTasks');

    try {
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('savedCategories');

    try {
      return savedCategories ? JSON.parse(savedCategories) : []
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('savedTasks', JSON.stringify(tasks));
    localStorage.setItem('savedCategories', JSON.stringify(categories));
  }, [tasks, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (write.trim() === '') return;

    setTasks([
      ...tasks,
      {
        text: write,
        completed: false,
        id: Date.now(),
        category: selectedCategory
      }
    ]);

    setWrite('');
    setSelectedCategory('');
  };

  const deleteTask = (idToDelete) => {
    setTasks(
      tasks.filter((task) => {
        return task.id !== idToDelete;
      })
    );
  };

  const toggleTask = (idToToggle) => {
    const updatedTasks =
      tasks.map((task) => {
        if (task.id === idToToggle) {
          return {
            ...task,
            completed: !task.completed
          }
        };
        return task
      });

    const sortedTasks = updatedTasks.toSorted((a, b) => {
      return a.completed - b.completed;
    });

    setTasks(sortedTasks);
  };

  const startEditTask = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditCategory(task.category);
  };

  const saveEditTask = (idToEdit) => {
    if (editText.trim() === '') return;

    setTasks(
      tasks.map((task) => {
        if (task.id === idToEdit) {
          return {
            ...task,
            text: editText,
            category: editCategory
          }
        }
        return task
      })
    )
    setEditingId(null);
    setEditText('');
    setEditCategory('');
  };

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

  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      filter === 'completed' && task.completed ||
      filter === 'pending' && !task.completed;

    const matchesCategory =
      activeCategory === '' || task.category === activeCategory;

    const normalizedText = task.text.toLowerCase();
    const normalizedSearch = search.trim().toLocaleLowerCase();

    const matchesSearch = normalizedText.includes(normalizedSearch);

    return matchesFilter && matchesSearch && matchesCategory;
  });

  const addCategory = () => {
    if (categoryName.trim() === '') return;

    const duplicated = categories.find((category) => {
      return category.toLowerCase() === categoryName.toLowerCase()
    });

    if (duplicated) return;

    setCategories([
      ...categories,
      categoryName
    ]);

    setCategoryName('');
    setShowCategoryInput(false);
  };

  const deleteCategory = (categoryToRemove) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');

    if (!confirmDelete) return;
    setCategories(
      categories.filter((category) => {
        return category !== categoryToRemove
      }));

    setTasks(
      tasks.map((task) => {
        if (task.category === categoryToRemove) {
          return {
            ...task,
            category: 'No category'
          }
        }
        return task
      })
    );

    setActiveCategory('');
  };

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
      />

      <section className="todo-main">
        <Header
          search={search}
          setSearch={setSearch}
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
          />
        </div>
      </section>
    </main>
  )
};

export default App;