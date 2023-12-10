import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import WorkoutForm from './components/WorkoutForm';
import ViewDashboard from './pages/ViewDashboard';
import ViewAllWorkouts from './pages/ViewAllWorkouts';
import ScrollToTop from './components/ScrollToTop';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <div className="w-full  my-0 mx-auto bg-white">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route
              path="addworkout"
              element = {<WorkoutForm />}
            />
            <Route 
               path="dashboard"
               element = {<ViewDashboard />}
            />
            <Route 
               path="allworkouts"
               element = {<ViewAllWorkouts />}
            />
            <Route 
               path="/login"
               element = {!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
               path="/signup"
               element = {!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

