import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./login.module.css";
import Box from "@mui/material/Box";

export default function Login() {
  return (
    <main className={styles.container}>
      <h1>Login</h1>
      <Box component="form" noValidate autoComplete="off" className={styles.form}>
        <TextField label="Usuário" size="small" variant="standard" />
        <TextField
          label="Senha"
          type="password"
          size="small"
          variant="standard"
        />
        <Button variant="contained" color="primary" size="large">
          Entrar
        </Button>
      </Box>
    </main>
  );
}
