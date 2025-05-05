import { createAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You created anecdote "${content}"`))
        setTimeout(()=>{dispatch(removeNotification())},5000)
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