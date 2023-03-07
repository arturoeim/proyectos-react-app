import axios from 'axios'

export const getFormulariosRequest = async () =>{
    return await axios.get('http://localhost:4000/formulario1')
};

export const createFormularioRequest = async (task) =>{
    return await axios.post('http://localhost:4000/formulario1',task)
};

export const getFormularioRequest = async (id) =>{
    return await axios.get(`http://localhost:4000/formulario1/${id}`)
};

export const deleteFormularioRequest = async (id) =>{
    return await axios.delete(`http://localhost:4000/formulario1/${id}`)
};

export const getDataRequest = async () =>{
    return await axios.get('http://localhost:4000/formulario1_data')
};

export const getCantonesRequest = async (cod) =>{
    return await axios.get(`http://localhost:4000/formulario1_can/${cod}`)
};

export const getParroquiasRequest = async (cod) =>{
    return await axios.get(`http://localhost:4000/formulario1_par/${cod}`)
};