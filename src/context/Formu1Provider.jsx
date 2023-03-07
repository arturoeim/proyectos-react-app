import {useContext, useState} from 'react';
import {getFormulariosRequest, createFormularioRequest, getFormularioRequest, deleteFormularioRequest} from '../api/form1.api';
import {Formu1Context} from './Formu1Context';

export const useForms1 = ()=>{
    const context = useContext(Formu1Context);
    if(!context){
        throw new Error("useForms1 must be used within a TaskConextProvider");
    }
    return context;

};

export const Formu1ContextProvider = ({children}) =>{
    const [forms1, setForms1] = useState([]);

    async function loadForms1(){
        const response = await getFormulariosRequest()
        setForms1(response.data);
    };

    const deleteForm1 = async (id) =>{
        try {
            await deleteFormularioRequest(id);
            setForms1(forms1.filter(task => task.ID !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const createForm1 = async (task) =>{
        try {
            await createFormularioRequest(task);
          } catch (error) {
            console.log(error);
          };
    };

    const getForm1 = async (id) =>{
        try {
            const response = await getFormularioRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <Formu1Context.Provider value={{forms1, loadForms1, deleteForm1, createForm1, getForm1}} >
        {children}
    </Formu1Context.Provider>);
};