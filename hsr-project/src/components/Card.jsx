import React from 'react' 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const Card = (props) => {
  console.log(props.rarity)
    const generateStars = (rarity) => {
        const stars = [];
        for (let i = 0; i < rarity; i++) {
          stars.push(
            <FontAwesomeIcon key={i} icon={faStar} style={{ marginRight: '2px' }} />
          );
        }
        return stars;
    }

  return (
    <div className='card col-lg-2 col-md-3 col-sm-6'>
        <img className='card-img' src={props.src} alt={`${props.name}`} />
        <div className='card-body gx-0'>
            <h5> {props.name} </h5>
            <p> {generateStars(props.rarity)} </p>
        </div>
    </div>
  )
}

export default Card