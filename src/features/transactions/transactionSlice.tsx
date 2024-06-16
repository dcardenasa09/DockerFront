import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAll, newData, editData, deleteData, returnData } from '../../services/transactionService';
import { Transaction } from "../../shared/Transaction";

interface TransactionState {
    data: Transaction[];
    filteredData: Transaction[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Record<string, any>;
}

const initialState: TransactionState = {
    data: [],
    filteredData: [],
    status: 'idle',
    error: {},
};

export const getTransactions = createAsyncThunk<Transaction[]>('transactions/getTransactions', async () => {
    const response = await getAll();
    return response.data;
});

export const newTransaction = createAsyncThunk<Transaction, Transaction>('transactions/newTransaction', async (objData) => {
    try {
        const response = await newData(objData);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
});

export const editTransaction = createAsyncThunk<Transaction, Transaction>('transactions/editTransaction', async (objData) => {
    try {
        const response = await editData(objData);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
});

export const deleteTransaction = createAsyncThunk<number, number>('transactions/deleteTransaction', async (id) => {
    await deleteData(id);
    return id;
});

export const returnTransaction = createAsyncThunk<Transaction, number>('transactions/returnTransaction', async (id) => {
    const response = await returnData(id);
    return response.data;
});

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        filterData: (state, action: PayloadAction<{ keyword: string }>) => {
            const { keyword } = action.payload;
            state.filteredData = state.data.filter(item =>
                item.folio.toLowerCase().includes(keyword.toLowerCase())
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.filteredData = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = { message: action.error.message || 'Error fetching transactions' };
            })
            .addCase(newTransaction.fulfilled, (state, action: PayloadAction<any>) => {
                state.error = {};
                const response = action.payload;
                if (response.hasOwnProperty('errors')) {
                    state.error = response.errors;
                } else {
                    state.data.push(response);
                    state.filteredData.push(response);
                }
            })
            .addCase(editTransaction.fulfilled, (state, action: PayloadAction<any>) => {
                state.error = {};
                const response = action.payload;
                if (response.hasOwnProperty('errors')) {
                    state.error = response.errors;
                } else {
                    const index = state.data.findIndex(item => item.id === response.id);
                    if (index !== -1) {
                        state.data[index] = response;
                    }

                    const indexFilter = state.filteredData.findIndex(item => item.id === response.id);
                    if (indexFilter !== -1) {
                        state.filteredData[indexFilter] = response;
                    }
                }
            })
            .addCase(returnTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
                const index = state.data.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }

                const indexFilter = state.filteredData.findIndex(item => item.id === action.payload.id);
                if (indexFilter !== -1) {
                    state.filteredData[indexFilter] = action.payload;
                }
            })
            .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<number>) => {
                state.data = state.data.filter((transaction) => transaction.id !== action.payload);
                state.filteredData = state.filteredData.filter((transaction) => transaction.id !== action.payload);
            });
    },
});

export const selectAll = (state: { transactions: TransactionState }) => state.transactions.filteredData;
export const statusTransaction = (state: { transactions: TransactionState }) => state.transactions.status;
export const errorTransaction = (state: { transactions: TransactionState }) => state.transactions.error;

export const { filterData } = transactionSlice.actions;
export default transactionSlice.reducer;
