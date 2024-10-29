
import './App.css';
import Inscription from './auth/Inscription';
import Connexion from './auth/Connexion';
import Balise from './auth/balise';
import Bb from './bb';
import Sidebar from './components/Sidebar';
import React from 'react';
import ChampInput from './auth/ChampInput';
import frFR from 'antd/lib/locale/fr_FR';
import Back from './back';
import ReactDOM from 'react-dom';
import ajoutbalise from './auth/ajoutbalise';
import  Update  from './auth/update';
import Ajoutb from './auth/ajoutb';
import UserProfile from './UserProfile';
import ForgotPassword from './auth/Connexion/ForgotPassword';
import ResetPassword from './auth/Connexion/ResetPassword';
import DemandeTestComponent from './auth/demandetest';
import Bureauetude from './auth/bureauetude';
import AddTestRequest from './auth/AddTestRequest';

import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Ajoutbalise from './auth/ajoutbalise';
import BureauDetude from './auth/bureauetude';






function App() {
  return (
    <BrowserRouter>
   
     <div className="main">
     
      <Sidebar />
 
      <div className='container'>
      
    
    <Routes>
   <Route path="/register" element={<Inscription/>}/>
   <Route exact path="/connecter" element={<Connexion/>}/>
   <Route path="/listb" element={<Balise/>}/>
   <Route path="/listtest" element={<DemandeTestComponent/>}/>
   <Route path="/bureauetude" element={<BureauDetude/>}/>
   <Route path="/notif" element={<AddTestRequest/>}/>
   <Route path="/list" element={<Bb/>}/>
   <Route path="/liste" element={<ChampInput/>}/>
   <Route path="/ajout" element={<Ajoutb/>}/>
   <Route path="/update/:id" element={<Update/>}></Route>
   <Route path="/user" element={<UserProfile />}/>
   <Route path="/forgot-password" element={<ForgotPassword />} />
   <Route path="/password/reset" element={<ResetPassword />} />
   </Routes>
   
    </div>
    </div>
    </BrowserRouter>
      
    
  );
}

export default App;
