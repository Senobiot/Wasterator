import { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FORM_INPUTS, ROUTES } from "../../constants/constants";
import { loginRequest } from "../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/selectors";

const Login = () => {
  const logged = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [invalid, setInvalid] = useState({});
  const [credentials, setCredentials] = useState({});

  useEffect(() => {
    if (logged) {
    navigate(ROUTES.PAGE.DASHBOARD);        
    }
  }, [logged]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(invalid).some(e => e)) return;
   
    dispatch(loginRequest(credentials));
  };

  const validate = (id, value) => {
    if (!FORM_INPUTS[id]?.validationPattern) return;
    if (!value.trim()) return setInvalid({ ...invalid, [id]: "" });

    if (FORM_INPUTS[id].validationPattern.test(value)) {
      return setInvalid({ ...invalid, [id]: false });
    }
    setInvalid({ ...invalid, [id]: true });
  };

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    validate(id, value);
    setCredentials({ ...credentials, [id]: value });
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          style={{ borderColor: invalid[FORM_INPUTS.email.id] ? "red" : "green" }}
          onChange={handleChange}
          type={FORM_INPUTS.email.type}
          id={FORM_INPUTS.email.id}
          className={credentials[FORM_INPUTS.email.id] ? styles.active : ""}
        />
        <label htmlFor={FORM_INPUTS.email.id}>
          {FORM_INPUTS.email.placeholder}
        </label>
      </div>
      <div className={styles.inputWrapper}>
        <input
          style={{ borderColor: invalid[FORM_INPUTS.password.id] ? "red" : "green"}}
          onChange={handleChange}
          type={FORM_INPUTS.password.type}
          id={FORM_INPUTS.password.id}
          className={credentials[FORM_INPUTS.password.id] ? styles.active : ""}
        />
        <label htmlFor={FORM_INPUTS.password.id}>
          {FORM_INPUTS.password.placeholder}
        </label>
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
          <Link to="/registration">Register</Link>
          <a href="#"></a>
        </p>
      </div>
    </form>
  );
};

export default Login;
