import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Form = (props) => {
    const [isValidCharacter, setIsValidCharacter] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [level, setLevel] = useState(1);
    const [hp, setHp] = useState(1);
    const [atk, setAtk] = useState(1);
    const [def, setDef] = useState(1);
    const [spd, setSpd] = useState(1);
    const [filteredCharacters, setFilteredCharacters] = useState(props.allCharacters);
    const timeoutRef = useRef(undefined)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!characterExists(selectedCharacter)) {
            setIsValidCharacter(false);
            setErrorMessage('Please select a valid character from the list.');
            return; 
        }

        const newCharacter = {
            characterId: props.allCharacters.find(character => character.name.toLowerCase() === selectedCharacter.toLowerCase()).id,
            customStats: {
                level, hp, atk, def, spd
            }
        };

        console.log(newCharacter);
        console.log("ENTERING POST")

        const userResponse = await fetch(`http://localhost:3001/users/${props.userId}`);
        const userData = await userResponse.json();

        const updatedUserCharacters = [...userData.userCharacters, newCharacter];
        const updatedUser = { ...userData, userCharacters: updatedUserCharacters };
        
        const response = await fetch(`http://localhost:3001/users/${props.userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            toast.success('Character added successfully', { position: "top-center" });
                
            handleCancel();
        } else {
            toast.error('Failed to add character', { position: "top-center" });
        }
        
    };

    const handleCancel = () => {

        props.setDisplayForm(false);
        setSelectedCharacter('');
        setHp(1);
        setLevel(1);
        setAtk(1);
        setDef(1);
        setSpd(1);
        setIsValidCharacter(true);
        setErrorMessage('');
    };

    const characterExists = (characterName) => {
        return props.allCharacters.some(character => character.name.toLowerCase() === characterName.toLowerCase());
    };

    

    return (
        <form onSubmit={handleSubmit} className="add-character-form mt-3">
            {/* Character Dropdown */}
            <div className="mb-3">
                <label htmlFor="characterSelect" className="form-label">Select Character</label>
                <input 
                    className="form-control" 
                    type='text'
                    list="characters" 
                    id="characterSelect" 
                    placeholder="Type to search..." 
                    value={selectedCharacter} 
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCharacter(value);
                    
                        if (timeoutRef.current !== undefined) {
                            clearTimeout(timeoutRef.current);
                          }
                  
                          if (value) {
                            timeoutRef.current = setTimeout(() => {
                                const filtered = props.allCharacters.filter(character => {
                                    if (!character.name === null)  {
                                        character.name.toLowerCase().includes(value.toLowerCase())
                                    }

                                }
                                   
                                );
                                setFilteredCharacters(filtered);
                          }, 1000);
                          } else {
                            setFilteredCharacters(props.allCharacters);
                          }
                       
                  

                    }
                    } 
                />
                <datalist id="characters">
                    {filteredCharacters.map((character, index) => (
                        <option key={index} value={character.name} />
                    ))}
                </datalist>
                {!isValidCharacter && <small className="text-danger">{errorMessage}</small>}
            </div>

            {/* Level Input */}
            <div className="mb-3">
                <label htmlFor="levelInput" className="form-label">Level</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="levelInput" 
                    value={level} 
                    onChange={(e) => setLevel(Math.min(Math.max(1, e.target.value), 80))} 
                    min="1" 
                    max="80" 
                />
            </div>

            {/* Stat Inputs */}
            <div className="row mt-3">
                <div className="col">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="HP" 
                        value={hp}
                        onChange={(e) => setHp(Math.min(Math.max(1, e.target.value), 8000))} 
                        min="1"
                        max="8000"
                    />
                </div>
                <div className="col">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="ATK" 
                        value={atk} 
                        onChange={(e) => setAtk(Math.min(Math.max(1, e.target.value), 5000))} 
                        min="1"
                        max="5000"
                    />
                </div>
                <div className="col">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="DEF" 
                        value={def} 
                        onChange={(e) => setDef(Math.min(Math.max(1, e.target.value), 4000))} 
                        min="1"
                        max="4000"
                    />
                </div>
                <div className="col">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="SPD" 
                        value={spd} 
                        onChange={(e) => setSpd(Math.min(Math.max(1, e.target.value), 400))} 
                        min="1"
                        max="400"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="d-flex align-items-center justify-content-center mt-3">
                <button type="button" className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn add-character-btn pretty-btn  ms-2">Add Character</button>
            </div>
            <ToastContainer />
        </form>
    );
};


export default Form