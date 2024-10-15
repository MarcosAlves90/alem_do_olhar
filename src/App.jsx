import './App.css'
import PaginaInicial from "./components/PaginaInicial.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";
import PaginaServicos from "./components/PaginaServicos.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

    const { selectedService } = useContext(UserContext);

  return (
      <>
          <Header/>
          <Routes>
              <Route path="/" element={<PaginaInicial/>}/>
              <Route path={`/${selectedService}`} element={<PaginaServicos/>}/>
          </Routes>
          <Footer/>
          <div className={"background-pattern"}/>
          <div className={"background-image"}/>
          </>
          )
          }

          export default App
