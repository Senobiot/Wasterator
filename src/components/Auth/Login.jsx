import { useState } from "react";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";

const Login = () => {
  // TODO move to consts
  const names = {
    email: "email",
    password: "password",
    active: "active",
  };

  const REGEX_VALIDATION = {
    EMAIL: /^\S+@\S+\.\S+$/,
  }

  const [active, setActive] = useState({
    [names.email]: "",
    [names.password]: "",
    [names.active]: "",
  });
  const [valid, setValid] = useState("");
  const [credentials, setCredentials] = useState({
    [names.email]: "",
    [names.password]: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(credentials);
    const url = 'http://localhost:3000/login';
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
    }
console.log(options);
    const response = await fetch(url, options);
    console.log(response);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.trim()) {
        setValid(REGEX_VALIDATION.EMAIL.test(value))        
    } else {
        setValid("");
    }

    
    setCredentials({ ...credentials, [e.target.type]: value });

    if (e.target.value.trim()) {
      if (!active[e.target.type]) {
        return setActive({ ...active, [e.target.type]: names.active });
      }
      return;
    }

    return setActive({ ...active, [names[e.target.type]]: "" });
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          onChange={handleChange}
          type={names.email}
          id={names.email}
          className={`${styles[active.email]} ${styles[valid]}`}
        />
        <label htmlFor={names.email}>Email address</label>
      </div>
      <div className={styles.inputWrapper}>
        <input
          onChange={handleChange}
          type={names.password}
          id={names.password}
          className={styles[active.password]}
        />
        <label htmlFor={names.password}>Password</label>
      </div>
      <div>
        <div>
          <div>
            <input type="checkbox" value="" id="remember" />
            <label htmlFor="remember"> Remember me </label>
          </div>
        </div>
        <div>
          <a href="#">Forgot password?</a>
        </div>
      </div>
      <button
        type="submit"
        className="submit"
        style={{
          backgroundColor: "rgb(59 113 202)",
        }}
      >
        Sign in
      </button>
      <div>
        <p>
          Not a member? 
          <Link to="/registration">Register
          </Link>
          <a href="#"></a>
        </p>
      </div>
    </form>
  );
};

export default Login;
