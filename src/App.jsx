/*import './App.css'
import { useState } from 'react'
import contactsJSON from './contacts.json'

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5))
  const [remainingContacts, setRemainingContacts] = useState(
    contactsJSON.slice(5, contactsJSON.length)
  )

  function addRandomContact() {
    const updateRemaining = JSON.parse(JSON.stringify(remainingContacts))

    let randomNum = Math.floor(Math.random() * remainingContacts.length)
    let randomContact = updateRemaining.splice(randomNum, 1)[0]
    const updatedContacts = [randomContact, ...contacts]
    setContacts(updatedContacts)
    setRemainingContacts(updateRemaining)
  }

  function sortByPopularity() {
    const toSortPopularity = [...contacts]
    const sortedByPopularity = toSortPopularity.sort((a, b) => b.popularity - a.popularity)
    setContacts(sortedByPopularity)
  }

  function sortByName() {
    const toSortName = [...contacts]
    const sortedByName = toSortName.sort((a, b) => a.name.localeCompare(b.name))
    setContacts(sortedByName)
  }
  function deleteContact(id) {
    const indexToDelete = contacts.findIndex(contact => contact.id === id)
    const updatedContacts = contacts.slice()
    updatedContacts.splice(indexToDelete, 1)

    setContacts(updatedContacts)
  }
  return (
    <div className='App'>
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
          {contacts.map(oneContact => {
            return (
              <tr key={oneContact.id}>
                <td>
                  <img
                    src={oneContact.pictureUrl}
                    alt={oneContact.name}
                    style={{ height: '200px' }}
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
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App*/

import { useState } from 'react'
import './App.css'
import contactsJson from './contacts.json'
function App() {
  const [contacts, setContacts] = useState(contactsJson.slice(0, 5)) //creating state variable and store an array with first 5 contacts
  const [remainingContacts, setRemainingContacts] = useState(
    contactsJson.slice(5, contactsJson.length)
  ) //GETTING REMAINING CONTACTS
  //console.log({ remainingContacts })
  const [order, setOrder] = useState('asc')
  function addRandomContact() {
    // Step 1: Generate a random index within the range of remainingContacts array
    const randomIndex = Math.floor(Math.random() * remainingContacts.length)
    // Step 2: Get a random contact using the random index
    const randomContact = remainingContacts[randomIndex]
    // Step 3: Update the state of 'contacts' by creating a new array with the randomContact added to the beginning using the spread operator
    setContacts([randomContact, ...contacts])
    // Step 4: Create a new array 'newRemaining' by filtering out the randomContact from the 'remainingContacts' array based on their 'id' property
    const newRemaining = remainingContacts.filter(contact => {
      if (contact.id !== randomContact.id) {
        return contact
      }
    })
    // Step 5: Update the state of 'remainingContacts' with the newRemaining array

    setRemainingContacts(newRemaining)
  }
  function sortByPopularity() {
    let contactsDeepCopy = JSON.parse(JSON.stringify(contacts))
    const newOrder = order === 'asc' ? 'desc' : 'asc'
    const sortByPopularity = contactsDeepCopy.sort((a, b) => {
      if (order === 'asc') {
        return a.popularity - b.popularity
      } else {
        return b.popularity - a.popularity
      }
    })
    setContacts(sortByPopularity)
    setOrder(newOrder)
  }

  function sortByName() {
    let contactsDeepCopy = JSON.parse(JSON.stringify(contacts))
    const newOrder = order === 'asc' ? 'desc' : 'asc'
    const sortByName = contactsDeepCopy.sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })
    setContacts(sortByName)
    setOrder(newOrder)
  }
  function deleteContact(id) {
    const indexToDelete = contacts.findIndex(contact => contact.id === id)
    const updatedContacts = contacts.slice()
    updatedContacts.splice(indexToDelete, 1)

    setContacts(updatedContacts)
  }
  return (
    <div className='App'>
      <h1>LAB | React IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <button onClick={sortByName}>Sort by Name</button>

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
          {contacts.map(oneContact => {
            return (
              <tr key={oneContact.id}>
                <td>
                  <img className='img' src={oneContact.pictureUrl} alt={oneContact.name} />
                </td>
                <td>
                  <h3>{oneContact.name}</h3>
                </td>
                <td>
                  <h3>{oneContact.popularity}</h3>
                </td>
                <td>{oneContact.wonEmmy ? '🏆' : null}</td>
                <td>{oneContact.wonOscar ? '🏆' : null}</td>
                <td>
                  <button onClick={() => deleteContact(oneContact.id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
