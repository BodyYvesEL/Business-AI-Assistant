// import React from "react";
import { useState } from "react";

function Login() {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(formData);
        // You can make an API call to submit the data here
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


  return (
    <div className="register">
      <h1 className="header">AI Assistant</h1>
      <div className="register-container">
        <form onLogin={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">UserName</label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="login">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;