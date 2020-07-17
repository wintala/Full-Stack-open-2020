import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {hideNotification} from '../reducers/notificationReducer'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message = notification.text
  const alertTime = notification.time

  const dispatch = useDispatch()

  if (message === "") {
    return null
  }

  let timeoutToBeClearedIndex = window.setTimeout(()=>null, 0) - 2
  window.clearTimeout(timeoutToBeClearedIndex)

  setTimeout(() => {
    dispatch(hideNotification())
  }, alertTime)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification