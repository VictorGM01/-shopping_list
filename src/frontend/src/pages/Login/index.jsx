import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./login.module.css";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { useEffect } from "react";

import { Context } from "../../contexts/Auth";

export default function Login() {
  const { handleLogin, handleLogout } = useContext(Context);

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (values) => {
    handleLogin(values);
  };

  return (
    <main className={styles.container}>
      <h1>Login</h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          onFinish({
            email: e.target[0].value,
            senha: e.target[1].value,
          });
        }}
      >
        <TextField label="Usuário" size="small" variant="standard" />
        <TextField
          label="Senha"
          type="password"
          size="small"
          variant="standard"
        />
        <Button variant="contained" color="primary" size="large" type="submit">
          Entrar
        </Button>
      </Box>
    </main>
  );
}
