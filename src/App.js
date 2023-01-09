//import logo from './logo.svg';
//import './App.css';
import './components/index.scss'
import Header from './components/Header.js'
import Main from './components/Main.js'
import Footer from './components/Footer.js'
//import NavBar from './components/NavBar.js';


function App() {
  return (
    <>
      <Header isHeader={true} />
      <Main />
      <Footer />
    </>
  );
}

export default App;
