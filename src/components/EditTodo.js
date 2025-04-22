import React, { useState } from "react";

const EditTodo = React.memo(({ toggleEdit, task }) => {
  const [editedTask, setEditedTask] = useState("");

  const handleClick = () => {
    if (editedTask.trim() !== "") {
      toggleEdit(task.id, editedTask);
      setEditedTask("");
    }
  };
  return (
    <div className="input__container">
      <input
        type="text"
        value={editedTask}
        setEditedTask
        onChange={(e) => setEditedTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleClick();
        }}
        className="todo__input"
        placeholder="Обновите задачу"
      />
      <button type="button" onClick={handleClick} className="todo__btn">
        Сохранить
      </button>
    </div>
  );
});

export default EditTodo;
