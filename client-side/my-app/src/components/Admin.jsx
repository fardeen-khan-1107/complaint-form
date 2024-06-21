import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Admin = () => {
  const [complaintData, setComplaintData] = useState([]);
  const [technicianData, setTechnicianData] = useState([]);
  const [currentTechnician, setCurrentTechnician] = useState("");

  // Fetch all complaints and technicians when the component mounts
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

  // Handle assigning a technician to a complaint
  const handleAssign = async (complaintId) => {
    try {
      await axios.put(`http://localhost:5000/complaints/${complaintId}/assign`, {
        technician: currentTechnician
      });
      // Update the page when we assign a complaint to the technician
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
    <div className="w-full container p-10 bg-[#edede7]">
      <div className="flex mt-4">
        <Link to="/login" className="text-blue-500">Back to Login</Link>
      </div>
      <h1 className="text-4xl font-bold text-[#254336]">Admin Dashboard</h1>
      <div className="grid gap-6 grid-cols-3 my-10">
        {complaintData.map((complaint) => (
          <div key={complaint._id} className="bg-white p-4 rounded-xl shadow-md col-span-1">
            {/* Display complaint details */}
            <h2 className="text-xl font-semibold"><strong className="text-[#6B8A7A]">User Name:</strong> {complaint.title}</h2>
            <p><strong className="text-[#6B8A7A]">issue:</strong> {complaint.description}</p>
            {/* <p>{complaint.username}</p> */}
            {/* <p><strong className="text-[#6B8A7A]">No. of Technician:</strong> {complaint.assignedTechnician || 'None'}</p> */}
            <div className="mt-2">
              <label htmlFor="technician" className="block text-[#6B8A7A] text-sm font-medium text-gray-700">
                Assign
              </label>
              <select
                id="technician"
                name="technician"
                className="mt-1 block w-2/6 pl-3 py-2 text-base border-2 sm:text-sm rounded-md"
                value={currentTechnician}
                onChange={(e) => setCurrentTechnician(e.target.value)}>
                <option value="">Select Technician</option>
                {technicianData.map((tech) => (
                  <option key={tech._id} value={tech.username}>
                    {tech.username}
                  </option>
                ))}
              </select>
              <button onClick={() => handleAssign(complaint._id)} className="mt-2 border-2 py-1 px-3 rounded-2xl hover:bg-green-300">Assign</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
