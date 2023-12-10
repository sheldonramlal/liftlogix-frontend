import {React, useState} from 'react'
import { useLogin } from '../hooks/useLogin'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'



export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user } = useAuthContext()

    const { login, error, isLoading } = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password);
    }

  return (
    <div className='w-full flex items-center justify-center  lg:pt-0 lg:justify-center flex-col bg-gradient-to-r from-cyan-500 to-blue-500 h-screen'>

      <h1 className='mb-20 font-poppins text-2xl text-center'>Track all your Workouts in one place</h1>

      <h1 className='text-2xl lg:text-3xl  text-white font-bold font-poppins -mt-10 '>Login</h1>
        
       <div className=' w-3/4  lg:w-1/3 bg-white p-5 rounded-lg mt-6'>

        <form className="login" onSubmit={handleSubmit}>
          
            <label>Email:</label>
            <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='bg-gray-200'
            />

            <label>Password:</label>
            <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='bg-gray-200'
            />

          <div className='flex flex-col items-center justify-center'>
            <button disabled={isLoading} className='text-white bg-slate-900 w-1/2 '>Login</button>
            {error && <div className='p-2 bg-red-100 border border-red-400 text-red-400 rounded-md mt-5 '> {error}</div>}
          </div>
        </form>
      </div>
      
      { !user && (
          <div className='text-white mt-8'> 
            <Link to="/signup">Don't have an account? Signup here</Link>
          </div>
      )}
    </div>
  )
}


