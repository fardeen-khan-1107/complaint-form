import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// main component for complaint
const Complaints = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  //uses navhooks to navigate  different router
  const navigate = useNavigate();
  // connect to the backend and check and maintain the connection
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField  register={register("title", { required: "Title is required" })} placeholder="Name of user" type="text" error={errors.title} />
        <FormField register={register("description", { required: "Description is required" })} placeholder="Description" type="textarea" error={errors.description}/>
        <input type="submit" />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

//reusable FormField component to handle different types of form fields
const FormField = ({ register, placeholder, type, error }) => (
  <div>
    {type === "textarea" ? (
      <textarea {...register} placeholder={placeholder}></textarea>
    ) : (
      <input {...register} placeholder={placeholder} type={type} />
    )}
    {error && <p>{error.message}</p>}
  </div>
);

export default Complaints;
