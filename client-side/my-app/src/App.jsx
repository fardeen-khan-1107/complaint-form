import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.jpeg";
import img3 from "./assets/img3.png";
  
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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('loggedInUser', 'true'); // Store login state (optional)
    navigate('/');
  };

  return (
    <section className='bg-[#edede7]'>
      <div className='w-full flex justify-between p-4'>
        <div>
          <img src={img1} alt="img1" className='w-20' />
        </div>
        <div className='gap-20 flex items-center'>
          {isLoggedIn ? (
            <div className='flex justify-center items-center gap-5'>
              <Link to="/complaint" className="text-xl">Register Complaint</Link>
              <button onClick={() => {setIsLoggedIn(false); localStorage.removeItem('loggedInUser');}}className="text-xl">
                Logout
              </button>
            </div>
          ) : (
            <div className='flex text-2xl gap-5 p-2'>
              <p className="py-2 px-6 rounded-3xl hover:bg-green-300 hover:text-black duration-700">home</p>
              <p className="py-2 px-6 rounded-3xl hover:bg-green-300 hover:text-black duration-700">product</p>
              <p className="py-2 px-6 rounded-3xl hover:bg-green-300 hover:text-black duration-700">about</p>
              <p className="py-2 px-6 rounded-3xl hover:bg-green-300 hover:text-black duration-700">help</p>
            </div>
          )}
        </div>
      </div>
      <div className='w-full flex py-32 ml-10'>
        <div className='font-Hindi w-[50%]  py-2 px-12 mt-[80px]'>
         <p className='text-7xl'> We are here to listen to your voice and take action on it</p>
         <div className='text-2xl mt-10'>
        <Link to="/register" className="py-2 px-6 rounded-3xl border-2 border-gray-400 hover:border-none hover:bg-green-300 hover:text-black duration-700 mr-10 ">Sign up</Link>
        <Link to="/login" className="py-2 px-6 rounded-3xl border-2 border-gray-400 hover:border-none hover:bg-green-300 hover:text-black duration-700">Login</Link>
        </div>
        </div>
        <div className='w-[50%] ml-20'>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/complaint-resolution-specialist-handling-customer-complaints-and-working-to-resolve-them-9026220-7342868.png" alt="img2" className='w-[80%]' />
        </div>
        
      </div>
      <div className='w-full flex text-2xl justify-around'>
        <div className='font-Robot  py-3 px-10 rounded-2xl  hover:bg-green-300 hover:text-black hover:border-none duration-700'>whatsapp</div>
        <div className='font-Robot  py-3 px-10 rounded-2xl  hover:bg-green-300 hover:text-black hover:border-none duration-700'>Email</div>
        <div className='font-Robot  py-3 px-10 rounded-2xl  hover:bg-green-300 hover:text-black hover:border-none duration-700'>Facebook</div>
        <div className='font-Robot  py-3 px-10 rounded-2xl  hover:bg-green-300 hover:text-black hover:border-none duration-700'>Contact No.</div>
        <div className='font-Robot py-3 px-10 rounded-2xl  hover:bg-green-300 hover:text-black hover:border-none duration-700'>Twitter</div>
      </div>
      <div className='w-full flex py-10 '>
        <div className='w-[50%] mt-20 ml-20'>
        <img src={img3} alt="img3" className='h-[30rem] rounded-[80px]' />
        </div>
        <div className='w-[50%]'>
            <div className='font-Robot text-7xl ml-20 mt-20'>
              service accross the world 24/7
            </div>  
            <div className='font-Hindi text-lg w-[80%] ml-20 mt-10'>
            We are committed to providing top-notch service around the clock. Our team is available 24/7 to address your concerns and ensure prompt action. Your voice matters to us, and we are here to listen and respond effectively.
            </div>
            <div className='font-Hindi text-lg w-[80%] mt-2 ml-20'>
            We pride ourselves on our dedication to customer satisfaction. Whether it's day or night, our service team is always ready to assist you with any issues you may encounter. Our commitment to you is unwavering, and we strive to provide seamless support whenever you need it.            </div>
        </div>
      </div>
    </section>
  );
}

export default App;
