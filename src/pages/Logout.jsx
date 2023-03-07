import React, {useEffect, useContext}  from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {LogContext} from '../App';

const cookies = new Cookies();

function Logout() {

  const { dispatch} = useContext(LogContext);
  const navigate = useNavigate();
  
  const func = async ()=>{
    cookies.remove('ID', {path: "/"});
    cookies.remove('CEDULA', {path: "/"});
    cookies.remove('TIPO', {path: "/"});
    cookies.remove('NOMBRE_COMPLETO', {path: "/"});
    cookies.remove('CORREO', {path: "/"});

    dispatch({type: "USER", payload: false});

    navigate("/login");
  }; 

  useEffect(() => {
    func();
  }, [])
  

  return (
    <div>Cargando</div>
  )
}

export default Logout