import React from 'react'
import Card from '../components/Card'
import { useLoaderData } from "react-router-dom";

const Homepage = () => {
    const characters = useLoaderData();

    console.log(characters);
  return (
    <div className='container-fluid gx-0 homepage'>
        <div className='container content-wrapper'>
            <div className='header'>
                <div className='header-content'>
                    <div className='text-img'></div>
                    <div className='header-text'>
                        <h2 className='title'> Welcome to Honkai: Star Rail Guide and Datebase</h2>
                    </div>
                </div>
            </div>
            <div className='about-game homepage-card'>
                <div className='card-title'>
                    About the Game
                </div>
                <div className='card-content'>
                Honkai: Star Rail is a space-themed, turn-based RPG from HoYoverse, the creators of Honkai Impact and Genshin Impact. 
                Players journey through the cosmos aboard the Astral Express, uncovering mysteries and engaging in strategic battles. 
                The game features rich storytelling, diverse worlds, and a compelling cast of characters, set against a backdrop of 
                stunning visuals and engaging gameplay.
                </div>
            </div>
            <div className='version-highlights homepage-card'>
                <div className='card-title'>
                    Version 1.5 Highlights
                </div>
                <div className='card-content'>
                    <div className='row'>
                       { characters.map((character) => {
                            return <Card key={character.character_id} src={character.headshot}
                            name={character.name} />
                        })
                    }
                    </div>
                </div>
    
            </div>
        </div>
    </div>
  )
}

export default Homepage