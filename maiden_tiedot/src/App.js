import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'


const SearchForm = ({handleSearchChange}) => (
  <form>
    <div>
      country: <input
      onChange = {handleSearchChange}
      />
    </div>
  </form>
)

const ParseCountryInfo = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h4>Languages</h4>
    <ul>{country.languages.map(x => <li key = {x.name} >{x.name}</li>)}</ul>
    <img src = {country.flag} alt = "flag" width="200"/>
  </div>
)

const Results = ({countries, search, setSearch}) => {
  const matches = countries.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
  if (matches.length > 10 || search === '') {
    return (<p>Try more secific search</p>)
  } else if(matches.length > 1){
    return(
      <ul>
        {matches.map(x => 
          <li key = {x.name} >{x.name} 
            <button onClick = {() => setSearch(x.name)} >Show</button>
          </li>)}
      </ul>
    )
  } else if (matches.length === 1){
    return(<ParseCountryInfo country = {matches[0]} />)
  } else {
    return (<p>No matches</p>)
  }
}


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <SearchForm search = {search} handleSearchChange = {handleSearchChange} />
      <h2>Matches</h2>
      <Results search = {search} countries = {countries} setSearch = {setSearch} />
    </div>
  )

}

export default App;
