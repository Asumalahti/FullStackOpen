import { useState } from 'react'
import Person from './components/person';
import PersonForm from './components/personForm';
import Filter from './components/filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showFiltered, setShowFiltered] = useState(true)

  const addName = (event) => {
    event.preventDefault();
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }
  
    const newPerson = {
      name: newName,
      number: newNumber,
    };
  
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };
  
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
          <Person key={persons.name} name={persons.name} number={persons.number} />
        )}
      </ul>
    </div>
  )
}

export default App