import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'


function ViewDashboard() {
    const {workouts} = useWorkoutsContext()


    {/* 
    function calculateSum(array, property) {
        const total =  array.reduce((accumulator, object) => {
          return accumulator + object[property];
        }, 0);
      
        return total;
      }
      */}

      function calculateSum(array, property) {
        if (!Array.isArray(array) || array.length === 0) {
          return 0; // Return default value if array is not valid or empty
        }
      
        const total = array.reduce((accumulator, object) => {
          const value = object[property];
          
          // Check if value is valid (not undefined or non-numeric)
          if (typeof value === 'number' && !isNaN(value)) {
            return accumulator + value; // Add valid numeric value to the accumulator
          } else {
            return accumulator; // Ignore invalid or non-numeric values
          }
        }, 0);
      
        return total;
      }
      

      const totalLoad = calculateSum(workouts, 'load')
      const totalReps = calculateSum(workouts, 'reps')
      const totalTime = calculateSum(workouts, 'time')

      {/*
      const workoutsWithProduct = workouts.map(workout => ({
        ...workout,
        product: workout.load * workout.reps
      }));
    */}

    let workoutsWithProduct = [];
      if (workouts) {
        workoutsWithProduct = workouts.map(workout => ({
          ...workout,
          product: workout.load * workout.reps
        }));
      }

      const totalSum = workoutsWithProduct.reduce((sum, workout) => sum + workout.product, 0);

      const [showInfo, setShowInfo] = useState(false)

      const toggleInfo = () => {
        setShowInfo(!showInfo)
      }

      {/*
      function findMostCommonTitle(workouts) {
        const titleMap = new Map();
      
        workouts.forEach(workout => {
          const title = workout.title;
          titleMap.set(title, (titleMap.get(title) || 0) + 1);
        });
      */}

      function findMostCommonTitle(workouts) {
        if (!workouts || !Array.isArray(workouts)) {
          // Handle the case when workouts is null, undefined, or not an array
          return null; // Or return a default value, or throw an error, depending on your use case
        }
      
        const titleMap = new Map();
      
        workouts.forEach(workout => {
          const title = workout.title;
          titleMap.set(title, (titleMap.get(title) || 0) + 1);
        });
             
      

        let mostCommonTitle;
        let maxCount = 0;
      
        titleMap.forEach((count, title) => {
          if (count > maxCount) {
            maxCount = count;
            mostCommonTitle = title;
          }
        });
      
        return [mostCommonTitle , maxCount];
      }

      const [mostCommonTitle, maxCount] = findMostCommonTitle(workouts)

      
      

  return (
    <div className='p-5 bg-white h-screen'>
        <h1 className='text-2xl font-poppins text-gray-800'>Dashboard</h1>
        <div className='grid lg:grid-cols-3 gap-5 mt-5'>
            <div className=' text-xl font-poppins border flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500  rounded-lg p-5'>
                <h3 className='font-bold pb-3'>Favourite Exercise</h3>

                {
                  workouts && workouts.length > 0 ? (
                <>    
                  <p>Your Favourite Exercise is {mostCommonTitle}</p>               
                  <p>You've done this exercise a total of {maxCount} times</p>
                </>
                  ) : (
                    <p>Your favourite exercise will be shown here</p>
                  )
                }
                

            </div>
            <div className='text-xl font-poppins border flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500  rounded-lg px-5     pb-6 pt-5  relative'>
                <p className='font-bold pb-3'>Cumulated weight lifted</p>
                <p className='px-6 text-center'> You've lifted a cummulative weight of {totalSum} kg</p>
                <p onClick={toggleInfo} className='absolute bottom-2 left-2 cursor-pointer' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                </p>
                {
                    showInfo && 
                    <p className='text-sm text-black text-center pt-4 -mb-3 '>This is the total weight you have lifted: loads x reps</p>
                }
            </div>

            <div className='text-xl font-poppins border flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500  rounded-lg p-5'>
               <p className='font-bold pb-3'> Total reps </p>
               <p>You've completed a total of {totalReps} reps!</p>
            </div>

            
            <div className='text-xl font-poppins border flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500  rounded-lg p-5'>
               <p className='font-bold pb-3'> Total time </p>
               <p>You've worked out a total of {totalTime} mins or {(totalTime / 60).toFixed(2)} hours</p>
            </div>
        </div>
    </div>
  )
}

export default ViewDashboard


