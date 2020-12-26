import React from 'react'

const Notification = ({ errorMsg, successMsg }) => {
    if (errorMsg === null &&  successMsg === null) {
      return null
    }
  
    if (errorMsg !== null) {
      return (
      <div className="error">
        {errorMsg}
      </div>
    )}
    
    if (successMsg !== null){
      return (
      <div className="success">
        {successMsg}
      </div>
    )}
  }
  export default Notification