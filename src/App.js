import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Home';
import Login from './login/Login';
import Register from './login/Register';
import Contact_Us from './login/Contact_us';
import StuApp from './innerPage/App_model/StuApp';
import StuDoc from './innerPage/App_model/StuDoc';
import DigiDemo from './DigiDemo'

function App() {
  return (

    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login /> } />
      <Route path='/register' element={<Register/>} />
      <Route path='/contact' element={<Contact_Us/>} />
      <Route path='/StuApp' element={<StuApp />} />
      <Route path='/StuDoc' element={<StuDoc />} />
      <Route path='/digidemo' element={<DigiDemo />} />

    </Routes>
    </>

  );
}

export default App;
