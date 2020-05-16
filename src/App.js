import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className="container">
          <form>
            {/* <label className="login-text"><h3>Login</h3></label> */}
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            // onBlur={handleBlur}
            />
            {/* {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )} */}
            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            // onBlur={handleBlur}
            // className={errors.password && touched.password && "error"}
            />
            {/* {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )} */}
            <button type="submit">
              Login
          </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
