import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import HomeComponent from "./components/HomeComponent";
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const [booksList, setBooksList] = useState({ book: [] });
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token); // Debugging: mostra il token JWT trovato
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  const handleLogin = (status) => {
    setIsLogged(status);
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
        <MyNavbar onLogout={handleLogout} isLogged={isLogged} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={isLogged ? <HomeComponent isLogged={isLogged} /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={isLogged ? <Navigate to="/" /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/addBook" element={isLogged ? <AddBook onUpdate={updateBooksList} /> : <Navigate to="/login" />} />
          <Route path="/bookList" element={isLogged ? <BooksList booksList={booksList} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
