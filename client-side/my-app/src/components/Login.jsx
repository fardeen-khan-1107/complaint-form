import React, { useState, useContext} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {Link , useNavigate} from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate =useNavigate();
  const { login } = useContext(AuthContext);

  const onsubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: data.username,
      password: data.password,
      });
      const token = response.data.token;

      login(response.data.user);
      navigate('/home');
      // Handle successful login
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to login');
    }
  };

  return (
    <div className="flex  items-center flex-col">
      <h1> Login Form</h1>
    <form onSubmit={handleSubmit(onsubmit)}>
      <div>
        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
          type="text"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <input type="submit" />

      {errorMsg && <p>{errorMsg}</p>}
    </form>
    <div>
    <Link to="/register">Registration page</Link>
    </div>
    </div>
  );    
};

export default Login;
