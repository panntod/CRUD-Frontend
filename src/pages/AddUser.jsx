import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/Form';
import GenderSelect from '../components/Select';
import { URL_REST_API } from '../constant/URL';

const AddUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'Male',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL_REST_API + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error('Failed to update user');
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen mt-5">
      <div className="w-1/2 my-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Add User
          </h1>

          <FormField
            label="Name"
            id="name"
            type="text"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <FormField
            label="Email"
            id="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <FormField
            label="Password"
            id="password"
            type="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <GenderSelect
            label="Gender"
            id="gender"
            value={user.gender}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
