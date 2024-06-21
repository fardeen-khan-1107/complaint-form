import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onsubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/register", data);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center bg-[#edede7] h-[100vh] font-Hindi">
      <div className="w-2/6 bg-white shadow-md rounded-lg p-8 ">
        <h1 className="text-2xl font-bold text-center mb-4">Registration Form</h1>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative mt-1">
              <input {...register("username", { required: "Username is required" })} placeholder="Username" type="text" className="w-full border border-gray-300 rounded-lg p-2 pr-10"/>
              <FaUser className="absolute right-2 top-2 text-gray-400" />
            </div>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium  text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <input
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 pr-10"
              />
              <FaEnvelope className="absolute right-2 top-2 text-gray-400" />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium   text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg p-2 pr-10"/>
              <FaLock className="absolute right-2 top-2 text-gray-400" />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          {/* <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium mt-3 mr-[60px] text-gray-700">
              Role
            </label>
            <select {...register("role", { required: "Role is required" })} className=" w-52 border border-gray-300 rounded-lg p-2 mt-1">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="technician">Technician</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div> */}
          <button type="submit" className="w-92 ml-44 bg-blue-500 text-white py-2 px-10 rounded-lg hover:bg-blue-600 mt-4">
            Submit
          </button>
          {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        </form>
        <div className="mt-4 text-center flex ml-32">
          Have an Account?
          <Link to="/login" className="text-blue-500 hover:underline">Go to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
