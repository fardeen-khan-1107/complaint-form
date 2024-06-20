import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Main component for complaint
const Complaints = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Connect to the backend and check and maintain the connection
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/complaints', data);
      setMessage('Complaint submitted successfully');
      navigate('/home');
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Failed to submit complaint');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#edede7]">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Submit your  Complaint</h2>
        <FormField register={register("title", { required: "Title is required" })} placeholder="Name of user" type="text" error={errors.title} />
        <FormField register={register("description", { required: "Description is required" })} placeholder="Description" type="textarea" error={errors.description} />
        <button type="submit" className="mt-4 w-2/6 ml-32 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

// Reusable FormField component to handle different types of form fields
const FormField = ({ register, placeholder, type, error }) => (
  <div className="mb-4">
    {type === "textarea" ? (
      <textarea {...register} placeholder={placeholder} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
    ) : (
      <input {...register} placeholder={placeholder} type={type} className="w-full p-2 border border-gray-300 rounded-md" />
    )}
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
  </div>
);

export default Complaints;
