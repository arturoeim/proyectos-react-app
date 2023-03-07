import React from 'react';
import {useTasks} from '../context/TaskProvider';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function TaskCard({task}) {
  const {deleteTask, toggleTaskDone} = useTasks();
  const navigate = useNavigate();
  return (
    <div className='col'> 
      <Card className='contenedorCard'>
        <Card.Header className='titulo'>
          {task.TITLE}
        </Card.Header>
        <Card.Body>
          <Card.Title><span>{task.DONE === 1 ? "Hecho ✔️": "Por hacer 💤"} </span></Card.Title>
          <Card.Text>
            {task.DESCRIPCION}
            <br></br>
            <span>{task.CREATE_AT}</span>
          </Card.Text>
          
          <Button className='me-1' variant="danger" onClick={()=>{ deleteTask(task.ID)}}>Delete</Button>
          <Button className='me-1' variant="warning" onClick={()=>{ navigate('/edit/'+task.ID)}}>Editar</Button>
          <Button className='me-1' variant="success" onClick={()=>{ toggleTaskDone(task.ID)}}>Toggle Done</Button>
        </Card.Body>
      </Card>
      
    </div>
  )
}

export default TaskCard