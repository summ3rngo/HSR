import React from 'react'

const ProgressBar = (props) => {
    const progressPercentage = (props.current/ props.max) * 100;
  return (
    <div className='progressbar-container'>
        <div className='progress' style={{width: `${progressPercentage}%`, backgroundColor: `${props.color}`}}>

        </div>
    </div>
  )
}

export default ProgressBar