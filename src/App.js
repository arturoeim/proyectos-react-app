import React, {createContext, useReducer} from 'react';
import {Route, Routes} from 'react-router-dom';

import Forms1Page from './pages/Formu1Page';
import Formu1Form from './pages/Formu1Form';

import NotFound from './pages/NotFound';
import NavbarComponent from './components/Navbar';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import LoginForm from './pages/Login';
import Logout from './pages/Logout';
import {TastContextProvider} from './context/TaskProvider';
import {Formu1ContextProvider} from './context/Formu1Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {reducer, initialState} from './reducer/UserReducer';
import Cookies from 'universal-cookie';

export const LogContext = createContext();

const Routin = ()=>{
  return(
    <TastContextProvider>
      <Formu1ContextProvider>
        <Routes>
          <Route path="/" element={<HomePage/>}/>

          <Route path="/forms1" element={<Forms1Page/>}/>
          <Route path="/newForm1" element={<Formu1Form/>}/>

          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/profile" element={<Profile/>}/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Formu1ContextProvider>
    </TastContextProvider>
  )
};

const App = ()=> {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cookies = new Cookies();
  const id = cookies.get('ID');
  return (
    
    <div className='body'>
      <LogContext.Provider value ={{state, dispatch}}>
        <NavbarComponent ID={id} />
        <Routin/>
      </LogContext.Provider>  
    </div>
      
  )
};

export default App;
