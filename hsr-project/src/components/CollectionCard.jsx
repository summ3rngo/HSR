import React from 'react'
import ProgressBar from './ProgressBar'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const CollectionCard = (props) => {
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsMouseEnter(true);
    };

    const handleMouseLeave = () => {
        setIsMouseEnter(false);
    };

    const handleEditHoverEnter = () => {
        setIsEditHovered(true);
    };

    const handleEditHoverLeave = () => {
        setIsEditHovered(false);
    };

    const handleTrashHoverEnter = () => {
        setIsTrashHovered(true);
    };

    const handleTrashHoverLeave = () => {
        setIsTrashHovered(false);
    };

  return (
    <div className='collection-card col-lg-4 col-md-2 col-sm-1'> 
    <div className='img-container' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{backgroundImage: props.bgColor}}>
        <img className='img' src={props.img} alt={props.name} />
        <div className='element-img-container'><img className='element-img' src={props.element_img} alt={props.element_name} /></div>
        <div className='overlay-stats' style={{display: isMouseEnter ? 'block' : 'none'}}>
        <div className="stat-row">
                    <h5 className='level-text'> Level: {props.stats.level} </h5>
                    <div className="stat-container">
                        <div className="left-container">
                            <img className="character-info-icon hp-icon" src="https://rerollcdn.com/STARRAIL/Stats/hp.png" alt="HP" />
                            <h5> HP </h5>
                        </div>
                        <ProgressBar color={props.color} current={props.stats.hp} max={8000} />
                        <div className="right-container"> 
                            <h5> {props.stats.hp} </h5>
                        </div>
                    </div>
                    <div className="stat-container">
                        <div className="left-container">
                            <img className="character-info-icon atk-icon" src="https://rerollcdn.com/STARRAIL/Stats/atk.png" alt="ATK" />
                            <h5> ATK </h5>
                        </div>
                        <ProgressBar color={props.color} current={props.stats.atk} max={5000} />
                        <div className="right-container"> 
                            <h5> {props.stats.atk} </h5>
                        </div>
                    </div>
                    <div className="stat-container">
                        <div className="left-container">
                            <img className="character-info-icon def-icon" src="https://rerollcdn.com/STARRAIL/Stats/def.png" alt="DEF" />
                            <h5> DEF </h5>
                        </div>
                        <ProgressBar color={props.color} current={props.stats.def} max={4000} />
                        <div className="right-container"> 
                            <h5> {props.stats.def} </h5>
                        </div>
                    </div>
                    <div className="stat-container">
                        <div className="left-container">
                            <img className="character-info-icon spd-icon" src="https://rerollcdn.com/STARRAIL/Stats/spd.png" alt="SPD" />
                            <h5> SPD </h5>
                        </div>
                        <ProgressBar color={props.color} current={props.stats.spd} max={400} />
                        <div className="right-container"> 
                            <h5> {props.stats.spd} </h5>
                        </div>
                    </div>
                </div>
                <div className='buttons-container'>
                    <button type='button' className='collection-btn btn' onMouseEnter={handleEditHoverEnter} 
                    onMouseLeave={handleEditHoverLeave}><FontAwesomeIcon icon={faEdit} className='collection-icon' 
                    style={{color: isEditHovered ? props.color : 'white'}}/></button>
                    <button type='button' className='collection-btn btn'
                    onMouseEnter={handleTrashHoverEnter} onMouseLeave={handleTrashHoverLeave}  onClick={() => props.onDelete(props.characterId)}>
                        <FontAwesomeIcon icon={faTrash} className='collection-icon'  style={{color: isTrashHovered ? props.color : 'white'}}/></button>
                </div>
        </div>
    </div>
    <div className='card-body headshot-description'>
        <h5 className='card-name'>{ props.name } </h5>
    </div>
    
</div>
  )
}

export default CollectionCard