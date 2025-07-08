import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { TheamContext, userContext } from '../App';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useContext  } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import BackgroundAnimation from "../services/BackgroundAnimation";

const Login = () => {
  const { userdata, setUser } = useContext(userContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  async function Submit(e) {
    e.preventDefault();

    try {
      const userCredential = await loginUser(email, password);
      if (userCredential && userCredential.data && userCredential.data.user) {
        setUser(userCredential.data.user);
        navigate("/dashboard");
        setTimeout(() => {
          toast.success("Login successful!");
        }, 1000);
      } else {
        toast.error("Login failed: Invalid response from server");
      }
    } catch (e) {
      toast.error("Login Failed");
      console.error("Login Error: ", e.message);
    }
  }
  return (
    <>
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center">
        <div className="absolute inset-0 -z-10">
          <BackgroundAnimation />
        </div>
        <StyledWrapper>
          <form className="form" >
            <p className="title">Login To our App</p>
            <p className="message">Login now and get full access to our app.</p>
            <label>
              <input
                required
                type="email"
                className="input"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
              <span>Email</span>
            </label>
            <label>
              <input
                required
                type="password"
                className="input "
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                id="password"
              />
              <span>Password</span>
            </label>
            <button
              type="submit"
              className="submit"
              onClick={Submit}
            >
              Login
            </button>
            <p className="signin">Don't have an account ? <Link to="/register">Register</Link> </p>
          </form>
        </StyledWrapper>
      </div>
    </>
  )
}
const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message, .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,.form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
    border: none;
    outline: none; 
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;

export default Login
