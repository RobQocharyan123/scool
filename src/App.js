import "./App.css";
import { Login } from "./components/login/Login";
import { Routes , Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Register } from './components/register/Register';
import { ForgetPass } from './components/forgetpass/ForgetPass';
import { NewPass } from './components/forgetpass/NewPass';
import { Lifestyle } from './components/vote/Lifestyle';
import { Tasty } from "./components/vote/Tasty";
import { Discovering } from "./components/vote/Discovering";
import { Community } from './components/vote/Community';
import AplicationForm from "./components/aplicationform/AplicationForm";
import ProgramAbout from "./components/home/ProgramAbout";
import { Touch } from './components/home/Touch';


function App() {

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <div className="routes">
        <Routes>
          <Route path="/" element={<ProgramAbout />} />
          <Route path="/aplicationform" element={<AplicationForm />} />
          <Route path="/
          " element={<Lifestyle />} />
          <Route path="/tasty" element={<Tasty />} />
          <Route path="/discovering" element={<Discovering />} />
          <Route path="/community" element={<Community />} />
          <Route path="login" element={<Login />} />
          <Route path="forgetpass" element={<ForgetPass />} />
          <Route path="newpass" element={<NewPass />} />
          <Route path="register" element={<Register />} />
          <Route path="touch" element={<Touch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
