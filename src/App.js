import logo from './logo.svg';
import './App.css';
import TransactionsList from './TransactionsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpLogo from './img/up-logo.jpg'
function App() {
  return (
    <div className="App">
    <img src={UpLogo} alt="Logo" />      
    <TransactionsList/ >
    </div>
  );
}

export default App;
