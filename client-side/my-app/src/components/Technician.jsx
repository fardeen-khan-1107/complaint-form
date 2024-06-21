import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Technician = () => {
  const [complaints, setComplaints] = useState([]);
  const [description, setDescription] = useState("");
  const { technicianUsername } = useParams();

  useEffect(() => {
    const fetchAssignedComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/technicians/${technicianUsername}/complaints`);
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };
    fetchAssignedComplaints();
  }, [technicianUsername]);

  const handleFixIssue = async (complaintId) => {
    try {
      await axios.put(`http://localhost:5000/complaints/${complaintId}/fix`, {
        description: description
      });
      setComplaints(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint._id === complaintId ? { ...complaint, status: 'Fixed' } : complaint
        )
      );
      setDescription(""); // Clear description after fixing the issue
    } catch (error) {
      console.error('Error fixing the issue:', error);
    }
  };

  return (
    <div className="w-full container p-10">
      <h1 className="text-4xl font-bold">Technician Dashboard</h1>
      <h2 className="text-2xl mt-4">Complaints assigned to {technicianUsername}</h2>
      <div className="grid gap-6 grid-cols-3 my-10">
        {complaints.map((complaint) => (
          <div key={complaint._id} className="bg-white p-4 rounded shadow-md col-span-1">
            <h2 className="text-xl font-semibold"><strong>User:</strong> {complaint.title}</h2>
            <p><strong>Complaint:</strong> {complaint.description}</p>
            <p><strong>Assigned Technician:</strong> {complaint.assignedTechnician}</p>
            <p><strong>Status:</strong> {complaint.status}</p>
            {complaint.status !== 'Fixed' && (
              <>
                <textarea
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="Describe the fix..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button 
                  onClick={() => handleFixIssue(complaint._id)}
                  className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-green-300"
                >
                  Fix the Issue
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technician;
