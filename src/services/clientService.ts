import axios, { AxiosResponse } from 'axios';
import { Client } from '../shared/Client';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/Clients`,
    headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
    }
});

export const getAll = (): Promise<AxiosResponse<Client[]>> => api.get('/');
export const newData = (objData: Client): Promise<AxiosResponse<Client>> => api.post('/', objData);
export const editData = (objData: Client): Promise<AxiosResponse<Client>> => api.put('/', objData);
export const deleteData = (id: number): Promise<AxiosResponse<void>> => api.delete('/' + id);

export const getClientsList = async (): Promise<Client[]> => {
    const response = await api.get<Client[]>('/');
    return response.data;
};

export const getById = async (id: number): Promise<Client> => {
    const response = await api.get<Client>('/' + id);
    return response.data;
};

export const getClient = async (id: number): Promise<Client> => {
    const response = await api.get<Client>('/' + id);
    return response.data;
};
