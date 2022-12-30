//import logo from './logo.svg';
//import './App.css';
import './components/index.scss'
import Header from './components/Header.js'
import ItemListContainer from './components/ItemListContainer.js'
import Footer from './components/Footer.js'
//import NavBar from './components/NavBar.js';

function App() {
  return (
    <>
      <Header isHeader={true} />
      <ItemListContainer greeting="alojaaa" />
      <Footer />
    </>

    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <NavBar />
    </div>
    */
  );
}

export default App;
