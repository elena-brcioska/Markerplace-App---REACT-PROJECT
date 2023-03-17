import { Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthenticationForm.module.css";
import styles from "../GlobalStyles/GlobalStyles.module.css";
import globalStyles from "../../pages/styles/GlobalStyles.module.css";
import { getAuthToken } from "../../util/auth";
import { useEffect } from "react";

const AuthenticationForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate()
  const token = getAuthToken();

  const isSubmitting = navigation.state === "submitting";

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  useEffect(() => {
    if(token) {
      setTimeout(() => {
        console.log("GOING BACK");
      navigate(-1)
      }, 1000);
    }
  }, [])
  

  return (
    <Box
      sx={{ height: "85vh", display: "flex", alignItems: "center" }}
      className={globalStyles.container}
    >
      <Paper
        className={globalStyles["access-card"]}
        sx={{ borderRadius: "16px" }}
        elevation={10}
      >
        {token ? (
          <h2 style={{textAlign: "center"}}>You are already logged in</h2>
        ) : (
          <Form method="post" className={classes.form}>
            <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
            {data && data.errors && (
              <ul>
                {Object.values(data.errors).map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            {data && data.message && <p>{data.message}</p>}
            <TextField
              sx={{ width: "100%" }}
              id="email"
              type="email"
              name="email"
              variant="standard"
              label="E-mail"
              data-testid="email-1"
            />
            <TextField
              sx={{ width: "100%" }}
              id="password"
              type="password"
              name="password"
              label="Password"
              variant="standard"
            />
            <div className={classes.actions}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box>
                  <span>
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                  </span>
                  <Link
                    className={`${styles["action-btn"]} ${classes["link-btn"]}`}
                    to={`?mode=${isLogin ? "signup" : "login"}`}
                  >
                    {isLogin ? "Create new user" : "Login"}
                  </Link>
                </Box>

                <button name="save" className={styles["btn"]} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Save"}
                </button>
              </Box>
            </div>
          </Form>
        )}
      </Paper>
    </Box>
  );
};

export default AuthenticationForm;
