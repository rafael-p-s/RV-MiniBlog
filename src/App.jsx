import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { NavBar } from "./components/navbar/NavBar";
import { Footer } from "./components/footer/Footer";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
