import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, createContext, useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar';
import DashBoard from './Pages/DashBoard'
import Projects from './Pages/Projects';
import Calender from './Pages/Calender';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Sidebar from './Components/Sidebar';
import { ToastContainer } from 'react-toastify';
export const TheamContext = createContext();
export const userContext = createContext();

const PrivateRoute = ({ children }) => {
  const { userdata } = React.useContext(userContext);
  return userdata ? children : <Navigate to="/" />;
};

function App() {

  const [theam, settheam] = useState(true);
  const [userdata, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userdata");
    return savedUser ? { ...JSON.parse(savedUser), projects: JSON.parse(savedUser).projects || [] } : {
      displayName: '',
      projects: [],
    };
  });

  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(userdata));
  }, [userdata]);
  console.log(userdata);


  return (
    <>
      <userContext.Provider value={{ userdata, setUser }}>
        <TheamContext.Provider value={{ theam, settheam }}>
          <Router>
            <div className='flex w-full h-screen'>
              <Sidebar />
              <div className='flex-1 flex flex-col'>
                <Navbar />
                <div className='flex-1 overflow-y-auto'>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/calender" element={<PrivateRoute><Calender /></PrivateRoute>} />
                    <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
                    <Route path="/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
                  </Routes>
                </div>
              </div>
            </div>
          </Router>
        </TheamContext.Provider>
      </userContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
