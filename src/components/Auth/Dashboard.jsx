import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/selectors";
import { logOff } from "../../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "../../constants/constants";
import styles from "./Dashboard.module.scss"; // Import the CSS module

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
  }, [loggedUser, navigate]);

  return !loggedUser ? null : (
    <div className={styles.container}>
      <h2 className={styles.title}>Добро пожаловать, {loggedUser.name}!</h2>
      <div className={styles.fields}>
        {fields.map(([key, value]) => (
          <div key={key} className={styles.field}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={handleClick}>
        Выйти
      </button>
    </div>
  );
};

export default Dashboard;
