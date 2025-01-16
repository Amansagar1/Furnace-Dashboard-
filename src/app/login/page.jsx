'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Logo from '../../Components/Assets/Logo.png';
import { loginApi } from '../../WebServices/ApiControllers';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const Login = ({ onLogin }) => {
  const [tenantId, setTenantId] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginApi(userName, password, tenantId);
      console.log('Login successful:', response);

      // Store token and tenantId in cookies
      Cookies.set('token', response.token, { expires: 7 });
      Cookies.set('tenantId', tenantId, { expires: 7 });

      onLogin(String(response.token), String(tenantId));
    } catch (error) {
      console.error('Login error:', error);

      if (error?.message) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-gray-100 w-full text-gray-900">
      <Head>
        <title>Login</title>
      </Head>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Logo" className="w-32" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        {loading ? (
          <div className="flex items-center justify-center">
            <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700 mb-2">
                Tenant ID
              </label>
              <input
                type="text"
                id="tenantId"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600 focus:outline-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
            >
              Login
            </button>
          </form>
        )}

        {error && (
          <div
            className="text-red-700 px-4 py-3 mt-4 border border-red-500 bg-red-100 rounded-lg text-center"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
