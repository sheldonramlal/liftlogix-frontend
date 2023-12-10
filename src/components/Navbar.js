import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className='bg-gray-900 text-white'>
      <div className="flex items-center justify-between py-3 px-4 w-full ">
        <Link to="/">
          <h1 className='font-bold text-3xl md:pl-10 font-poppins'>LiftLogix</h1>
        </Link>

        {/* 
        {user && (
        <Link to="addworkout">
          <button className='border rounded-lg border-white text-white p-3 mr-5 hover:bg-white hover:text-gray-900 transition ease-in-out md:text-xl' >Add Workout</button>
        </Link>
        )}*/}
        <nav>
          {user && (  
          <div>
            <button onClick={handleClick} className='border border-white rounded-md p-3 mr-3'>Log out</button>
          </div>
          )}

          {/* 
          { !user && (
            <div> 
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          </div>
          )} */}
        </nav>
      </div>
    </header>
  )
}

export default Navbar