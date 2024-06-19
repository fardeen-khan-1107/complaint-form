import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Admin = () => {
  const [complaintData, setComplaintData] = useState([]); 
  const [technicianData, setTechnicianData] = useState([]);
  // state for storing the selected technician
  const [currentTechnician, setCurrentTechnician] = useState("");
  // fetch all complaints and technicians when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const complaintsResponse = await axios.get('http://localhost:5000/complaints');
         setComplaintData(complaintsResponse.data);
        const techniciansResponse = await axios.get('http://localhost:5000/technicians');
        setTechnicianData(techniciansResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
fetchData();
 }, []);

  // handle assigning a technician to a complaint
  const handleAssign = async (complaintId) => {
    try {
      await axios.put(`http://localhost:5000/complaints/${complaintId}/assign`, {
        technician: currentTechnician
      });
      
      // Update the page when we complaint to the admin
      setComplaintData(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint._id === complaintId
            ? { ...complaint, assignedTechnician: currentTechnician }
            : complaint
        )
      );
    } catch (error) {
      console.error('Error assigning technician:', error);
    }
  };

  return (
    <div className="w-full container p-10">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-6 grid-cols-3 my-10">
        {complaintData.map((complaint) => (
          <div key={complaint._id} className="bg-white p-4 rounded shadow-md col-span-1">
            {/* Display complaint details */}
            <h2 className="text-xl font-semibold"><strong>User:</strong> {complaint.title}</h2>
            <p><strong>Complaint:</strong> {complaint.description}</p>
            {/* <p>{complaint.username}</p> */}
            <p><strong>Assigned Technician:</strong> {complaint.assignedTechnician || 'None'}</p>
            <div className="mt-2">
              <label htmlFor="technician" className="block text-sm font-medium text-gray-700">
                Assign Technician
              </label>
              <select
                id="technician"
                name="technician"
                className="mt-1 block w-full pl-3 py-2 text-base border-gray-300 sm:text-sm rounded-md"
                value={currentTechnician}
                onChange={(e) => setCurrentTechnician(e.target.value)}
              >
                <option value="">Select Technician</option>
                {technicianData.map((tech) => (
                  <option key={tech._id} value={tech.username}>
                    {tech.username}
                  </option>
                ))}
              </select>
              <button onClick={() => handleAssign(complaint._id)} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-green-300">Assign</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/login" className="text-blue-500">Back to Login</Link>
      </div>
    </div>
  );
};

export default Admin;
