import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  setAddress,
  setEmail,
  setGeolocation,
  setError,
  Geolocation,
} from '../formSlice';
import { RootState } from '../store';

interface FormProps {
  onResults: (data: Geolocation) => void;
  onLoading: (isLoading: boolean) => void;
  onError: (error: string | null) => void;
}

const Form: React.FC<FormProps> = ({ onResults, onLoading, onError }) => {
  const dispatch = useDispatch();
  const { address, email } = useSelector((state: RootState) => state.form);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLoading(true);
    onError(null);

    try {
      const requestBody: { address: string; email?: string } = {
        address,
      };

      if (email) {
        requestBody.email = email;
      }

      // Use the environment variable for the backend URL
      const backendUrl = import.meta.env.VITE_BASE_URL; // Correctly using import.meta.env

      const response = await axios.post(
        `${backendUrl}/api/geolocation/search`,
        requestBody
      );

      const data = response.data;

      dispatch(setGeolocation(data.geolocation));
      onResults(data);
      if (email) {
        toast.success('An email will be sent with the geolocation details!', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    } catch (err: unknown) {
      console.log(err);
      if (axios.isAxiosError(err) && err.response) {
        onError(err.response.data.message || 'Failed to fetch geolocation');
        dispatch(
          setError(err.response.data.message || 'Failed to fetch geolocation')
        );
      } else {
        console.log(err);
        onError('An unknown error occurred');
        dispatch(setError('An unknown error occurred'));
      }
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
        <div>
          <label className="block text-white font-semibold">
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
              required
              className="text-gray-700 mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-white font-semibold">
            Email (optional):
            <input
              type="email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="text-gray-700 mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
        >
          Submit
        </button>
      </form>


<ToastContainer />
</div>
);
};

export default Form;
