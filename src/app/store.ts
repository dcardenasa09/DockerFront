import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../features/clients/clientSlice';
import savingAccountReducer from '../features/savingAccounts/savingAccountSlice';
import transactionReducer from '../features/transactions/transactionSlice';
import alertReducer from '../features/alerts/alertSlice'

export const store = configureStore({
    reducer: {
        clients: clientReducer,
        savingAccounts: savingAccountReducer,
        transactions: transactionReducer,
        alert: alertReducer,
    },
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
