import { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FORM_INPUTS, ROUTES } from "../../constants/constants";
import { loginRequest, authStatusReset } from "../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectAuthError } from "../../selectors/selectors";

const Login = () => {
  const { message: requestError } = useSelector(selectAuthError) || {};
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

  useEffect(() => {
    return () => dispatch(authStatusReset());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      Object.values(invalid).some((e) => e) ||
      !credentials.email.trim() ||
      !credentials.password.trim()
    )
      return;

    dispatch(authStatusReset());
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

    if (id === FORM_INPUTS.stayLogged.id) {
      const isChecked = event.target.checked;
      return setCredentials({ ...credentials, [id]: isChecked });
    }

    validate(id, value);
    setCredentials({ ...credentials, [id]: value });
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div
        className={`${styles.requestMessage} ${requestError ? "redErrorMessage" : ""}`}
      >
        {requestError}
      </div>
      <div className={styles.inputWrapper}>
        <input
          style={{
            borderColor: invalid[FORM_INPUTS.email.id] ? "red" : "green",
          }}
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
          style={{
            borderColor: invalid[FORM_INPUTS.password.id] ? "red" : "green",
          }}
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
            <input
              onChange={handleChange}
              type={FORM_INPUTS.stayLogged.type}
              value=""
              id={FORM_INPUTS.stayLogged.id}
            />
            <label htmlFor={FORM_INPUTS.stayLogged.id}>
              {" "}
              {FORM_INPUTS.stayLogged.placeholder}
            </label>
          </div>
        </div>
        <div>{/* <a href="#">Forgot password?</a> */}</div>
      </div>
      <button
        type="submit"
        className={styles.submit}
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
