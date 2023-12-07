import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchUser = (props) => {

  return (
    <form className='input-group searchbar' onSubmit={props.handleSubmit}>
    <input
      type="search"
      className='form-control search-input'
      placeholder='Search user...'
 
      value={props.input}
      onChange={(event) => {
        const value = event.target.value;

        props.setInput(value);
      }}
      />
    <button type="submit" className="search-btn btn"><FontAwesomeIcon icon={faMagnifyingGlass} className='icons search-icon' /></button>
      
      </form>
  )
}

export default SearchUser