import { useSelector } from 'react-redux'
const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)
  if (message === null) {
    return null
  }
  const notificationStyle = {
    background: type === 'error' ? 'rgb(233, 61, 61)' : 'rgb(61, 233, 124)'
  }

  return (
    <div style={notificationStyle} className="message">
      {message}
    </div>
  )
}

export default Notification