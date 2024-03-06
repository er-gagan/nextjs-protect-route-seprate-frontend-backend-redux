
import { hideLoader } from '@/utils/utils'
import { createSlice } from '@reduxjs/toolkit'
const initialAuthState = {
    user_data: null,
    isLoggedIn: false
}

export const Auth = createSlice({
    name: 'Auth',
    initialState: initialAuthState,
    reducers: {
        handleGetUserDataRequest: () => {
            // state.region = payload.payload.region
        },
        handleGetUserDataResponse: (state, payload: any) => {
            if (payload && payload.data) {
                const { user_data } = payload.data
                if (user_data) {
                    state.user_data = user_data
                    return
                }
            }
            state.user_data = null
        },
        handleSetIsLoggedInRequest: (state, payload) => {
            if (payload.payload) {
                const { isLoggedIn } = payload.payload
                if (isLoggedIn) {
                    state.isLoggedIn = true
                    return
                }
                state.isLoggedIn = false
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    handleGetUserDataRequest,
    handleSetIsLoggedInRequest
    // handleInstanceTypeDropdownRequest
} = Auth.actions

export default Auth.reducer