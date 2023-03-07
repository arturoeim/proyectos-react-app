import React, {useEffect, useState} from 'react';
import {Formik } from 'formik';
import {useTasks} from '../context/TaskProvider';
import {useParams, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as yup from 'yup';
import swal from 'sweetalert';


const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

function TasksForm() {
  const {createTask, getTask, updateTask} = useTasks();

  const [task, setTask] = useState({
    title:"",
    description:""
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async ()=>{
      if(params.id){
        const response = await getTask(params.id);
        setTask({
          title: response.TITLE,
          description: response.DESCRIPCION
        });
      }
    };
    loadTask();
    
  }, [])
  

  return (
      <Formik 
        validationSchema={schema}
        enableReinitialize={true}
        initialValues={task}
        onSubmit={async (values, actions)=>{

          if(params.id){
            swal({
              title: "Confirmación",
              text: "¿Desea actualizar este registro?",
              icon: "info",
              buttons: true,
              dangerMode: true,
            })
              .then(async (willDelete) => {
                if (willDelete) {
                  await updateTask(values, params.id);
                  navigate("/tasks");
                }else{
                  return
                }
              });
            
          }else{
            swal({
              title: "Confirmación",
              text: "¿Desea enviar este registro?",
              icon: "info",
              buttons: true,
              dangerMode: true,
            })
              .then(async (willDelete) => {
                if (willDelete) {
                  await createTask(values);
                  actions.resetForm(); 
                  navigate("/tasks");
                }else{
                  return
                }
              });
            
          };

        }}

      >
        {({handleChange, handleSubmit, handleBlur, values, isSubmitting, errors})=>(
          <Card border="dark" className="contenedorCard2">
            <Form noValidate onSubmit={handleSubmit}>
            <Card.Header className='titulo'>
              {params.id ? "Edit Task":"Create Task"}
            </Card.Header>

              <Form.Group className='mb-3' controlId="validationFormikUsername1">
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend1">Titulo</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Escriba un titulo"
                    aria-describedby="inputGroupPrepend1"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    Porfavor ingrese un título
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className='mb-3' controlId="validationFormikUsername2">
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">Descipción</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Escriba una descipcion"
                    aria-describedby="inputGroupPrepend"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    Porfavor ingrese una descipción
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
                  
              <Button variant="success" type="submit" disabled={isSubmitting} >
                    {isSubmitting ? "Saving...":"Save"}
              </Button>
            </Form>
          </Card>
        )}
      </Formik>
  );
}

export default TasksForm;