import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAll, newData, editData, deleteData } from '../../services/savingAccountService';
import { SavingAccount } from "../../shared/SavingAccount";

interface SavingAccountsState {
    data: SavingAccount[];
    filteredData: SavingAccount[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Record<string, any>;
}

const initialState: SavingAccountsState = {
    data: [],
    filteredData: [],
    status: 'idle',
    error: {},
};

export const getSavingAccounts = createAsyncThunk<SavingAccount[]>('savingAccounts/getSavingAccounts', async () => {
    const response = await getAll();
    return response.data;
});

export const newSavingAccount = createAsyncThunk<any, SavingAccount>('savingAccounts/newSavingAccount', async (objData) => {
    try {
        const response = await newData(objData);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
});

export const editSavingAccount = createAsyncThunk<any, SavingAccount>('savingAccounts/editSavingAccount', async (objData) => {
    try {
        const response = await editData(objData);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
});

export const deleteSavingAccount = createAsyncThunk<number, number>('savingAccounts/deleteSavingAccount', async (id) => {
    await deleteData(id);
    return id;
});


export const savingAccountSlice = createSlice({
    name: 'savingAccounts',
    initialState,
    reducers: {
        filterData: (state, action: PayloadAction<{ keyword: string }>) => {
            const { keyword } = action.payload;

            state.filteredData = state.data.filter(item =>
                item.accountNumber.toLowerCase().includes(keyword.toLowerCase())
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSavingAccounts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSavingAccounts.fulfilled, (state, action: PayloadAction<SavingAccount[]>) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.filteredData = action.payload;
            })
            .addCase(getSavingAccounts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ? { message: action.error.message } : {};
            })
            .addCase(newSavingAccount.fulfilled, (state, action: PayloadAction<any>) => {
                state.error = {};
                const response = action.payload;
                if (response.errors) {
                    state.error = response.errors;
                } else {
                    state.data.push(action.payload);
                    state.filteredData.push(action.payload);
                }
            })
            .addCase(editSavingAccount.fulfilled, (state, action: PayloadAction<any>) => {
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
            .addCase(deleteSavingAccount.fulfilled, (state, action: PayloadAction<number>) => {
                state.data = state.data.filter((loan) => loan.id !== action.payload);
                state.filteredData = state.filteredData.filter((loan) => loan.id !== action.payload);
            });
    },
});

export const selectAll = (state: { savingAccounts: SavingAccountsState }) => state.savingAccounts.filteredData;
export const statusSavingAccount = (state: { savingAccounts: SavingAccountsState }) => state.savingAccounts.status;
export const errorSavingAccount = (state: { savingAccounts: SavingAccountsState }) => state.savingAccounts.error;

export const { filterData } = savingAccountSlice.actions;
export default savingAccountSlice.reducer;
