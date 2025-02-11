import { useState } from "react";
import styles from "./Registration.module.scss";
import { FORM_INPUTS } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState({});
  const [invalid, setInvalid] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:3000/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(regData),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
            throw new Error(errorData)
      }

      navigate('/login');

    } catch (error) {
      console.log(error);
    }
  };

  const vaidate = (id, value) => {
    if (!FORM_INPUTS[id]?.validationPattern) return;
    if (!value.trim()) return setInvalid({ ...invalid, [id]: "" });

    if (FORM_INPUTS[id].validationPattern.test(value)) {
      return setInvalid({ ...invalid, [id]: "green" });
    }
    setInvalid({ ...invalid, [id]: "red" });
  };

  const handleInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    vaidate(id, value);
    setRegData({ ...regData, [id]: value });
  };
  // TODO Переделать сделать input - компонент со всеми валидациями и стилями отдельно
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
        <div>
          {nameGroup.map((input) => (
            <div key={input}>
              <input
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
