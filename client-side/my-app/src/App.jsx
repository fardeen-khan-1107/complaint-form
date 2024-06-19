import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const handleLoginSuccess = () => {
  setIsLoggedIn(true);
  localStorage.setItem('loggedInUser', 'true'); // Store login state (optional)
  navigate('/');
};
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const navigate = useNavigate();
  useEffect(() => {
    // Check for existing login state in localStorage (optional)
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array to run only once on component mount



  return (
    <>
      <h1 className='flex justify-center items-center'>Home page</h1>
      {isLoggedIn ? (
        <div className='flex justify-center items-center gap-5'>
          <Link to="/complaint">Register Complaint</Link>
          <button onClick={() => {setIsLoggedIn(false); localStorage.removeItem('loggedInUser');}}>Logout</button>
        </div>
      ) : (
        <div className='flex justify-center items-center gap-5'>
          <Link to="/register">Sign up</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </>
  );
}

export default App;
