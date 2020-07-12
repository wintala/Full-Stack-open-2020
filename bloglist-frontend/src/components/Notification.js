import React from 'react'

const Notification = ({text, setMessage}) => {
    if (text === null) {
      return null
    }
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  
    return (
      <div id="notification" className="notification">
        {text}
      </div>
    )
  }

export default Notification