import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
    message: string;
    visible: boolean;
    variant: string;
}

const initialState: AlertState = {
    message: '',
    visible: false,
    variant: 'success',
};

interface SetAlertPayload {
    message: string;
    visible: boolean;
    variant: string;
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert(state, action: PayloadAction<SetAlertPayload>) {
            state.message = action.payload.message;
            state.visible = action.payload.visible;
            state.variant = action.payload.variant;
        },
        clearAlert(state) {
            state.message = '';
            state.visible = false;
            state.variant = 'success';
        },
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
