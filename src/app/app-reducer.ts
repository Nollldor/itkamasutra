import {authAPI} from 'api/todolists-api'
import {authActions} from "features/auth/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setIsInitialised: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions


export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
        } else {

        }
        dispatch(appActions.setIsInitialised({isInitialized: true}));
    })
}


