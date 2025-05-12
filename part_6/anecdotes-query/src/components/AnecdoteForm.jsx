import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newMutants = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      dispatch({
        type: 'SHOW',
        payload: 'Content length is too short.'
      })
      setTimeout(() => { dispatch({ type: 'HIDE' }) }, 3000)
      return
    }

    event.target.anecdote.value = ''
    console.log('new anecdote')
    dispatch({
      type: 'SHOW',
      payload: 'New anecdote created.'
    })
    setTimeout(() => { dispatch({ type: 'HIDE' }) }, 3000)
    newMutants.mutate({ content: content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
