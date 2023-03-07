import {useContext, useState} from 'react';
import {getTasksRequest, deleteTaskRequest, createTaskRequest, getTaskRequest, updateTaskRequest, toggleTaskDoneRequest} from '../api/tasks.api';
import {TaskContext} from './TaskContext';

export const useTasks = ()=>{
    const context = useContext(TaskContext);
    if(!context){
        throw new Error("useTasks must be used within a TaskConextProvider");
    }
    return context;

};

export const TastContextProvider = ({children}) =>{
    const [tasks, setTasks] = useState([]);

    async function loadTask(){
        const response = await getTasksRequest()
        setTasks(response.data);
    };

    const deleteTask = async (id) =>{
        try {
            await deleteTaskRequest(id);
            setTasks(tasks.filter(task => task.ID !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const createTask = async (task) =>{
        try {
            await createTaskRequest(task);
          } catch (error) {
            console.log(error);
          };
    };

    const getTask = async (id) =>{
        try {
            const response = await getTaskRequest(id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (task, id) =>{
        try {
            await updateTaskRequest(task, id);
          } catch (error) {
            console.log(error);
          };
    };

    const toggleTaskDone = async (id) =>{
        try {
            const taskFound = tasks.find((task)=> task.ID ===id );
            await toggleTaskDoneRequest(taskFound.DONE === 0 ? 1: 0, id);
            // eslint-disable-next-line array-callback-return
            tasks.map(task => {
                if(task.ID === id){
                    if(task.DONE === 0){
                        task.DONE=1
                    }else{
                        task.DONE=0
                    }
                }else{
                    task.DONE = task.DONE
                }
            });
            setTasks([...tasks]);
          } catch (error) {
            console.log(error);
          };
    };



    return (
    <TaskContext.Provider value={{tasks, loadTask, deleteTask, createTask, getTask, updateTask, toggleTaskDone}} >
        {children}
    </TaskContext.Provider>);
};