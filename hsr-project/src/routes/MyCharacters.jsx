import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SearchUser from '../components/SearchUser'
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MyCharacters = () => {
    useEffect(() => {
        document.title = "My Characters Page";  
      }, []);

    const [users, setUsers] = useState([]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        
        const foundUser = users.find(user => user.username.toLowerCase() === input.toLowerCase());
    
    
        if (foundUser) {
            navigate(`/my-characters/${foundUser.id}`);
        } else {
            toast.error('User not found', { position: "top-center" });
        }

        
    };

    const addUser = async () => {
        const foundUser = users.find(user => user.username.toLowerCase() === input.toLowerCase());

        if (foundUser) {
            toast.error('User already exists', { position: "top-center" });
        } else {
            try {
                const response = await fetch('http://localhost:3001/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: input, userCharacters: [] }) 
                });

                if (response.ok) {
                    toast.success('User added successfully', { position: "top-center" });
                    fetchUsers();
                } else {
                    toast.error('Error adding user', { position: "top-center" });
                }
            } catch (error) {
                console.error('Error adding user:', error);
                toast.error('Error adding user', { position: "top-center" });
            }
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
                    <SearchUser input={input} setInput={setInput} handleSubmit={handleSubmit} />
                    <button type="button" className="search-btn btn add-btn" onClick={addUser}><FontAwesomeIcon icon={faPlus} className='icons search-icon' /></button>
                </div>
            </div>
        </div>
    </div>
    <ToastContainer />
    </div>
  )
}

export default MyCharacters