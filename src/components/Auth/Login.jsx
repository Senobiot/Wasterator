import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FORM_INPUTS, ROUTES } from "../../constants/constants";
import { loginRequest, authStatusReset } from "../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectAuthError } from "../../selectors/selectors";
import { ThemeProvider } from "@mui/material/styles";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { darkForm } from "../../themes";

const Login = () => {
  const { message: requestError } = useSelector(selectAuthError) || {};
  const logged = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState();
  const [valid, setValid] = useState({});

  const {
    email: EMAIL,
    password: PASSWORD,
    checkbox: CHECKBOX,
    registerLink: REG,
    submit: SUBMIT,
    titles: { login: TITLE },
  } = FORM_INPUTS;

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
    const { email, password } = credentials;

    const isEmailValid = EMAIL.validationPattern.test(email);
    const isPasswordValid = PASSWORD.validationPattern.test(password);

    if (!isEmailValid) {
      console.log("isEmailInvalid");
      return setValid({ email: EMAIL.errorText });
    }

    if (!isPasswordValid) {
      console.log("isPasswordInvalid");
      return setValid({ password: PASSWORD.errorText });
    }

    dispatch(authStatusReset());
    dispatch(loginRequest(credentials));
  };

  const handleChange = (event) => {
    const { type, value, checked } = event.target;

    if (requestError) {
      dispatch(authStatusReset());
    }

    if (valid[type]) {
      setValid({ ...valid, [type]: "" });
    }

    setCredentials({
      ...credentials,
      [type]: type === CHECKBOX.type ? !!checked : value,
    });
  };

  return (
    <ThemeProvider theme={darkForm}>
      <Container className="page-container">
        <Container maxWidth="xs">
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              maxWidth: "444px",
              backgroundColor: "#101316",
              mt: 8,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              {TITLE}
            </Typography>
            <TextField
              fullWidth
              variant="filled"
              error={!!valid[EMAIL.type]}
              helperText={valid[EMAIL.type]}
              autoComplete="current-email"
              label={EMAIL.placeholder}
              type={EMAIL.type}
              onChange={handleChange}
              name={EMAIL.type}
            />
            <TextField
              fullWidth
              variant="filled"
              error={!!valid[PASSWORD.type]}
              helperText={valid[PASSWORD.type]}
              label={PASSWORD.placeholder}
              autoComplete="current-password"
              type={PASSWORD.type}
              onChange={handleChange}
              name={PASSWORD.type}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  color="info"
                  sx={{
                    color: "white",
                  }}
                  name={CHECKBOX.id}
                />
              }
              label={CHECKBOX.placeholder}
            />
            <p>
              {REG.text}
              <Link to="/registration">{REG.linkText}</Link>
            </p>
            <Button type={SUBMIT.type} variant="contained" fullWidth>
              {SUBMIT.placeholder}
            </Button>
            {requestError && (
              <Alert
                variant="filled"
                severity="error"
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {requestError}
              </Alert>
            )}
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
