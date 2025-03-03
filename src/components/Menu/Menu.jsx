import classes from "./Menu.module.scss";
import Button from "../Button/Button";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/selectors";
import { useEffect, useState } from "react";
import { ROUTES } from "../../constants/constants";

const menuButtons = [
  { name: "Домой", link: ROUTES.PAGE.HOME },
  { name: "Мои игры", link: ROUTES.PAGE.MY_GAMES, authRequird: true },
  { name: "Мои фильмы", link: ROUTES.PAGE.MY_FILMS, authRequird: true },
  { name: "Статистика", link: ROUTES.PAGE.STATISTIC, authRequird: true },
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
      <div className={classes.logoWrapper}>
        <img src="public/logo2.png" alt="" />
      </div>
      <nav>
        <ul>
          <SearchBar />
          {menuButtons.map((button) => {
            const navButtonData = { ...button };
            if (button.authRequird && !loggedUser) return;
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
