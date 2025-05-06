import React, { useState , useContext } from 'react'
import { useNavigate, Link }from 'react-router-dom';
import { TheamContext } from '../App'
import { registerUser } from '../services/authService';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackgroundAnimation from "../services/BackgroundAnimation";


const Register = () => {
    const { theam } = useContext(TheamContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password, username);
            navigate("/login");
            toast.success("Registration Successful");
        } catch (error) {
            console.error("Registration Error:", error.message);
            toast.error("Registration Failed");
        }
    };

    return (
        <div
          style={theam ? { color : "#fff" } : { color: "#000" }}
            className="flex items-center justify-center h-screen bg-cover bg-center w-full">
              <div className="absolute inset-0 -z-10">
        <BackgroundAnimation />
      </div>
            <StyledWrapper>
                <form className="form" onSubmit={handleRegister}>
                    <p className="title">Register </p>
                    <p className="message">Signup now and get full access to our app. </p>
                        <label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                name = 'username'
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                className="input" />
                            <span>Username</span>
                        </label>
                    <label>
                        <input
                            required
                            placeholder
                            type="email "
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input" />
                        <span>Email</span>
                    </label>
                    <label>
                        <input required placeholder type="password" className="input" id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <span>Password</span>
                    </label>
                    <button
                        type="submit"
                        className="submit">
                        Submit
                    </button>
                    <p className="signin">Already have an acount ? <Link to="/">Login</Link> </p>
                </form>
            </StyledWrapper>
        </div>
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


export default Register
