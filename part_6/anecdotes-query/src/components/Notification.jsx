import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  const style = {
    padding: 10,
    marginBottom: 5,
    background: '#000',
    color: '#ccc'
  }

  return (
    <>
      {notification && <div style={style}>{notification}</div>}
    </>

  )
}

export default Notification
