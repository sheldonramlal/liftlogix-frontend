import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const { user } = useAuthContext()

  const handleClick = async () => {
    if(!user){
      return
    }

    const response = await fetch('https://workouts-server.onrender.com/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="bg-gray-800 border border-black rounded-lg my-1 mx-auto p-5 shadow-sm relative w-full">
      <h4 className='text-white text-2xl font-bold mb-3'>{workout.title}</h4>
      <p className='text-white'><strong>Load (kg): </strong>{workout.load}</p>
      <p className='text-white'><strong>Number of reps: </strong>{workout.reps}</p>
      <p className='text-white'>Created {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined bg-red-400 rounded-lg cursor-pointer absolute bottom-5 right-5 p-2" onClick={handleClick}>delete</span>
      <div className='absolute top-5 right-5 rounded-xl bg-white py-1 px-2 flex  '>  
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-1 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className='inline-block font-poppins'>{workout.time}</p>
      </div>

    </div>
  )
}

export default WorkoutDetails