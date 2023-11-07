import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mt-5 justify-center">
      <div className="w-1/2">
        <div className="flex justify-between">
        <Link
          to="add"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New
        </Link>
        <h1 className="font-semibold text-lg my-auto">Hello, Admin!</h1>
        </div>
        <table className="table-auto w-full mt-10 shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-600 text-white border-tl">No</th>
              <th className="px-4 py-2 bg-blue-600 text-white">Name</th>
              <th className="px-4 py-2 bg-blue-600 text-white">Email</th>
              <th className="px-4 py-2 bg-blue-600 text-white">Gender</th>
              <th className="px-4 py-2 bg-blue-600 text-white border-tr">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>

            {users.map((user, index) => (
              <tr className="border" key={user.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2 flex justify-end">
                  <Link
                    to={`edit/${user.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
