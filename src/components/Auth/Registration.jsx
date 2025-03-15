import { useState, useEffect } from "react";
import { FORM_INPUTS, ROUTES } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { registerRequest, authStatusReset } from "../../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectisRegisterSucccess,
} from "../../selectors/selectors";

import { ThemeProvider } from "@mui/material/styles";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormLabel,
  FormControl,
  FormControlLabel,
  Alert,
  Radio,
  RadioGroup,
} from "@mui/material";
import { darkForm } from "../../themes";

const Registration = () => {
  const { message: requestError } = useSelector(selectAuthError) || {};
  const isRegisterSucccess = useSelector(selectisRegisterSucccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState();
  const [valid, setValid] = useState({});

  const {
    name: NAME,
    lastName: SURNAME,
    birthday: BIRTH,
    phone: TEL,
    gender: GENDER,
    email: EMAIL,
    password: PASSWORD,
    passwordCheck: PASS_CHECK,
    checkbox: CHECKBOX,
    register: REG,
    titles: { register: TITLE },
  } = FORM_INPUTS;

  useEffect(() => {
    return () => dispatch(authStatusReset());
  }, []);

  useEffect(() => {
    if (isRegisterSucccess) {
      navigate(ROUTES.PAGE.LOGIN);
    }
  }, [isRegisterSucccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, passwordCheck } = credentials;

    const isEmailValid = EMAIL.validationPattern.test(email);
    const isPasswordValid = PASSWORD.validationPattern.test(password);

    if (!isEmailValid) {
      return setValid({ email: EMAIL.errorText });
    }

    if (!isPasswordValid) {
      return setValid({ password: PASSWORD.errorText });
    }

    const isPasswordCheckValid =
      PASS_CHECK.validationPattern.test(passwordCheck) &&
      passwordCheck === password;

    if (!isPasswordCheckValid) {
      return setValid({ passwordCheck: PASS_CHECK.errorTextMatch });
    }

    dispatch(authStatusReset());
    dispatch(registerRequest(credentials));
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    if (valid[name]) {
      setValid({ ...valid, [name]: "" });
    }

    setCredentials({
      ...credentials,
      [name]: name === CHECKBOX.name ? !!checked : value,
    });
  };

  const importantFields = [EMAIL, PASSWORD, PASS_CHECK];
  const additionalFields = [NAME, SURNAME, BIRTH, TEL];

  return (
    <ThemeProvider theme={darkForm}>
      <Container className="page-container">
        <Container maxWidth="sm">
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
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
            {importantFields.map((e) => (
              <TextField
                fullWidth
                variant="filled"
                error={!!valid[e.name]}
                helperText={valid[e.name]}
                label={e.placeholder}
                type={e.type}
                onChange={handleChange}
                name={e.name}
              />
            ))}
            <FormControl>
              <FormLabel color="#fff">{GENDER.placeholder}</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={handleChange}
                  name={GENDER.name}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={handleChange}
                  name={GENDER.name}
                />
              </RadioGroup>
            </FormControl>
            {additionalFields.map((e) => (
              <TextField
                fullWidth
                variant="filled"
                label={e.placeholder}
                type={e.type}
                onChange={handleChange}
                name={e.name}
              />
            ))}
            <Button type={REG.type} variant="contained" fullWidth>
              {REG.placeholder}
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

export default Registration;
