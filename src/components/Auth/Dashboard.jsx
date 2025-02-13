import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/selectors";
import Button from "../Button/Button";
import { logOff, refreshToken } from "../../reducers/authReducer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectCurrentUser);
  const fields = Object.entries( loggedUser || {});
  const handleClick = () => {
    dispatch(logOff());
    navigate("/login");
  };

  const handleRefresh = () => {
    dispatch(refreshToken(loggedUser.email));
  }
  return (
    <div
      style={{
        margin: "0 50px",
        lineHeight: "3em",
        backgroundColor: "grey",
        textAlign: "left",
      }}
    >
      {fields.map((field) => (
        <div key={field[0]}>
          {field[0]}: {field[1]}
        </div>
      ))}
      <Button title="Выйти" color="red" onClick={handleClick}></Button>
      <Button title="Refresh" color="red" onClick={handleRefresh}></Button>
    </div>
  );
};

export default Dashboard;
