import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const searchInput = event.target.value
        dispatch(setFilter(searchInput))
    }
    
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>Search: <input onChange={handleChange} /></div>
    )
  }
  
  export default Filter