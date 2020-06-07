import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from "./services/persons"


const Person = ({person, deleteFunc}) => (
  <li>
    {person.name} {person.number}<button onClick = {() => deleteFunc(person.id)} >Delete</button>
  </li>
)

const PersonsList = ({persons, filter, deleteFunc}) => {
  const filteredPersons = persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Numbers</h2>
      <ul> {filteredPersons.map(x => <Person key = {x.name} person = {x} deleteFunc = {deleteFunc} />)} </ul>
    </div>
  )
}

const NewPersonForm = ({newName, handleNewName, newNumber, handleNewNumber, handleNewPerson}) => (
  <div>
    <h2>Add new</h2>
    <form onSubmit = {handleNewPerson}>
      <div>
        name: <input 
        value = {newName}
        onChange = {handleNewName}
        />
      </div>
      <div>
        number: <input 
        value = {newNumber}
        onChange = {handleNewNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

const FilterForm = ({filter, handleFilterChange}) => (
  <form>
    <div>
      set filter: <input
      value = {filter}
      onChange = {handleFilterChange}
      />
    </div>
  </form>
)

const Notification = ({text, cssClass, setMessage}) => {
  if (text === null) {
    return null
  }
  setTimeout(() => {
    setMessage({text: null, cssClass: null})
  }, 3000)

  return (
    <div className={cssClass}>
      {text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({text: null, cssClass: null})

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (name, number) => {
    const newPerson = {name: name, number: number}
    personService
    .create(newPerson)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setMessage({text: `Added ${newName}`, cssClass: "notification"})
    })
  }

  const updateNumber = (name, changedNumber) => {
    const personWithNewNumber = persons.find(x => x.name === name)
    personService
    .updateNumber(personWithNewNumber.id, {...personWithNewNumber, number: changedNumber})
      .then(returnedPerson => {
      setPersons(persons.map(x => x.id !== personWithNewNumber.id ? x : returnedPerson))
      setMessage({text: `${newName}'s number changed`, cssClass: "notification"})
      })
      .catch(error => {
        setMessage({text: `${newName} has been removed from the server`, cssClass: "error"})
      })
  }

  const handleNewPerson = event => {
    event.preventDefault()
    const names = persons.map(x => x.name)
    const numbers = persons.map(x => x.number)

    if(! names.includes(newName)) {
      if (! numbers.includes(newNumber)) {
        addPerson(newName, newNumber)
      } 
      else {setMessage({text: `Number ${newNumber} is already taken`, cssClass: "fail"})} 
    }
    else if(! numbers.includes(newNumber)) {
      updateNumber(newName, newNumber)
    } 
    else {setMessage({text: `${newName} is already in phonebook`, cssClass: "fail"})}              
  }

  const handlePersonDelete = id => {
    if (window.confirm(`Delete ${persons.find(x => x.id === id).name}?`)) {
    personService.deletePerson(id)
    setPersons(persons.filter(x => x.id !== id))
    setMessage({text: `${newName} deleted from phonebook`, cssClass: "notification"})
    }
  }

  const handleNewNumber = event => {
    setNewNumber(event.target.value)
  }
  
  const handleNewName = event => {
    setNewName(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={message.text} cssClass = {message.cssClass} setMessage = {setMessage}/>
      <FilterForm filter = {filter} handleFilterChange = {handleFilterChange} />
      <NewPersonForm {...{newName, handleNewName, newNumber, handleNewNumber, handleNewPerson}} />
      <PersonsList persons = {persons}  filter = {filter} deleteFunc = {handlePersonDelete}/>
    </div>
  )

}

export default App