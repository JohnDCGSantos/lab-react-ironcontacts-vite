import "./App.css";
import { useState } from "react";
import contactsJSON from "./contacts.json";
function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(
    contactsJSON.slice(5, contactsJSON.length)
  );
    

  function addRandomContact() {
    
    const updateRemaining = [...remainingContacts];

    let randomNum = Math.floor(Math.random() * remainingContacts.length);
    
    let randomContact = updateRemaining.splice(randomNum, 1)[0];
   
    const updatedContacts = [...contacts, randomContact];
   
    setContacts(updatedContacts);
    setRemainingContacts(updateRemaining);
  }

  function sortByPopularity() {
    const toSortPopularity = [...contacts];
    const sortedByPopularity = toSortPopularity.sort(
      (a, b) => b.popularity - a.popularity
    );
    setContacts(sortedByPopularity);
  }

  function sortByName() {
    const toSortName = [...contacts];
    const sortedByName = toSortName.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(sortedByName);
  }
  function deleteContact(id) {
    const indexToDelete = contacts.findIndex((contact)=> contact.id === id);
    const updatedContacts = contacts.slice();
    updatedContacts.splice(indexToDelete, 1)
   

    setContacts(updatedContacts);
  }
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={() => sortByPopularity()}>Sort by Popularity</button>
      <button onClick={() => sortByName()}>Sort by Name</button>
      <button onClick={() => addRandomContact()}>Add Random Contact</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((oneContact) => {
            return (
              <tr key={oneContact.id}>
                <td>
                  <img
                    src={oneContact.pictureUrl}
                    alt={oneContact.name}
                  style = {{height: "200px"}}
                  />
                </td>
                <td>
                <h3>{oneContact.name}</h3>
                </td>
                <td>
                <h3>{oneContact.popularity}</h3>
              </td>
              
              {oneContact.wonOscar ? <td>🏆</td> : <td></td>}
                {oneContact.wonEmmy ? <td>🌟</td> : <td></td>}
                <td>
                  <button onClick={() => deleteContact(oneContact.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
        }

export default App;
