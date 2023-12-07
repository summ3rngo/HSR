import React from 'react'
import { useLoaderData } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { useState, useEffect } from 'react'
import CollectionCard from '../components/CollectionCard'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import Form from '../components/Form'
import CommentForm from '../components/CommentForm'



const Collection = () => {
    useEffect(() => {
        document.title = "Collection of Characters Page";  
      }, []);
    const data = useLoaderData();
    const {user, allCharacters, userCharacters, paths, elements } = data;
    const [options, setOptions] = useState(userCharacters);
    const [filteredOptions, setFilteredOptions] = useState('');
    const [filter, setFilter] = useState({type: '', value: null});
    const [displayForm, setDisplayForm] = useState(false);

    const [comments, setComments] = useState([]);

    useEffect(() => {
    const fetchComments = async () => {
        const response = await fetch('http://localhost:3001/comments');
        const data = await response.json();
        setComments(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    };

    fetchComments();
    }, []);

    const getColor = (character) => {
        const elementId = character.elementId;
        let color;
        switch (elementId) {
            case 0:
                color = 'var(--physical)';
                break;
            case 1:
                color = 'var(--fire)';
                break;
            case 2:
                color = 'var(--ice)';
                break;
            case 3:
                color = 'var(--wind)';
                break;
            case 4:
                color = 'var(--lightning)';
                break;
            case 5:
                color = 'var(--quantum)';
                break;
            case 6:
                color = 'var(--imaginary)';
                break;
            default:
                color = 'var(--physical)';
        }
        return color;
    }
    



    const getElement = (character) => {
        return elements.find(element => character.elementId === element.id) || { img_src: '', name: 'Default' };
    };


    const handleBgColor = (character) => {
       return character.rarity === 5 ? 'var(--five-star-bg)' : 'var(--four-star-bg)'
    }

    const isActive = (type, value) => {
        return (filter.type === type && filter.value === value);
    }

    const handleFilter = (type, value) => {
        if (filter.type === type && filter.value === value) {
            setFilter({ type: '', value: null }); // Reset filter
            setOptions(userCharacters); // Reset options to show all characters
            
        } else {
            setFilter({ type, value }); // Set new filter
            let filteredOptions;

            switch (type) {
                case 'rarity':
                    filteredOptions = userCharacters.filter(character => character.rarity === value);
                    break;
                case 'element':
                    filteredOptions = userCharacters.filter(character => character.elementId === value);
                    break;
                case 'path':
                    filteredOptions = userCharacters.filter(character => character.pathId === value);
                    break;
                default:
                    filteredOptions = userCharacters; // 
            }
            setOptions(filteredOptions);
            setFilteredOptions(filteredOptions);

        }
    };

    const handleDeleteCharacter = async (characterId) => {
        const userResponse = await fetch(`http://localhost:3001/users/${user.id}`);
        const userData = await userResponse.json();

        // Filter out the character to be deleted
        const updatedUserCharacters = userData.userCharacters.filter(character => character.characterId !== characterId);
        const updatedUser = { ...userData, userCharacters: updatedUserCharacters };

        console.log(characterId)
        console.log(updatedUser)
        
        const updateResponse = await fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });

        console.log(updatedUserCharacters)
        if (updateResponse.ok) {
            setOptions(updatedUserCharacters);

            toast.success('Character removed successfully', { position: "top-center" });
        } else {
            toast.error('Failed to remove character', { position: "top-center" });
        }
    }
    /*
    const handleCommentSubmit = async (commentBody) => {
        const newComment = {
            userId: user.id,  
            body: commentBody,
            timestamp: new Date().toISOString()
        };

        const response = await fetch('http://localhost:3001/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        });
          
        if (response.ok) {
          
        } else {
        }
        };

    const getUserNameById = async (userId) => {
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        const userData = await response.json();
        return userData.name; 
    };
    */

  return (
    <div className='container-fluid gx-0 characters'>
      {displayForm && (
        <>
            <Form setDisplayForm={setDisplayForm} allCharacters={allCharacters} userId={user.id} />
            <div className='overlay'></div>
        </>
    )}
    <div className='container content-wrapper'>
    <div className='header'>
            <div className='header-content'>
                <div className='text-img'></div>
                <div className='header-text'>
                    <h2 className='title'>Honkai: Star Rail Character List</h2>
                </div>
                <div className='search-bar'>
                    <SearchBar characters={userCharacters} options={options} setOptions={setOptions}
                    filteredOptions={filteredOptions} />
                    <button type="button" className="search-btn btn add-btn" onClick={() => setDisplayForm(true)}><FontAwesomeIcon icon={faPlus} className='icons search-icon' /></button>
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
                        <button className={`img-container element-container btn ${isActive("element", element.id) ? 'active' : ''}`} 
                        onClick={() => handleFilter("element", element.id)}>
                            <img className='element-img filter-icons' src={element.img_src} alt={element.name} />
                        </button>
                    );
                })}
            </div>
            <div className='path-icons-container icon-container'>
            {paths.map((path) => {
                     return (
                        <button className={`img-container path-container btn ${isActive("path", path.id) ? 'active' : ''}`}
                        onClick={() => handleFilter("path", path.id)}>
                            <img className='path-img filter-icons' src={path.img_src} alt={path.name} />
                        </button>
                    );
                })}
            </div>
        </div>
        <div className='character-list-wrapper'>
                <div className='row d-flex'>
                { options.map((option) => {
                    const element = getElement(option);
                    const bgColor = handleBgColor(option);
                    const color = getColor(option)
                    return <CollectionCard  img={option.regular_art} name={option.name} element_img={element.img_src} 
                    element_name={element.name} bgColor={bgColor} characterId={option.id} stats={option.customStats} 
                    color={color}
                    onDelete={handleDeleteCharacter}/>
                })}
                </div>
            </div>
            <div className='homepage-card'>
                <div className='card-title'>
                   Comment Section
                </div>
                <div className='card-content'>
                    <CommentForm />
                    {/*comments.map((comment) => (
                        <div key={comment.id}>
                            <h4>{getUserNameById(comment.userId)}</h4>
                            <p>{comment.body}</p>
                            <small>{new Date(comment.timestamp).toLocaleString()}</small>
                        </div>
                    ))*/}
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>

  )
}

export default Collection