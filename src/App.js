import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Home';
import Login from './login/Login';
import Register from './login/Register';
import Contact_Us from './login/Contact_us';


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //   </header>
    // </div>
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login/' element={<Login /> } />
      <Route path='/register' element={<Register/>} />
      <Route path='/Contact Us' element={<Contact_Us/>} />
    </Routes>
    </>
  );
}

export default App;
