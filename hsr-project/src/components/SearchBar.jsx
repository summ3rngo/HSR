import React from 'react'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {
    const [input, setInput] = useState('');
    const timeoutRef = useRef(undefined);

  return (
    <div className='input-group searchbar'>
    <input
      type="search"
      className='form-control search-input'
      placeholder='Search for character'

      value={input}
      onChange={(event) => {
        const value = event.target.value;

        setInput(value);

        if (timeoutRef.current !== undefined) {
          clearTimeout(timeoutRef.current);
        }

        if (value) {
          timeoutRef.current = setTimeout(() => {
            const matchedCharacters = props.options.filter(character => 
                character.name.toLowerCase().includes(value.toLowerCase())
            );
            props.setOptions(matchedCharacters);
        }, 1000);
        } else {
          props.setOptions(props.filteredOptions);
        }

        
      }}
    />
    <button type="button" className="search-btn btn"><FontAwesomeIcon icon={faMagnifyingGlass} className='icons search-icon' /></button>
  </div>
  )
}

export default SearchBar