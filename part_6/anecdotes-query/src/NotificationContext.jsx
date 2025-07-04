import { createContext, useContext, useReducer } from "react"

export const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SHOW":
            return action.payload
        case "HIDE":
            return ''
        default:
            return state
    }
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)

    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}