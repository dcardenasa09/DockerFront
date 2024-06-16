import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/Users`,
});

const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const login = (email: string, password: string) => {
    return api.post('/login', { email, password });
};

export const getUsers = () => {
    return api.get('/');
};

export const getUser = (id: number) => {
    return api.get(`/${id}`);
};

export const createUser = (user: { name: string, email: string }) => {
    return api.post('', user);
};

export const updateUser = (id: number, user: { name: string, email: string }) => {
    return api.put(`/${id}`, user);
};

export const deleteUser = (id: number) => {
    return api.delete(`/${id}`);
};

export { setAuthToken };