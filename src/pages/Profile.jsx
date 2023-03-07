import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Cookies from 'universal-cookie';

function Profile() {

  const cookies = new Cookies();

  const perfil = {
    NOMBRE: cookies.get('NOMBRE_COMPLETO'),
    CEDULA: cookies.get('CEDULA'),
    CORREO: cookies.get('CORREO')
  };

  return (
    <div className="index">
        <div className="masthead-profile d-flex">
          <div className="container text-center">
              <h1>Bienvenido {perfil.NOMBRE}</h1>
              <h3>
                Revisa las Opciones de navegación en la parte superior
              </h3>
            </div>
        </div>
    </div>
  );
}

export default Profile