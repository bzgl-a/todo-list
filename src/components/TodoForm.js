import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [newTodo, setNewTodo] = useState("");

  const handleClick = () => {
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="input__container">
      <input
        type="text"
        className="todo__input"
        placeholder="Название задачи"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleClick();
        }}
      />
      <button className="todo__btn" onClick={handleClick}>
        Добавить задачу
      </button>
    </div>
  );
}
