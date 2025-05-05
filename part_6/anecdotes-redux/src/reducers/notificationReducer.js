import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const setNotification = (message, timeout) => {
    return (dispatch) => {
        dispatch(addNotification(message))
        setTimeout(() => { dispatch(removeNotification()) }, timeout * 1000)
    }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer