import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoWrapper from "./components/TodoWrapper";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <TodoWrapper />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = React.useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default App;
