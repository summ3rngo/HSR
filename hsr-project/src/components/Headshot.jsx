import React from 'react'
import '../styles/headshot.css'

const Headshot = (props) => {
  return (
    <div className='headshot card col-lg-2 col-md-3 col-sm-6'>
        <div className='img-container' style={{backgroundImage: props.bgColor}}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img className='headshot-img' src={props.headshot_img} alt={props.name} />
            <div className='element-img-container'><img className='element-img' src={props.element_img} alt={props.element_name} /></div>
        </div>
        <div className='card-body headshot-description'>
            <h5 className='card-name'>{ props.name } </h5>
        </div>
    </div>
  )
}

export default Headshot