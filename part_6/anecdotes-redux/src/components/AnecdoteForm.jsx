import { createAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
      }
    return (
        <>
            <h2>Create New</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote' required />
                <button type='submit'>Create</button>
            </form>
        </>
    )
}

export default AnecdoteForm