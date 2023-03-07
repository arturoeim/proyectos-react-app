import axios from 'axios'

export const getUsersRequest = async () =>{
    return await axios.get('http://localhost:4000/users')
};

export const createUserRequest = async (user) =>{
    return await axios.post('http://localhost:4000/users',user)
};

export const deleteUserRequest = async (id) =>{
    return await axios.delete(`http://localhost:4000/users/${id}`)
};

export const getUserRequest = async (id) =>{
    return await axios.get(`http://localhost:4000/users/${id}`)
};

export const updateUserRequest = async (user, id) =>{
    return await axios.put(`http://localhost:4000/users/${id}`, user)
};

export const getUserLogin = async (user) =>{
    return await axios.put('http://localhost:4000/users2', user)
};