import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  dispatch(initializeAnecdotes())
  return (
    <>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
      <Notification />
    </>
  )
}

export default App