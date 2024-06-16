import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAll, newData, editData, deleteData } from '../../services/clientService';
import { Client } from "../../shared/Client";

interface ClientsState {
    data: Client[];
    filteredData: Client[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Record<string, any>;
}

const initialState: ClientsState = {
    data: [],
    filteredData: [],
    status: 'idle',
    error: {},
};

export const getClients = createAsyncThunk<Client[]>('clients/getClients', async () => {
    const response = await getAll();
    return response.data;
});

export const newClient = createAsyncThunk<any, Client>('clients/newClient', async (objData) => {
    try {
        const response = await newData(objData);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
});

export const editClient = createAsyncThunk<any, Client>('clients/editClient', async (objData) => {
    try {
        const response = await editData(objData);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
});

export const deleteClient = createAsyncThunk<number, number>('clients/deleteClient', async (id) => {
    await deleteData(id);
    return id;
});


export const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        filterData: (state, action: PayloadAction<{ keyword: string }>) => {
            const { keyword } = action.payload;

            state.filteredData = state.data.filter(item =>
                item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                item.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
                item.secondLastName.toLowerCase().includes(keyword.toLowerCase())
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getClients.fulfilled, (state, action: PayloadAction<Client[]>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.filteredData = action.payload;
            })
            .addCase(getClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ? { message: action.error.message } : {};
            })
            .addCase(newClient.fulfilled, (state, action: PayloadAction<any>) => {
                state.error = {};
                const response = action.payload;
                if (response.errors) {
                    state.error = response.errors;
                } else {
                    state.data.push(action.payload);
                    state.filteredData.push(action.payload);
                }
            })
            .addCase(editClient.fulfilled, (state, action: PayloadAction<any>) => {
                state.error = {};
                const response = action.payload;
                if (response.errors) {
                    state.error = response.errors;
                } else {
                    const index = state.data.findIndex(item => item.id === action.payload.id);
                    if (index !== -1) {
                        state.data[index] = action.payload;
                    }
                    const indexFilter = state.filteredData.findIndex(item => item.id === action.payload.id);
                    if (indexFilter !== -1) {
                        state.filteredData[indexFilter] = action.payload;
                    }
                }
            })
            .addCase(deleteClient.fulfilled, (state, action: PayloadAction<number>) => {
                state.data = state.data.filter((loan) => loan.id !== action.payload);
                state.filteredData = state.filteredData.filter((loan) => loan.id !== action.payload);
            });
    },
});

export const selectAll = (state: { clients: ClientsState }) => state.clients.filteredData;
export const statusClient = (state: { clients: ClientsState }) => state.clients.status;
export const errorClient = (state: { clients: ClientsState }) => state.clients.error;

export const { filterData } = clientSlice.actions;
export default clientSlice.reducer;
