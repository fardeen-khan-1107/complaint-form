import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import {Link} from 'react-router-dom'
const Home = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/complaints');
        setComplaints(response.data);
      } catch (error) {
        setError('Failed to fetch complaints');
      }
    };

    fetchComplaints();
  }, []);

  if (!isAuthenticated) {
    return <p>Please log in to view and submit complaints.</p>;
  }

  return (
    <div className='flex  items-center flex-col'>
      <Link to='/complaints'>register</Link>
      <h1>All Complaints</h1>
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {complaints.map((complaint) => (
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
