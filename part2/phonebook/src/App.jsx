import { useState, useEffect } from 'react'
import Person from './components/person';
import PersonForm from './components/personForm';
import Filter from './components/filter';
import axios from 'axios'
import entries from './services/entry';
import Notification from './components/notification';


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showFiltered, setShowFiltered] = useState(true)
  const [addMessage, setAddMessage] = useState(null)
  const [addErrorMessage, setAddErrorMessage] = useState(null)
  useEffect(() => {
    entries
      .getAll()
      .then(initialEntry => {
      setPersons(initialEntry)
      })
  }, [])
  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const exists = persons.find(person => person.name === newName);

    if (exists) {
      const accepted = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if(!accepted) { 
      setNewName('');
      setNewNumber('');
      return;
      } else{
          entries.update(exists.id, newPerson).then(returnedEntry => {
            setPersons(persons.map(person => 
              person.id !== exists.id ? person : returnedEntry
            ));
            message2(newPerson)
            setNewName('');
            setNewNumber('');

          })
          };
        }
    else {
      entries.create(newPerson).then(returnedEntry => {
        setPersons(persons.concat(returnedEntry));
        message(newPerson)
        setNewName('');
        setNewNumber('');
        

      })
   }

  };
  
  const message = (person) => {

    setAddMessage(
      `'${person.name}' was added`
    )
    setTimeout(() => {
      setAddMessage(null)
    }, 2000)
  }
  const message2 = (person) => {

    setAddMessage(
      `'${person.name}' was updated`
    )
    setTimeout(() => {
      setAddMessage(null)
    }, 2000)
  }

  const errorMessage = (person) => {
    setAddErrorMessage(
      `Information of '${person.name}' has already been removed from the server`
    )
    setTimeout(() => {
      setAddErrorMessage(null)
    }, 2000)
  }

  const removePerson = (id) =>{
    const lastDeleted = persons.find(person => person.id === id);
    if(window.confirm(`Delete ${persons.name} ?`) === true) {
    entries.remove(id).then(()=>{
      setPersons(persons.filter(persons=>persons.id !== id))
    }).catch(error=>{
      if (error.response && error.response.status === 404) {
        errorMessage(lastDeleted)
        setPersons(persons.filter(persons=>persons.id !== id))}
      else {
        alert("Error deleting person")
      }
    })
  }
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = showFiltered
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newSearch={newSearch} 
        handleSearchChange={handleSearchChange} 
        toggleShowFiltered={() => setShowFiltered((filtered) => !filtered)}
        showFiltered={showFiltered}
      />

      <Notification message={addMessage} className = "message"/>
      <Notification message={addErrorMessage} className = "error"/>
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(persons =>
          <Person key={persons.id}
                  name={persons.name} 
                  number={persons.number}
                  id={persons.id} 
                  removePerson={removePerson}/>
        )}
      </ul>
    </div>
  )
}

export default App