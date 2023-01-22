//import logo from './logo.svg';
//import './App.css';
import './components/index.scss'

import { BrowserRouter } from "react-router-dom"
import Header from './components/Header.js'
import Main from './components/Main.js'
import Footer from './components/Footer.js'
//import Filters from './components/Filters'
//import NavBar from './components/NavBar.js';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
