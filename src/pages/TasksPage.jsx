import React, {useEffect} from 'react';
import TaskCard from '../components/TaskCard';
import {useTasks} from '../context/TaskProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function TasksPage() {
  const {tasks,  loadTask} = useTasks();

  useEffect(()=>{
    loadTask()
  }, []);

  function renderMain(){

    if(tasks.length ===0 ){
      return (
      <h1>No hay tareas registradas </h1>
      )
    }
    
    return tasks.map((task) => <TaskCard task={task} key={task.ID} />);
    
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

export default TasksPage