import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../styles/Auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      login(username, password);
      navigate("/todo");
    } else {
      alert("Неверное имя пользователя или пароль!");
    }
  };

  return (
    <div className="auth-wrapper">
      <h2 className="auth__title">Вход</h2>
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
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
      <p>
        Нет аккаунта?{" "}
        <a className="auth__link" href="/register">
          Зарегистрироваться
        </a>
      </p>
    </div>
  );
}

export default Login;
