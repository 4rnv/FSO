import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.toSorted((a, b) => { return b.votes - a.votes }))
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        console.log('vote', id)
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