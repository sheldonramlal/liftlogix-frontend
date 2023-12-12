import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { Link } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'


// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import Dashboard from "../components/Dashboard"
import Greeting  from "../components/Greeting"
import AddWorkoutButton from '../components/AddWorkoutButton'


const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  const { user } = useAuthContext()

  

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://workouts-server.onrender.com/api/workouts', {
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

  
    
    if(user){
      fetchWorkouts()
    }

  }, [dispatch, user]) 

  const maxElements = 10


  return (
    <div className="p-5">

      <Greeting />

      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-2'>

        <Link to="dashboard">
          <Dashboard />
        </Link>
        <Link to="addworkout">
          <AddWorkoutButton />
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-poppins py-5">Recent workouts</h2>
      </div>
    

  {
      workouts && workouts.length > 0 ? (
  
      <div className="grid lg:grid-cols-3 md:gap-x-8 md:grid-cols-2 gap-y-1 ">
        {workouts && workouts.slice(0, maxElements).map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      ) : (
        <p className="font-poppins">Add a workout to get started</p>
      )
}
      {workouts && workouts.length > maxElements && (
        <div className="flex mt-6 items-center justify-center">
          <Link to="allworkouts">
            <button className="p-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-poppins">See all Workouts</button>
          </Link>
        </div>
      )}
      
      {/* 
      
    */}
   
    </div>
  )
}

export default Home