import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [allComplaints, setAllComplaints] = useState([]);
  const [fetchError, setFetchError] = useState('');

  //fetch complaints from the server
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

  //show all the complaints to the user
  return (
    <div className='flex items-center flex-col'>
      <Link to='/complaints'>Go to Complaints</Link>
      <h1>All Complaints</h1>
      {fetchError && <p>{fetchError}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {allComplaints.map((complaint) => (
          <div key={complaint._id} style={{ border: '1px solid black', padding: '20px', margin: '10px', width: '300px' }}>
            <h2>{complaint.title}</h2>
            <p>{complaint.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
