import axios from 'axios'

export const getTasksRequest = async () =>{
    return await axios.get('http://localhost:4000/tasks')
};

export const createTaskRequest = async (task) =>{
    return await axios.post('http://localhost:4000/tasks',task)
};

export const deleteTaskRequest = async (id) =>{
    return await axios.delete(`http://localhost:4000/tasks/${id}`)
};

export const getTaskRequest = async (id) =>{
    return await axios.get(`http://localhost:4000/tasks/${id}`)
};

export const updateTaskRequest = async (task, id) =>{
    return await axios.put(`http://localhost:4000/tasks/${id}`, task)
};


export const toggleTaskDoneRequest = async (taskDone, id) =>{
    return await axios.put(`http://localhost:4000/tasks2/${id}`, {"done": taskDone})
};
