import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [allComplaints, setAllComplaints] = useState([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/complaints');
        setAllComplaints(response.data);
      } catch (error) {
        setFetchError('Failed to fetch complaints');
      }
    };

    fetchComplaints();
  }, []); 

  return (
    <div className=' items-center flex-col font-Hindi'>
      <Link to='/complaints' className='flex justify-end mb-4 text-2xl'>
      <p className='border-2 border-black py-4 px-5 rounded-md mt-7 mr-20 hover:bg-green-300 hover:text-black duration-700 hover:border-none'>Go to Complaints</p></Link>
      <h1 className='flex justify-center text-5xl font-bold mb-20'>All Complaints</h1>
      {fetchError && <p className='text-red-500 mb-4'>{fetchError}</p>}
      <div className='flex flex-wrap gap-6'>
        {allComplaints.map((complaint) => (
          <div key={complaint._id} className='border border-gray-300 rounded-lg p-4 w-72'>
            <h2 className='text-lg font-semibold mb-2'><strong className='text-[#6B8A7A]'>User Name:</strong>{complaint.title}</h2>
            <p className='text-gray-600'><strong className='text-[#6B8A7A]'>user Complaint:</strong>{complaint.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
