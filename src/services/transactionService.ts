import axios, { AxiosResponse } from 'axios';
import { Transaction } from '../shared/Transaction';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/Transactions`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getAll = (): Promise<AxiosResponse<Transaction[]>> => api.get('/');
export const newData = (objData: Transaction): Promise<AxiosResponse<Transaction>> => api.post('/', objData);
export const editData = (objData: Transaction): Promise<AxiosResponse<Transaction>> => api.put('/', objData);
export const deleteData = (id: number): Promise<AxiosResponse<void>> => api.delete('/' + id);
export const returnData = (id: number): Promise<AxiosResponse<Transaction>> => api.post('/' + id + '/Cancel');

export const getById = async (id: number): Promise<Transaction> => {
    const response = await api.get<Transaction>('/' + id);
    return response.data;
};
