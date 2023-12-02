import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Root from './routes/Root'
import Homepage from './routes/Homepage'

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
                  return characters.filter(character => characterIds.includes(character.character_id));
                  
        });
    });
        }

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
