import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Home';
import Login from './login/Login';
import Register from './login/Register';
import Contact_Us from './login/Contact_us';
import StuApp from './innerPage/App_model/StuApp';
import StuDoc from './innerPage/App_model/StuDoc';

function App() {
  return (

    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login /> } />
      <Route path='/register' element={<Register/>} />
      <Route path='/Contact Us' element={<Contact_Us/>} />
      <Route path='/StuApp' element={<StuApp />} />
      <Route path='/StuDoc' element={<StuDoc />} />

    </Routes>
    </>

  );
}

export default App;
