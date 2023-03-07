import React, {useEffect} from 'react';
import TaskCard from '../components/TaskCard';
import {useForms1} from '../context/Formu1Provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Forms1Page() {
  const {forms1,  loadForms1} = useForms1();

  useEffect(()=>{
    loadForms1()
  }, []);

  function renderMain(){

    if(forms1.length ===0 ){
      return (
      <h1>No hay tareas registradas </h1>
      )
    }
    
    return forms1.map((task) => <TaskCard task={task} key={task.ID} />);
    
  };

  return (
    <div>
      <h1 className='titulo2'>Tareas Realizadas</h1>

      <Container>
        <Row md={3}>
          {renderMain()}
        </Row>
      </Container>
      
      
    </div>
  );
}

export default Forms1Page