import {AppRootStateType} from "app/store";

export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppIsInitialized = (state: AppRootStateType) => state.app.isInitialized