import React from 'react'
import { useLoaderData } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { useState } from 'react'
import Headshot from '../components/Headshot'



const Characters = () => {
    const data = useLoaderData();

    const { characters, paths, elements } = data;
    const [options, setOptions] = useState(characters);
    const [filteredOptions, setFilteredOptions] = useState('');
    const [filter, setFilter] = useState({type: '', value: null});



    const getElement = (character) => {
            return elements.find(element => character.element_id === element.element_id)
        }


    const handleBgColor = (character) => {
       return character.rarity === 5 ? 'var(--five-star-bg)' : 'var(--four-star-bg)'
    }

    const isActive = (type, value) => {
        return (filter.type === type && filter.value === value);
    }

    const handleFilter = (type, value) => {
        if (filter.type === type && filter.value === value) {
            setFilter({ type: '', value: null }); // Reset filter
            setOptions(characters); // Reset options to show all characters
            
        } else {
            setFilter({ type, value }); // Set new filter
            let filteredOptions;

            switch (type) {
                case 'rarity':
                    filteredOptions = characters.filter(character => character.rarity === value);
                    break;
                case 'element':
                    filteredOptions = characters.filter(character => character.element_id === value);
                    break;
                case 'path':
                    filteredOptions = characters.filter(character => character.path_id === value);
                    break;
                default:
                    filteredOptions = characters; // No filter or reset
            }
            setOptions(filteredOptions);
            setFilteredOptions(filteredOptions);

        }




    };
    
  return (
    <div className='container-fluid gx-0 characters'>
        <div className='container content-wrapper'>
        <div className='header'>
                <div className='header-content'>
                    <div className='text-img'></div>
                    <div className='header-text'>
                        <h2 className='title'>Honkai: Star Rail Character List</h2>
                    </div>
                    <div className='search-bar'>
                        <SearchBar characters={characters} options={options} setOptions={setOptions}
                        filteredOptions={filteredOptions} />
                    </div>
                </div>
            </div>
            <div className='filter-bar'>
                <div className='rarity-icons-container icon-container'>
                    <button className={`img-container rarity-container btn ${isActive("rarity", 5) ? 'active' : ''}`} 
                        onClick={() => handleFilter("rarity", 5)}>
                        <img className='rarity-img filter-icons' src="https://rerollcdn.com/STARRAIL/Filters/rarity_5.png" alt="Five Star" />
                    </button>
                    <button className={`img-container rarity-container btn ${isActive("rarity", 4) ? 'active' : ''}`} 
                    onClick={() => handleFilter("rarity", 4)}>
                        <img className='rarity-img filter-icons' src="https://rerollcdn.com/STARRAIL/Filters/rarity_4.png" alt="Four Star" />
                    </button>
                </div>
                <div className='element-icons-container icon-container'>
                    {elements.map((element) => {
                         return (
                            <button className={`img-container element-container btn ${isActive("element", element.element_id) ? 'active' : ''}`} 
                            onClick={() => handleFilter("element", element.element_id)}>
                                <img className='element-img filter-icons' src={element.img_src} alt={element.name} />
                            </button>
                        );
                    })}
                </div>
                <div className='path-icons-container icon-container'>
                {paths.map((path) => {
                         return (
                            <button className={`img-container path-container btn ${isActive("path", path.path_id) ? 'active' : ''}`}
                            onClick={() => handleFilter("path", path.path_id)}>
                                <img className='path-img filter-icons' src={path.img_src} alt={path.name} />
                            </button>
                        );
                    })}
                </div>

            </div>
            <div className='character-list-wrapper'>
                <div className='row d-flex gx-0'>
                { options.map((option) => {
                    const element = getElement(option);
                    const bgColor = handleBgColor(option);
                    return <Headshot headshot_img={option.headshot} name={option.name} element_img={element.img_src} 
                    element_name={element.name} bgColor={bgColor} />
                })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Characters