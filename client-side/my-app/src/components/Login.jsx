import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthContext";
const LoginForm = () => {
  // variables for  handling form and error message
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigator = useNavigate();
  const { login } = useContext(AuthContext); 
  // Function to handle form task
  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });
      // Extract token from response data
      const token = response.data.token;
      // Call login function from AuthContext to authenticate user
      login(response.data.user);
      // navigator('/home');
      if(response.data.role=='admin'){
        navigator('/admin');
      }
      else if(response.data.role=='technician'){
        navigator('/technician');
      }
      else{
        navigator('/home');
      }
    } catch (error) {
      console.error('Login error:', error);  
      setErrorMessage('Failed to login');
    }
  }
  return (
    <div className="flex items-center flex-col">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("username", { required: "Username is required" })} placeholder="Username" type="text"/>
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <input {...register("password", { required: "Password is required" })} type="password" placeholder="Password"/>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          {/* Dropdown */}
          <label htmlFor="role">Role</label>
          <select {...register("role", { required: "Role is required" })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="technician">Technician</option>
          </select>
          {errors.role && <p>{errors.role.message}</p>}
        </div>
        {/* Submit button */}
        <input type="submit" value="Login" />
        {/* Display error if login fails */}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      {/* Link to registration page */}
      <div>
        <Link to="/register">Registration page</Link>
      </div>
    </div>
  );
};

export default LoginForm;
