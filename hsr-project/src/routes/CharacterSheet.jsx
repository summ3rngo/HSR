import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from 'react';

import React from 'react'
import ProgressBar from "../components/ProgressBar";

const CharacterSheet = () => {
    useEffect(() => {
        document.title = "Character Sheets Page";  
      }, []);

    const character = useLoaderData();
    const level80Data = character.level_states.find(state => state.level === 80);
    
    const [color, setColor] = useState('');

    useEffect(() => {
        const elementId = character.elementId;
        switch (elementId) {
            case 0:
                setColor('var(--physical)');
                break;
            case 1:
                setColor('var(--fire)');
                break;
            case 2:
                setColor('var(--ice)');
                break;
            case 3:
                setColor('var(--wind)');
                break;
            case 4:
                setColor('var(--lightning)');
                break;
            case 5:
                setColor('var(--quantum)');
                break;
            case 6:
                setColor('var(--imaginary)');
                break;
            default:
                setColor('var(--physical)');
        }
    }, [character.elementId]);

    const handleBgColor = (character) => {
        return character.rarity === 5 ? 'var(--five-star-bg)' : 'var(--four-star-bg)'
     }

  return (
    <div className="container-fluid gx-0 character">
         <div className='container content-wrapper'>
         <div className='header' style={{backgroundImage: `url('${character.splash_art}')`}}>
                <div className='header-content'>
                    <div className='header-text'>
                            <h2 className='title'>Honkai: Star Rail {character.name} Stats </h2>
                    </div>
                </div>
            </div>
        <div className="character-profile">
            <div className="character-img-container" style={{'backgroundImage': handleBgColor(character)}}>
                <img className="character-img" src={character.regular_art} alt={character.name} />
            </div>
            <div className="character-stats">
                <div className="img-container element-container stat-row">
                    <img className='element-img filter-icons' src={character.element.img_src} alt={character.element.name} />
                </div>
                <div className="element-row stat-row">
                    <div className="path-content">
                        <div className="img-container path-container">
                            <img className="path-img filter-icons" src={character.path.img_src} alt={character.path.name} />
                        </div>
                        <h5> {character.path.name} </h5>

                    </div>
                    <div className="level-content">
                        <h5> Level 80 </h5>

                    </div>
                </div>
                <div className="stat-row">
                    <div className="stat-container">
                        <div className="left-container">
                            <img className="character-info-icon hp-icon" src="https://rerollcdn.com/STARRAIL/Stats/hp.png" alt="HP" />
                            <h5> HP </h5>
                        </div>
                        <ProgressBar color={color} current={level80Data.hp} max={1500} />
                        <div className="right-container"> 
                            <h5> {level80Data.hp} </h5>
                        </div>
                    </div>
                    <div className="stat-container">
                        <div className="left-container">
                            <img className="character-info-icon atk-icon" src="https://rerollcdn.com/STARRAIL/Stats/atk.png" alt="ATK" />
                            <h5> ATK </h5>
                        </div>
                        <ProgressBar color={color} current={level80Data.atk} max={1200} />
                        <div className="right-container"> 
                            <h5> {level80Data.atk} </h5>
                        </div>
                    </div>
                    <div className="stat-container">
                        <div className="left-container">
                            <img className="character-info-icon def-icon" src="https://rerollcdn.com/STARRAIL/Stats/def.png" alt="DEF" />
                            <h5> DEF </h5>
                        </div>
                        <ProgressBar color={color} current={level80Data.def} max={1000} />
                        <div className="right-container"> 
                            <h5> {level80Data.def} </h5>
                        </div>
                    </div>
                    <div className="stat-container">
                        <div className="left-container">
                            <img className="character-info-icon spd-icon" src="https://rerollcdn.com/STARRAIL/Stats/spd.png" alt="SPD" />
                            <h5> SPD </h5>
                        </div>
                        <ProgressBar color={color} current={level80Data.spd} max={400} />
                        <div className="right-container"> 
                            <h5> {level80Data.spd} </h5>
                        </div>
                    </div>
                    <div className="stat-container">
                        <div className="left-container">
                            <img className="character-info-icon taunt-icon" src="https://rerollcdn.com/STARRAIL/Stats/taunt.png" alt="TNT" />
                            <h5> TNT </h5>
                        </div>
                        <ProgressBar color={color} current={level80Data.taunt} max={400} />
                        <div className="right-container"> 
                            <h5> {level80Data.taunt} </h5>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div className='abilities homepage-card' style={{border: `2px solid ${color}`}}>
                <div className='card-title' style={{backgroundColor: `${color}`}}>
                    Abilities
                </div>
                <div className='card-content'>
                   { character.abilities.map((ability) => {
                    return (
                        <div className="ability">
                        <div className="left-container">
                            <div className="icon-container">
                                <img className="ability-icon" src={ability.icon_src} alt={ability.name}/>
                            </div>
                            <h5> {ability.type} </h5>
                        </div>
                        <div className="right-container">
                            <h4 className="ability-text"> {ability.name} </h4>
                            <h6 className="ability-text" style={{color: `${color}`}}>{ability.tag} </h6>
                            <p className="ability-text"> {ability.description} </p>
                        </div>

                    </div>
                    )
                   })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CharacterSheet