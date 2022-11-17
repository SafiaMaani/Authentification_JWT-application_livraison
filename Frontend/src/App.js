import {Routes, Route} from 'react-router-dom'
import './App.css';
import NavBar from './Components/pages/Navbar';
import Footer from './Components/pages/Footer';
import Welcome from './Components/pages/Welcome';
import Login from './Components/pages/Login'
import ProfileUser from './Components/pages/Protected/Profile'
// import ProtectedProfile from './Components/pages/Protected/Protected';
import Register from './Components/pages/Register'
import ForgetPassword from './Components/pages/ForgetPassword';
import ResetPassword from './Components/pages/ResetPassword';
import NotFound from './Components/pages/NotFound';

function App() {
  return (
    <div className="App flex flex-col">
      <NavBar />
        <Routes>
          <Route path='/' element={<Welcome/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          {/* <Route element={<ProtectedProfile roles={["client", "manager", "livreur"]}/>}> */}
            <Route path='/profile/:role' element={<ProfileUser/>} />
          {/* </Route> */}
          <Route path='/forgetpassword' element={<ForgetPassword/>} />
          <Route path='/resetpassword/:token' element={<ResetPassword/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
