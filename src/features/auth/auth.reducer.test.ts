import {authReducer, authThunks} from "features/auth/auth.reducer";
import {LoginParamsType} from "features/auth/auth.api";

let startState: { isLoggedIn: boolean };

beforeEach(() => {
    startState = {
        isLoggedIn: false,
    };
});

test('should set isLoggedIn to true when login is fulfilled', () => {
    const args = {isLoggedIn: true};
    const loginParams: LoginParamsType = {
        email: 'email',
        password: 'password',
        rememberMe: true,
    }

    const endState = authReducer(startState, authThunks.login.fulfilled(args, 'requestId', loginParams));

    expect(endState.isLoggedIn).toBe(true);
});

test('should set isLoggedIn to false when logout is fulfilled', () => {
    const args = {isLoggedIn: false};
    const endState = authReducer(startState, authThunks.logout.fulfilled(args, 'requestId'));

    expect(endState.isLoggedIn).toBe(false);
});

test('should set isLoggedIn to the value from payload when initializeApp is fulfilled', () => {
    const args = {isLoggedIn: true};
    const endState = authReducer(startState, authThunks.initializeApp.fulfilled(args, 'requestId'));

    expect(endState.isLoggedIn).toBe(true);
});
