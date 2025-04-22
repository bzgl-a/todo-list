import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../styles/Auth.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (storedUsers.some((u) => u.username === username)) {
      alert("Пользователь с таким именем уже существует!");
      return;
    }

    const newUser = { username, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    localStorage.setItem(`tasks_${username}`, JSON.stringify([]));

    login(username, password);
    alert("Регистрация успешна!");
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-group">
          <input
            type="text"
            className="auth__input"
            value={username}
            placeholder=" "
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="auth__label">Имя</label>
        </div>
        <div className="auth__input-group">
          <input
            type="password"
            className="auth__input"
            value={password}
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="auth__label">Пароль</label>
        </div>
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p>
        Уже есть аккаунт?{" "}
        <a className="auth__link" href="/login">
          Войти
        </a>
      </p>
    </div>
  );
}

export default Register;
