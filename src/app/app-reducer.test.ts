import {appActions, appReducer, RequestStatusType} from './app-reducer'

let startState: {
    error: null | string,
    status: RequestStatusType,
    isInitialized: boolean
}

beforeEach(() => {
    startState = {
        error: null as null | string,
        status: 'idle' as RequestStatusType,
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, appActions.setError({error: 'some error'}))
    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {
    const endState = appReducer(startState, appActions.setStatus({status: 'loading'}))
    expect(endState.status).toBe('loading');
})

