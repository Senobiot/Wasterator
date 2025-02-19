import { useState, useEffect, useCallback } from "react";
import styles from "./Registration.module.scss";
import { FORM_INPUTS, ROUTES } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { registerRequest, authStatusReset } from "../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectisRegisterSucccess,
} from "../../selectors/selectors";

const Registration = () => {
  const { message: requestError } = useSelector(selectAuthError);
  const isRegisterSucccess = useSelector(selectisRegisterSucccess);

  console.log(requestError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [regData, setRegData] = useState({});
  const [invalid, setInvalid] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(authStatusReset());
    dispatch(registerRequest(regData));
  };

  const validate = (id, value) => {
    if (!FORM_INPUTS[id]?.validationPattern) return;
    if (!value.trim()) return setInvalid({ ...invalid, [id]: "" });

    if (FORM_INPUTS[id].validationPattern.test(value)) {
      return setInvalid({ ...invalid, [id]: "green" });
    }
    setInvalid({ ...invalid, [id]: "red" });
  };

  useEffect(() => {
    if (isRegisterSucccess) {
      navigate(ROUTES.PAGE.LOGIN);
    }
  }, [isRegisterSucccess]);

  useEffect(() => () => dispatch(authStatusReset()), []);

  const handleInput = useCallback(
    (event) => {
      const id = event.target.id;
      const value = event.target.value;
      validate(id, value);
      setRegData({ ...regData, [id]: value });
    },
    [validate]
  );

  const nameGroup = [
    FORM_INPUTS.name.id,
    FORM_INPUTS.lastName.id,
    FORM_INPUTS.birthday.id,
  ];

  const credentialsGroup = [
    FORM_INPUTS.email.id,
    FORM_INPUTS.phone.id,
    FORM_INPUTS.password.id,
  ];

  return (
    <section className={styles.section}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.requestMessage} ${requestError ? styles.red : ""}`}
        >
          {requestError}
        </div>
        <div>
          {nameGroup.map((input) => (
            <div key={input}>
              <input
                //TODO move to scss
                style={{ borderColor: invalid[input] }}
                onChange={handleInput}
                type={FORM_INPUTS[input].type}
                id={FORM_INPUTS[input].id}
                placeholder={FORM_INPUTS[input].placeholder}
              />
            </div>
          ))}
        </div>
        <div className={styles.gender}>
          <h3 className={styles.subTitle}>Gender:</h3>
          {FORM_INPUTS.gender.variants.map((gender) => (
            <div key={gender.id}>
              <input
                onChange={handleInput}
                type={FORM_INPUTS.gender.type}
                id={gender.id}
                value={gender.placeholder}
                name={FORM_INPUTS.gender.name}
              />
              <label htmlFor={gender.id}>{gender.placeholder}</label>{" "}
            </div>
          ))}
        </div>
        <div>
          {credentialsGroup.map((input) => (
            <div key={input}>
              <input
                //TODO move to scss
                style={{ borderColor: invalid[input] }}
                onChange={handleInput}
                type={FORM_INPUTS[input].type}
                id={FORM_INPUTS[input].id}
                placeholder={FORM_INPUTS[input].placeholder}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <input
            className={styles.submit}
            type={FORM_INPUTS.submit.type}
            value={FORM_INPUTS.submit.placeholder}
          />
        </div>
      </form>
    </section>
  );
};

export default Registration;
