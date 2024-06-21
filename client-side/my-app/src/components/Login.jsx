import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthContext";
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  // function to handle form submission
  const onSubmit = async (formData) => {
    try {
      // send login request to backend
      const response = await axios.post('http://localhost:5000/login', {
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });
      // Call login function from AuthContext to set user authentication
      login(response.data.user);
      if (response.data.role === 'admin') {
        navigate('/admin'); 
      } else if (response.data.role === 'technician') {
        navigate('/technician'); 
      } else {
        navigate('/home'); }
    } catch (error) {
      console.error('Login error:', error);  
      setErrorMessage('Failed to login'); 
    }
  }
  return (
    <div className="flex items-center justify-center bg-[#edede7] h-[100vh]">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-4">Login Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 ">
            <label  className="block text-sm font-medium mb-1">Username</label>
            <input 
              {...register("username", { required: "Username is required" })} 
              placeholder="Username" 
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"/>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 ">Password</label>
            <input {...register("password", { required: "Password is required" })} type="password" placeholder="Password"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"/>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="mb-4 ">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select {...register("role", { required: "Role is required" })}
              className="w-2/6 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="technician">Technician</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>
          <button type="submit" className="w-32 bg-blue-500 text-white py-2 px-4 rounded-lg ml-32 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Login
          </button>
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </form>
        <div className="mt-4 text-center flex justify-center">
          Don't have a Account?
          <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
