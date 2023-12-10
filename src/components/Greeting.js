import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'


 const Greeting = () => {

    const { user } = useAuthContext()
    const name = user.email.split('@')[0]

  return (
     <p className='pb-5 font-poppins text-xl'>Hello {name}!</p>
  )
}

export default Greeting
