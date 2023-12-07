import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Root from './routes/Root'
import Homepage from './routes/Homepage'
import Characters from './routes/Characters'
import CharacterSheet from './routes/CharacterSheet';
import MyCharacters from './routes/MyCharacters';
import 'react-toastify/dist/ReactToastify.css';
import Collection from './routes/Collection';
import NotImplemented from './routes/NotImplemented';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Homepage />,
        loader() {
          return fetch('http://localhost:3001/version_update_1.5')
            .then((response) => response.json())
            .then((versionUpdate) => {
              // Extract character IDs from the version update
              const characterIds = versionUpdate.character_ids;
              console.log(characterIds);

              // Fetch the characters data
              return fetch('http://localhost:3001/characters')
                .then((response) => response.json())
                .then((characters) => {
                  console.log(characters);
                  // Filter characters to match the character IDs from the version update
                  return characters.filter(character => characterIds.includes(character.id));
                  
            });
          });
        }

      },
      {
        path: '/characters',
        element: <Characters />,
        loader: async () => {
          const charactersURL = 'http://localhost:3001/characters';
          const pathsURL = 'http://localhost:3001/paths';
          const elementsURL = 'http://localhost:3001/elements';

          // Fetch all resources concurrently
          const [charactersResponse, pathsResponse, elementsResponse] = await Promise.all([
            fetch(charactersURL),
            fetch(pathsURL),
            fetch(elementsURL),
          ]);

          // Convert all responses to JSON
          const [characters, paths, elements] = await Promise.all([
            charactersResponse.json(),
            pathsResponse.json(),
            elementsResponse.json(),
          ]);

          // Return a combined result
          return { characters, paths, elements };
        }
        
      },
      {
        path: '/characters/:characterId',
        element: <CharacterSheet />,
        loader(loaderData) {
          return fetch(`http://localhost:3001/characters/${loaderData.params.characterId}?_expand=element&_expand=path`)
          .then((response) => {
            return response.json();
          })
        }
      },
      {
      path: '/my-characters',
      element: <MyCharacters />,
      },
      {
        path: '/my-characters/:userId',
        element: <Collection />,
        loader(loaderData) {
          const userId = loaderData.params.userId;
          const usersURL = `http://localhost:3001/users/${userId}`;
          const charactersURL = 'http://localhost:3001/characters';
          const pathsURL = 'http://localhost:3001/paths';
          const elementsURL = 'http://localhost:3001/elements';
        
          // Fetch all required data concurrently
          return Promise.all([
            fetch(usersURL).then(res => res.json()),
            fetch(charactersURL).then(res => res.json()),
            fetch(pathsURL).then(res => res.json()),
            fetch(elementsURL).then(res => res.json())
          ]).then(([user, allCharacters, paths, elements]) => {
            // Process and combine the data
            console.log(user.userCharacters);
            const userCharacters = user.userCharacters.map(uc => {
              const character = allCharacters.find(c => c.id === uc.characterId);
              return { ...character, customStats: uc.customStats };
            });
        
            return { user, allCharacters, userCharacters, paths, elements };
          });
        }
        
      },
      {
        path: '/relics',
        element: <NotImplemented />
      },
      {
        path: '/tier-list',
        element: <NotImplemented />
      },
      {
        path: 'light-cones',
        element: <NotImplemented />
      }
    ]
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
