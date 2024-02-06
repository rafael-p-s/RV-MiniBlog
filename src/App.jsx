import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//context
import { AuthProvider } from "./context/AuthContext"; //prover autenticação.
import { onAuthStateChanged } from "firebase/auth"; //mapei se a autenticação do usuário foi feita corretamente.

//hooks:
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//pages
import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { NavBar } from "./components/navbar/NavBar";
import { Footer } from "./components/footer/Footer";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { CreatePost } from "./pages/createPost/CreatePost.jsx";
import { DashBoard } from "./pages/dashBoard/DashBoard.jsx";
import { Search } from "./pages/Search/Search.jsx";
import { Post } from "./pages/Post/Post.jsx";


function App() {
  const [user, setUser] = useState(undefined); //undefined, não tem ninguém identificado
  const { auth } = useAuthentication();

  const loadingUser = user === undefined; //está sendo atribuido o valor do usuário para comparar.
  //Com isso não vai carregar nada antes de ter a autenticação

  //Essa função \/, vai ser executado para validar a autenticação. Servindo para mapear se usuário está logado ou não
  useEffect(() => {
    //Está passando o valor de autenticação: user
    onAuthStateChanged(auth, (user) => {
      setUser(user); //usuário passado
    });
  }, [user]);

  //Enquanto carrega:
  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post/>} />             
              {/* Fazendo verificação se está logado ou não. */}
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/register" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                // Nesse caso, se o usuário estiver logado vai para pg, se ñ vai para a tela de Login
                element={user ? <DashBoard /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
