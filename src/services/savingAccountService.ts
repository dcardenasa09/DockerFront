import axios, { AxiosResponse } from 'axios';
import { SavingAccount } from '../shared/SavingAccount';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/SavingAccounts`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getAll = (): Promise<AxiosResponse<SavingAccount[]>> => api.get('/');
export const newData = (objData: SavingAccount): Promise<AxiosResponse<SavingAccount>> => api.post('/', objData);
export const editData = (objData: SavingAccount): Promise<AxiosResponse<SavingAccount>> => api.put('/', objData);
export const deleteData = (id: number): Promise<AxiosResponse<void>> => api.delete('/' + id);

export const getSavingAccountsByClientId = async (id: number): Promise<SavingAccount[]> => {
    const response = await api.get<SavingAccount[]>('/ByClient/' + id);
    return response.data;
};

export const getById = async (id: number): Promise<SavingAccount> => {
    const response = await api.get<SavingAccount>('/' + id);
    return response.data;
};

export const getAccount = async (id: number): Promise<SavingAccount> => {
    const response = await api.get<SavingAccount>('/' + id);
    return response.data;
};
