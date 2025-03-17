import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../selectors/selectors";
import { logOff, uploadAvatar } from "../../reducers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES, AVATAR_VARIANTS } from "../../constants/constants";
import styles from "./Dashboard.module.scss";
import DashboardFields from "../../dtos/dashbord-fields";
import { Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AvatarEditor from "./AvatarEditor";
import Container from "@mui/material/Container";
import { colorMain } from "../../themes/palettes";

const Dashboard = () => {
  const loggedUser = useSelector(selectCurrentUser) || {};
  const {
    name,
    avatar: {
      variant: avatarVariant = AVATAR_VARIANTS.default,
      url: avatarUrl,
    } = {},
  } = loggedUser;
  const fields = Object.entries(new DashboardFields(loggedUser));
  const [avatar, setAvatar] = useState(null);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => dispatch(logOff());

  const handleChangeAvatar = () => {
    setUpdating(!updating);
  };

  useEffect(() => {
    if (!loggedUser) {
      return navigate(ROUTES.PAGE.LOGIN);
    }
    if (avatarUrl) {
      setAvatar(avatarUrl);
    }
  }, [loggedUser, navigate]);

  return !loggedUser ? (
    <div>Загрузка данных...</div>
  ) : (
    <Container maxWidth="md">
      <Container
        sx={{
          marginBottom: "8px",
          "*": {
            color: "white",
          },
        }}
      >
        {updating ? (
          <AvatarEditor
            exit={handleChangeAvatar}
            avatar={avatar}
            variant={avatarVariant}
          />
        ) : (
          <Card
            sx={{
              display: "flex",
              color: "white",
              backgroundColor: colorMain.medium,
            }}
          >
            <Avatar
              sx={{
                width: 170,
                height: 170,
              }}
              variant={avatarVariant}
              alt={name}
              src={avatar}
            />
            <Box
              sx={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  "&:last-child": { paddingBottom: 1 },
                }}
              >
                <Typography component="div" variant="h5">
                  {name}
                </Typography>
                <Typography>From:</Typography>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    border: "2px solid white",
                    marginTop: 2,
                  }}
                  onClick={handleChangeAvatar}
                  size="small"
                >
                  Change avatar
                </Button>
              </CardContent>
            </Box>
          </Card>
        )}
      </Container>
      <Container>
        <div className={styles.fields}>
          {fields.map(([key, value]) => (
            <div key={key} className={styles.field}>
              <strong>{key}:</strong>
              <br />
              {value}
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={handleClick}>
          Выйти
        </button>
      </Container>
    </Container>
  );
};

export default Dashboard;
