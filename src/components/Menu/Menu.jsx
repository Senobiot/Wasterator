import classes from "./Menu.module.scss";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/selectors";
import { useEffect, useState } from "react";
import { ROUTES } from "../../constants/constants";

const menuButtons = [
  { name: "Мои игры", link: ROUTES.PAGE.MY_GAMES },
  { name: "Мои фильмы", link: ROUTES.PAGE.MY_FILMS },
  { name: "Статистика", link: ROUTES.PAGE.STATISTIC },
  { name: "Войти", link: ROUTES.PAGE.LOGIN },
];

export default function Menu() {
  const loggedUser = useSelector(selectCurrentUser);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <div className={classes.menu}>
      <nav>
        <ul>
          <SearchBar />
          {menuButtons.map((button) => {
            const navButtonData = { ...button };

            if (loggedUser && button.link === ROUTES.PAGE.LOGIN) {
              navButtonData.link = ROUTES.PAGE.DASHBOARD;
              navButtonData.name = loggedUser.name;
            }
            return (
              <Link
                style={{ display: "flex" }}
                to={navButtonData.link}
                key={navButtonData.link}
              >
                <Button
                  title={navButtonData.name}
                  color={activePath === navButtonData.link ? "red" : ""}
                ></Button>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
