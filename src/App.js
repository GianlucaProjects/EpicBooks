import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import HomeComponent from "./components/HomeComponent";
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AdminPanel from "./components/AdminPanel"; // Assicurati di importare il nuovo componente

function App() {
  const [booksList, setBooksList] = useState({ book: [] });
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsLogged(true);
      setUserRole(role);
    } else {
      setIsLogged(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLogged(false);
    setUserRole("");
  };

  const handleLogin = (status, role) => {
    setIsLogged(status);
    setUserRole(role);
  };

  const updateBooksList = (newBook) => {
    setBooksList((prevBooksList) => ({
      ...prevBooksList,
      book: [...prevBooksList.book, newBook],
    }));
  };

  return (
    <BrowserRouter>
      <header>
        <MyNavbar onLogout={handleLogout} isLogged={isLogged} userRole={userRole} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={isLogged ? <HomeComponent isLogged={isLogged} /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={isLogged ? <Navigate to="/" /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/addBook" element={isLogged ? <AddBook onUpdate={updateBooksList} /> : <Navigate to="/login" />} />
          <Route path="/bookList" element={isLogged ? <BooksList booksList={booksList} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={userRole === "ADMIN" ? <AdminPanel /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;