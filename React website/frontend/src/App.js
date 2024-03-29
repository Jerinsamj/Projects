// Starter code for the front-end, includes examples of accessing all server 
// API routes with AJAX requests.

import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

// Material UI is included in the install of the front end, so we have access
// to components like Buttons, etc, when we import them.

function Pets() {
  
  // isLoaded keeps track of whether the initial load of pet data from the
  // server has occurred.  pets is the array of pets data in the table, and 
  // searchResults is the array of pets data after a search request.
  const [isLoaded, setIsLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // fetches all pet data from the server
  function fetchPets()
  {
    fetch("http://localhost:3001/api?act=getall")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setPets(result);
      })    
  }
  
  // use fetchPets as an effect with an empty array as a 2nd argument, which 
  // means fetchPets will ONLY be called when the component first mounts
  useEffect(fetchPets, []);
  
  // Inserts a pet with hardcoded data in the URL for each query parameter, we 
  // could insert a pet with custom data by building a string like this:
  //
  // let url = "http://localhost:3001/api?act=add&animal=" + animal + ...
  //
  // fetch(url)
  // .then( ... )...
  //
  function addPet()
  {
    fetch("http://localhost:3001/api?act=add&animal=Dog&description=Dalmatian&age=3&price=103.45")
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      })    
  }

  // Deletes a pet from the pet inventory, using a hardcoded id query parameter
  // Again we could delete a pet with custom data by building a string like:
  //
  // let url = "http://localhost:3001/api?act=delete&id=" + id
  //
  // fetch(url)
  // .then( ... )...
  //
  // 
  function deletePet()
  {
    fetch("http://localhost:3001/api?act=delete&id=3")
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      })    
  }

  // Updates a pet in the pet inventory.  Again we use hardcoded data but 
  // could build a custom fetch URL string.
  function updatePet()
  {
    fetch("http://localhost:3001/api?act=update&id=1&animal=Parrot&description=Green&age=6&price=550.95")
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      });
  }  
  
  // Searches for pets in the pet inventory.  Again we use hardcoded data but
  // we could build a custom fetch URL string.
  function searchPet()
  {
    fetch("http://localhost:3001/api?act=search&term=friendly%20with")
    .then(res => res.json())
    .then(
      (result) => {
        setSearchResults(JSON.stringify(result));
      });
  }

  // If data has loaded, render the table of pets, buttons that execute the 
  // above functions when they are clicked, and a table for search results. 
  // Notice how we can use Material UI components like Button if we import 
  // them as above.
  //
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Server API Usage Demonstration</h1>
        <h2>Pets</h2>
        <table>
          <tbody>
          <tr>
            <th>ID</th>
            <th>Animal</th>
            <th>Description</th>
            <th>Age</th>
            <th>Price</th>
          </tr>
          {pets.map(pet => (
            <tr key={pet.id}>
              <td>{pet.id}</td> 
              <td>{pet.animal}</td> 
              <td>{pet.description}</td>
              <td>{pet.age}</td>
              <td>{pet.price}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <br />
        <h2>Functions</h2>
        <Button variant="contained" onClick={addPet}>Add Dalmatian Pet</Button>
        <br /> <br />
        <Button variant="contained" onClick={deletePet}>Delete Pet ID=3</Button>
        <br /> <br />
        <Button variant="contained" onClick={updatePet}>Update Pet ID=1</Button>
        <br /> <br />
        <Button variant="contained" onClick={searchPet}>Search Pets for "friendly with"</Button>

        <br /> <br />
        
        <h2>Search Results</h2>
        <pre>{searchResults}</pre>

      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Pets />
    </div>
  );
}

export default App;
