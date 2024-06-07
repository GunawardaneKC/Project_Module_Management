import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../UserFunction/Login';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import background from '../Images/bgnew.jpg';
 
 
const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
   


  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

 

    try {
      const res = await login({ email, password });

      if (res) {
        alert('Login successful');
        navigate('/home');
        window.location.reload();
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = 'Invalid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>    
    <div 
        className='justify-center items-center h-screen'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${background})`,
          backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.9,
        }}
    >

     
    <div className='flex justify-center items-center h-screen'>

      <div className='w-9/12'>
        <div className='text-white text-6xl font-bold text-center justify-center' style={{ animation: 'fadeIn 2s' }}>
  Welcome to the <br></br>Project Module Management<br></br>System<br></br>
</div>




          <div className='text-xl text-white '>

          </div>
      </div>

        <div className=' h-full mr-4'>
  <div style={{ borderLeft: '3px solid white', height: '100%', zIndex: 1, marginRight:'3px' }}>
  </div>
</div>


      <div className='w-3/12 '>
      <div
    className="bg-white p-5 rounded-lg shadow-md mr-5  backdrop-blur-md backdrop-filter bg-opacity-20 mt-5 mb-8"
    style={{
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    }}
  >
          <h1 className="text-3xl font-bold text-center mb-10">Login</h1>
           

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="text" className="block text-sm font-medium text-black">
                email:
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />

                {errors.email && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    {errors.email}
                  </div>
                )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {/* Conditionally render eye icons based on showPassword state */}
                {showPassword ? (
                  <EyeInvisibleOutlined
                    className="absolute right-3 top-4 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOutlined
                    className="absolute right-3 top-4 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:border-blue-700 w-full"
            >
              Login
            </button>

          </form>
          <a href='/stlogin'>
          <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:border-blue-700 w-full mt-3">
              Student Login
            </button>
          </a>

               
        </div>
     </div>


      </div>

  
     </div>
     </>

  );
};

export default LoginPage;