import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const navigate = useNavigate();
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, load, reps, time}

   

    if(!user){
      setError('You must be logged in')
      return
    }
    
    const response = await fetch('https://workouts-server.onrender.com/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      setTime('')
      dispatch({type: 'CREATE_WORKOUT', payload: json})
      navigate('/')
    }

  }

  return (
    <div className='w-full flex items-center justify-center flex-col bg-gradient-to-r from-green-400 to-green-300 h-screen'>
      <h1 className='text-2xl lg:text-3xl text-white font-bold font-poppins -mt-10 lg:-mt-32'>Add a New Workout</h1>
      <div className=' w-3/4  lg:w-1/3 bg-white p-5 rounded-lg mt-6'>
        <form className="create flex flex-col" onSubmit={handleSubmit}> 
          

          <label className='font-poppins'>Exercise:</label>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={`bg-gray-200 ${emptyFields.includes('title') ? 'error' : ''}`} 
          />

          <label className='font-poppins'>Load (in kg):</label>
          <input 
            type="number" 
            onChange={(e) => setLoad(e.target.value)} 
            value={load}
            className={`bg-gray-200 ${emptyFields.includes('load') ? 'error' : ''}`}
          />

          <label className='font-poppins'>Number of Reps:</label>
          <input 
            type="number" 
            onChange={(e) => setReps(e.target.value)} 
            value={reps}
            className={`bg-gray-200 ${emptyFields.includes('reps') ? 'error' : ''}`}
          />

          <label className='font-poppins'>Time (in mins):</label>
          <input 
            type="number" 
            onChange={(e) => setTime(e.target.value)} 
            value={time}
            className={`bg-gray-200 ${emptyFields.includes('time') ? 'error' : ''}`}
          />
          <div className='flex items-center justify-center'>
            <button className='font-poppins w-1/2 bg-slate-900 '>Add Workout</button>
          </div>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default WorkoutForm