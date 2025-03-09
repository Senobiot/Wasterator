import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/selectors";
import Button from "../Button/Button";
import { logOff, refreshToken } from "../../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "../../constants/constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectCurrentUser);
  const fields = Object.entries(loggedUser || {});

  const handleClick = () => dispatch(logOff());

  useEffect(() => {
    if (!loggedUser) {
      navigate(ROUTES.PAGE.LOGIN);
    }
  }, [loggedUser]);

  return !loggedUser ? (
    <></>
  ) : (
    <div style={styles.container}>
      <h2 style={styles.title}>Добро пожаловать, {loggedUser.name}!</h2>
      <div style={styles.fields}>
        {fields.map(([key, value]) => (
          <div key={key} style={styles.field}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>
      <button style={styles.button} onClick={handleClick}>
        Выйти
      </button>
    </div>
  );
};
// TODO Move to css
const styles = {
  container: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#242429",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "1280px",
    margin: "0 auto",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#fff",
  },
  fields: {
    textAlign: "left",
    lineHeight: "1.5em",
    marginBottom: "20px",
  },
  field: {
    marginBottom: "10px",
    fontSize: "18px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Dashboard;
