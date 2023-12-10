import {React } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


import WorkoutDetails from "../components/WorkoutDetails"


function ViewAllWorkouts() {
    const { workouts, dispatch } = useWorkoutsContext()
    
    const numWorkouts = workouts.length

    
  return (
    <div className='p-5'>
        <h1 className='font-poppins text-2xl py-2'>All Workouts - {numWorkouts}</h1>
        <div className="grid lg:grid-cols-3 md:gap-x-8 md:grid-cols-2 gap-y-1 ">
            {workouts && workouts.map(workout => (
                <WorkoutDetails workout={workout} key={workout._id} />
                ))}
        </div>
    </div>
  )
}

export default ViewAllWorkouts