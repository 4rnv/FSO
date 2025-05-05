import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
  const updatedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
  const response = await anecdoteService.update(id, updatedAnecdote)
  dispatch(updateAnecdote(response))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer