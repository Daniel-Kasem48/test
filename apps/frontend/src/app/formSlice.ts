import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Geolocation {
    latitude: string;
    longitude: string;
}

interface FormState {
    address: string;
    email: string;
    geolocation: Geolocation | null;
    error: string | null;
}

const initialState: FormState = {
    address: '',
    email: '',
    geolocation: null,
    error: null,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setGeolocation(state, action: PayloadAction<Geolocation>) {
            state.geolocation = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setAddress, setEmail, setGeolocation, setError } = formSlice.actions;

export default formSlice.reducer;
