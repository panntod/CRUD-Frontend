import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();

    const user = { name, email, password, gender };
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.log("Failed to save user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-1/2 my-auto">
        <form
          onSubmit={saveUser}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <div className="control">
              <input
                type="text"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="control">
              <input
                type="email"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="control">
              <input
                type="password"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <div className="control">
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="block appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-6 focus:outline-none focus:shadow-outline"
                  id="gender"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.293 9.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
