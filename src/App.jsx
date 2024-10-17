import './App.css'
import PaginaInicial from "./components/PaginaInicial.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import PaginaServicos from "./components/PaginaServicos.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useEffect} from "react";
import {data} from "./components/DataBase.jsx";

function App() {

    // Correção provisória do carregamento lento das imagens
    useEffect(() => {
        const preloadImages = () => {
            Object.values(data).flat().forEach(item => {
                const img = new Image();
                img.src = item.image;
                if (item.extra) {
                    const extraImg = new Image();
                    extraImg.src = item.extra;
                }
            });
        };

        preloadImages();
    }, []);
    // ----------------

  return (
      <>
          <Header/>
          <Routes>
                <Route path="/" element={<PaginaInicial/>}/>
                <Route path={`/acessorios`} element={<PaginaServicos/>}/>
                <Route path={`/comidas`} element={<PaginaServicos/>}/>
                <Route path={`/estetica`} element={<PaginaServicos/>}/>
                <Route path={`/manicure`} element={<PaginaServicos/>}/>
                <Route path={`/terapias`} element={<PaginaServicos/>}/>
                <Route path={`/servicos-comunitarios`} element={<PaginaServicos/>}/>
          </Routes>
          <Footer/>
          <div className={"background-pattern"}/>
          <div className={"background-image"}/>
          </>
          )
          }

          export default App
