import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
       return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) => b.votes - a.votes )})
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        console.log('vote', id)
        dispatch(setNotification(`You voted for anecdote ${id}`))
        setTimeout(()=>{dispatch(removeNotification())},5000)
    }

    return (
        <><h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList