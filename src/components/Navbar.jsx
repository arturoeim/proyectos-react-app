import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import IconBarChartLine from './icon1';
import {LogContext} from '../App';
import {Link} from 'react-router-dom';

function NavbarComponent(props) {
  const {state, dispatch} = useContext(LogContext);
  
  /*if(props.ID!==undefined){
    dispatch({type: "USER", payload: true})
  };*/

  function renderMain2(){
    if(state){
      return (
        <Nav className="">
    
          <NavDropdown title="Formularios" id="collasible-nav-dropdown" menuVariant="dark">  
            
            <li className='dropdown-submenu'>
              <Link to="/newForm1" className='narBarText2'>Registrar Formulario 1</Link>
            </li>
            <NavDropdown.Divider/>
            <li className='dropdown-submenu'>
              <Link to="/forms1" className='narBarText2'>Registros Formulario 1 Realizados</Link>
            </li>
            
          </NavDropdown>

          <NavDropdown title="Mas opciones" id="collasible-nav-dropdown2" menuVariant="dark">              
            <li>
              <Link to="/profile" className='narBarText2'>Perfil</Link>
            </li>
            <NavDropdown.Divider/>
            <li>
              <Link to="/logout" className='narBarText2'>Cerrar sesión</Link>
            </li>
          </NavDropdown>

        </Nav>
      )
    }else{
      return (
        <Nav className="">
          <Link to="/login" className='narBarText'>Ingresar</Link>
        </Nav>
        )
    }
  };

  return ( 
      <Navbar className='' bg="dark" expand="lg" variant="dark">
        <Container>
          <Container>
            <Navbar.Brand>
              
              <IconBarChartLine/>
              <Link to="/" className='narBarText'> Home</Link>
               
            </Navbar.Brand>
          </Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
  
            <Nav className="">
  
              {renderMain2()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavbarComponent