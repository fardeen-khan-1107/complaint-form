import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");

  const onsubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/register", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center  flex-col">
      <div>
        <h1>Registration Form</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div>
            <label htmlFor="username">Name</label>
            <input
              {...register("username", { required: "Username is required" })}
              placeholder="Username"
              type="text"
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              type="text"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <select {...register("role", { required: "Role is required" })}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="technician">Technician</option>
            </select>
            {errors.role && <p>{errors.role.message}</p>}
          </div>
          <input type="submit" />

          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </div>
      <div>
        <Link to="/login"> Go to Login</Link>
      </div>
    </div>
  );
};

export default Signup;