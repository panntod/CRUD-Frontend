import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { URL_REST_API } from '../constant/URL';

const UserList = () => {
  const [users, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch(URL_REST_API + '/users');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = (id) => async () => {
    const isConfirmed = confirm('Are you sure you want to delete this user?');

    if (!isConfirmed) return;

    try {
      const response = await fetch(URL_REST_API + '/users/' + id, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      getUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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

        <table className="table-auto w-full mt-10 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-600 text-white">No</th>
              <th className="px-4 py-2 bg-blue-600 text-white">Name</th>
              <th className="px-4 py-2 bg-blue-600 text-white">Email</th>
              <th className="px-4 py-2 bg-blue-600 text-white">Gender</th>
              <th className="px-4 py-2 bg-blue-600 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="border" key={user.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.gender}</td>
                <td className="px-4 py-2 space-x-4 flex justify-center">
                  <Link
                    to={`edit/${user.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={deleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
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
