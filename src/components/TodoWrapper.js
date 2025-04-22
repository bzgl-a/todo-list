import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../styles/TodoWrapper.css";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodo from "./EditTodo";

export default function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.username) {
      const savedTodos = JSON.parse(
        localStorage.getItem(`tasks_${user.username}`)
      );
      if (savedTodos) {
        setTodos(savedTodos);
      }
    }
  }, [user]);

  const saveTodosToLocalStorage = (updatedTodos) => {
    if (user?.username) {
      localStorage.setItem(
        `tasks_${user.username}`,
        JSON.stringify(updatedTodos)
      );
    }
  };

  const addTodo = (value) => {
    if (!value.trim()) return;
    const newTodo = {
      task: value,
      id: Date.now(),
      isCompleted: false,
      isEditing: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const toggleEdit = (id, task) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="todo__wrapper">
      <h2 className="todo__title">Список задач</h2>

      <TodoForm addTodo={addTodo} />

      <ul className="todo__list">
        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTodo key={todo.id} toggleEdit={toggleEdit} task={todo} />
          ) : (
            <Todo
              key={todo.id}
              id={todo.id}
              task={todo.task}
              isCompleted={todo.isCompleted}
              removeTodo={removeTodo}
              toggleComplete={toggleComplete}
              toggleEdit={toggleEdit}
            />
          )
        )}
      </ul>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}
