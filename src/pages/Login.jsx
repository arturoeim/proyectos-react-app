import React, {useEffect, useState, useContext} from 'react';
import { Formik } from 'formik';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import {LogContext} from '../App';
import {getUserLogin} from '../api/users.api';

const cookies = new Cookies();

function LoginForm() {

  const loginUser = async (user) =>{
    try {
      const response = await getUserLogin(user);
      return response.data;
    }catch (error) {
      return error;
    }
  };

  const {dispatch} = useContext(LogContext);

  const [user, setUser] = useState({
    cedula:"",
    contrasena:""
  });
    
  const navigate = useNavigate();
  
  useEffect(() => {
      
    setUser({
      cedula: "",
      contrasena: ""
    });
        
  },[])
    
  
  return (
    <div className='alineadorVertical'>
      <Formik
        initialValues={user}
        enableReinitialize={true}
        onSubmit={async (values, actions)=>{
          if(values.cedula!=='' && values.contrasena!==''){
            const response = await loginUser(
              {
                  cedula: values.cedula,
                  contrasena: values.contrasena
                }
              );
              if(response.length>1){
                var respuesta = response[1];
                cookies.set("ID",respuesta.ID, {path: "/"});
                cookies.set("CEDULA",respuesta.CEDULA, {path: "/"});
                cookies.set("TIPO",respuesta.TIPO, {path: "/"});
                cookies.set("NOMBRE_COMPLETO",respuesta.NOMBRE1+" "+respuesta.APELLIDO1, {path: "/"});
                cookies.set("CORREO",respuesta.CORREO, {path: "/"});

                actions.resetForm(); 

                dispatch({type: "USER", payload: true});
                navigate("/profile");
  
              }else{
                const message = response[0];
                swal("ALERTA",message,"error" );
              }
            }else{
              swal("ALERTA","Falta ingresar la cedula o contraseña","error" );
            };
            
            
          }
        }
      >
        {({handleChange, handleSubmit, handleBlur, values, isSubmitting})=>(

          <Card border="dark" className="contenedorCard2 my-auto">
            <Form noValidate onSubmit={handleSubmit}>
              <Card.Header className='titulo'>
                Login User
              </Card.Header>
                <img className='imglogin' src="../img/logo2.png" alt="Logo SDS"/>
                <Form.Group className='mb-3' controlId="validationFormikUsername1">
                  <FloatingLabel
                    controlId="inputGroupPrepend1"
                    label="Cedula"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Escriba una cedula"
                      aria-describedby="inputGroupPrepend1"
                      name="cedula"
                      autoComplete="username" 
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className='mb-3' controlId="validationFormikUsername2">
                  <FloatingLabel
                    controlId="inputGroupPrepend"
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      aria-describedby="inputGroupPrepend"
                      name="contrasena"
                      autoComplete="password" 
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Form.Group>
                    
                <Button variant="success" type="submit" disabled={isSubmitting} >
                      {isSubmitting ? "Ingresando...":"Ingresar"}
                </Button>
            </Form>
          </Card>
          
        )}
  
      </Formik>
    </div>
  )
}

export default LoginForm