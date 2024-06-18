import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Complaints = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/complaints', {
        title: data.title,
        description: data.description,
      });
      setMessage('Complaint submitted successfully');
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit complaint');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            type="text"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Description"
          ></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <input type="submit" />

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Complaints;
