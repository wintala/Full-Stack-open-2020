import React, {useEffect} from 'react'
import { useDispatch } from "react-redux";
import CreationForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdotes } from "./reducers/anecdoteReducer";


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])


  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <Anecdotes/>
      <CreationForm/>
    </div>
  )
}

export default App