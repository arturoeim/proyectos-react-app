import React from 'react';
import {Formik } from 'formik';
import {useForms1} from '../context/Formu1Provider';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as yup from 'yup';
import swal from 'sweetalert';


const schema = yup.object().shape({
    cedula: yup.string().required(),
    description: yup.string().required(),
});

function Formu1Form() {
    const {createForm1} = useForms1();

    const navigate = useNavigate();

    return (
      <Formik 
        validationSchema={schema}
        enableReinitialize={true}
        onSubmit={async (values, actions)=>{

            swal({
              title: "Confirmación",
              text: "¿Desea enviar este registro?",
              icon: "info",
              buttons: true,
              dangerMode: true,
            })
            .then(async (willDelete) => {
                if (willDelete) {
                  await createForm1(values);
                  actions.resetForm(); 
                  navigate("/forms1");
                }else{
                  return
                }
            });

        }}

      >
        {({handleChange, handleSubmit, handleBlur, values, isSubmitting, errors})=>(
            <Card border="dark" className="contenedorCard2">
                <Form noValidate onSubmit={handleSubmit}>
                <Card.Header className='titulo'>
                Registrar Formulario1
                </Card.Header>
                    <h6 className="subtitulo2">Escriba su cédula para empezar con el formulario</h6>

                    <Form.Group className='mb-3' controlId="validationFormikUsername1" id="pregunta1">
                        <InputGroup hasValidation >
                            <InputGroup.Text id="inputGroupPrepend1">Cédula de Identidad</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Escriba una cedula"
                                aria-describedby="inputGroupPrepend1"
                                name="cedula"
                                onChange={handleChange}
                                isInvalid={!!errors.cedula}
                            />
                            <Form.Control.Feedback type="invalid">
                                Porfavor ingrese un título
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId="validationFormikUsername2" id="pregunta2">
                        <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">Descipción</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Escriba una descipcion"
                            aria-describedby="inputGroupPrepend"
                            name="description"
                            onChange={handleChange}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            Porfavor ingrese una descipción
                        </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    
                    <Button variant="success" type="submit" disabled={isSubmitting} >
                            {isSubmitting ? "Enviando...":"Enviar"}
                    </Button>
                </Form>
            </Card>
        )}
      </Formik>
  );
}

export default Formu1Form;